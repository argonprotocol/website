<template>
  <div ref="$el" class="TimeChart Component relative min-h-[400px] w-full flex flex-row">
    <!-- Y-axis labels container -->
    <div class="absolute top-0 left-0 h-full -translate-x-full flex flex-col justify-between" :style="{ paddingBottom: '25px' }">
      <div ref="yAxisLabelsRef" class="y-axis-labels border-r border-gray-600"></div>
    </div>
    
    <!-- Chart area container -->
    <div class="relative flex-grow flex flex-col">

      <!-- Chart area -->
      <div class="relative flex-grow">
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
          <slot />
        </div>
        <svg ref="chartSvgRef" class="relative w-full h-full z-30"></svg>
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none" ref="insetContainerRef">
          <slot name="inset" />
        </div>
        <!-- Markers container -->
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-40" ref="markersContainerRef">
          <slot name="marker" v-for="markerProps in markerSlotProps" :key="markerProps.date" v-bind="markerProps" />
        </div>
      </div>

      <!-- Simple Time label -->
      <div XAxisLabels class="absolute bottom-0 left-0 w-full flex justify-center">
        <span class="text-gray-600/60 text-sm">May to October 2025</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

interface MarkerSlotProps {
  date: string;
  value: number | null; // Y value at this date (interpolated if needed)
  x: number; // Pixel X coordinate
  y: number; // Pixel Y coordinate
  seriesIndex?: number; // Which series this marker relates to
}

const props = defineProps<{
  series: { color: string, points: { x: string, y: number }[] }[];
  startingDate?: string;
  xTimeUnit?: string;
  maxYAxisValue?: number;
  minYAxisValue?: number;
  fmtYAxisLabel?: (y: number) => string;
  markers?: string[]; // Array of date strings for markers
}>();

const $el = Vue.ref<HTMLDivElement | null>(null);

const yAxisLabelsRef = Vue.ref<HTMLDivElement | null>(null);
const chartSvgRef = Vue.ref<SVGSVGElement | null>(null);
const insetContainerRef = Vue.ref<HTMLDivElement | null>(null);
const markersContainerRef = Vue.ref<HTMLDivElement | null>(null);
const yAxisWidth = Vue.ref(60); // Dynamic width for y-axis labels

const chartPointsBySeries = Vue.ref<{x: string, y: number}[][]>([]);
let chartSvg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
const xScale = Vue.ref<d3.ScaleTime<number, number> | null>(null);
const yScale = Vue.ref<d3.ScaleLinear<number, number> | null>(null);
let resizeObserver: ResizeObserver | null = null;

const margin = { top: 0, right: 0, bottom: 25, left: 1 }; // No left margin since labels are separate
const height = 400;

// Computed properties for reusable calculations
const dateRange = Vue.computed(() => {
  const startDate = props.startingDate ? dayjs.utc(props.startingDate).toDate() : dayjs.utc('1933-01-01').toDate();
  const startYear = dayjs.utc(startDate).year();
  
  let endDate = dayjs.utc('2030-12-31').toDate();
  // Use props.series data if available, otherwise fall back to chartPointsBySeries
  const dataToCheck = props.series.length > 0 ? props.series.flatMap(s => s.points) : chartPointsBySeries.value.flat();
  if (dataToCheck.length > 0) {
    const allDates = dataToCheck.map(p => dayjs.utc(p.x).toDate());
    if (allDates.length > 0) {
      const maxDataDate = new Date(Math.max(...allDates.map(d => d.getTime())));
      endDate = maxDataDate;
    }
  }
  const endYear = dayjs.utc(endDate).year();
  return { startDate, endDate, startYear, endYear };
});

const maxYValue = Vue.computed(() => {
  if (props.maxYAxisValue) return props.maxYAxisValue;
  
  // Calculate max value across all series
  let maxValue = 100; // default
  // Use props.series data if available, otherwise fall back to chartPointsBySeries
  const dataToCheck = props.series.length > 0 ? props.series.flatMap(s => s.points) : chartPointsBySeries.value.flat();
  if (dataToCheck.length > 0) {
    const allValues = dataToCheck.map(p => p.y);
    if (allValues.length > 0) {
      maxValue = Math.max(...allValues);
    }
  }
  return maxValue;
});

const minYValue = Vue.computed(() => {
  if (props.minYAxisValue !== undefined) return props.minYAxisValue;
  return 0;
});

// Function to interpolate Y value for a given date
function interpolateValueAtDate(targetDate: string, seriesIndex: number = 0): number | null {
  const series = chartPointsBySeries.value[seriesIndex];
  if (!series || series.length === 0) return null;
  
  const targetTime = dayjs.utc(targetDate).valueOf();
  
  // Sort series by date to ensure proper interpolation
  const sortedSeries = [...series].sort((a, b) => dayjs.utc(a.x).valueOf() - dayjs.utc(b.x).valueOf());
  
  // Check if target date is before first point or after last point
  const firstPoint = sortedSeries[0];
  const lastPoint = sortedSeries[sortedSeries.length - 1];
  
  if (targetTime <= dayjs.utc(firstPoint.x).valueOf()) {
    return firstPoint.y;
  }
  
  if (targetTime >= dayjs.utc(lastPoint.x).valueOf()) {
    return lastPoint.y;
  }
  
  // Find the two points to interpolate between
  for (let i = 0; i < sortedSeries.length - 1; i++) {
    const currentPoint = sortedSeries[i];
    const nextPoint = sortedSeries[i + 1];
    
    const currentTime = dayjs.utc(currentPoint.x).valueOf();
    const nextTime = dayjs.utc(nextPoint.x).valueOf();
    
    if (targetTime >= currentTime && targetTime <= nextTime) {
      // Linear interpolation
      const ratio = (targetTime - currentTime) / (nextTime - currentTime);
      return currentPoint.y + (nextPoint.y - currentPoint.y) * ratio;
    }
  }
  
  return null;
}

// Computed property for marker slot props
const markerSlotProps = Vue.computed<MarkerSlotProps[]>(() => {
  if (!props.markers || !xScale.value || !yScale.value) return [];
  
  return props.markers.map(date => {
    const x = xScale.value!(dayjs.utc(date).toDate());
    const value = interpolateValueAtDate(date);
    const y = value !== null ? yScale.value!(value) : 0;
    
    return {
      date,
      value,
      x,
      y,
      seriesIndex: 0 // Default to first series, could be made configurable
    };
  });
});


function calculateYAxisWidth() {
  // Calculate the width needed for y-axis labels based on the data
  const maxValue = maxYValue.value;
  const minValue = minYValue.value;
  
  // Create a temporary scale to get tick values
  const tempScale = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([0, 100]);
  
  const ticks = tempScale.ticks(10);
  const maxTickLength = Math.max(...ticks.map(tick => tick.toString().length));
  
  // Estimate width: ~8px per character + padding
  const estimatedWidth = Math.max(50, maxTickLength * 8 + 20);
  yAxisWidth.value = estimatedWidth;
}

function renderYAxisLabels() {
  if (!yAxisLabelsRef.value || !yScale.value) return;

  // Clear existing labels
  yAxisLabelsRef.value.innerHTML = '';

  // Get tick values and reverse them to match the inverted chart
  const ticks = yScale.value.ticks(10).reverse();
  const tickHeightPct = 100 / (ticks.length - 1);

  // Create label elements with equal spacing
  ticks.forEach((tick, index) => {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'y-axis-label';
    labelDiv.textContent = props.fmtYAxisLabel ? props.fmtYAxisLabel(tick) : tick.toString();
        
    // Style the label with equal percentage height
    labelDiv.style.height = `${tickHeightPct}%`;
    
    yAxisLabelsRef.value!.appendChild(labelDiv);
  });
}

function customizeAxes() {
  // No axis customizations needed since we're using divs for labels
}

function createLineGenerator() {
  return d3.line<{x: string, y: number}>()
    .x((d) => xScale.value!(dayjs.utc(d.x).toDate()))
    .y((d) => yScale.value!(d.y))
    .curve(d3.curveLinear);
}

function createTooltipCircles() {
  if (!chartSvg) return;
  
  const circles = chartSvg.select('.tooltip-circles');
  circles.selectAll('.tooltip-circle').remove();
  
  // Create tooltip circles for each series
  props.series.forEach((series, seriesIndex) => {
    const seriesPoints = chartPointsBySeries.value[seriesIndex] || [];
    
    circles.selectAll(`.tooltip-circle-${seriesIndex}`)
      .data(seriesPoints)
      .enter()
      .append('circle')
      .attr('class', `tooltip-circle tooltip-circle-${seriesIndex}`)
      .attr('cx', (d) => xScale.value!(dayjs.utc(d.x).toDate()))
      .attr('cy', (d) => yScale.value!(d.y))
      .attr('r', 6)
      .attr('fill', series.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 1);
        
        const tooltip = d3.select(`.chart-tooltip-${seriesIndex}`);
        const year = dayjs.utc(d.x).year();
        
        tooltip.html(`
          <div><strong>${year} A.D.</strong></div>
          <div>Value: ${Math.round(d.y)}%</div>
        `)
        .style('opacity', 1);
      })
      .on('mousemove', function(event) {
        const tooltip = d3.select(`.chart-tooltip-${seriesIndex}`);
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0);
        d3.select(`.chart-tooltip-${seriesIndex}`).style('opacity', 0);
      });
  });
}

function createHorizontalGridLines() {
  if (!chartSvg || !yScale.value) return;
  
  const gridGroup = chartSvg.select('.grid-group');
  
  // Create grid group if it doesn't exist
  if (gridGroup.empty()) {
    chartSvg.append('g').attr('class', 'grid-group');
  }
  
  // Remove any existing grid lines before drawing the single 100% line
  chartSvg.select('.grid-group').selectAll('.y-grid').remove();
  
  // Only draw a single horizontal line at 100%
  const [minDomain, maxDomain] = yScale.value.domain();
  const targetValue = (minDomain + maxDomain) / 2;
  chartSvg.select('.grid-group')
    .append('line')
    .attr('class', 'y-grid y-grid-100')
    .attr('x1', 0)
    .attr('x2', chartSvgRef.value!.clientWidth - margin.right)
    .attr('y1', yScale.value(targetValue))
    .attr('y2', yScale.value(targetValue))
    .attr('stroke', '#ccc')
    .attr('stroke-width', 3)
    .attr('stroke-dasharray', '4 4')
    .attr('opacity', 0.5);

  // Draw a thin solid bottom border at 0%
  const bottomValue = minDomain;
  if (bottomValue >= minDomain && bottomValue <= maxDomain) {
    chartSvg.select('.grid-group')
      .append('line')
      .attr('class', 'y-grid y-grid-bottom')
      .attr('x1', 0)
      .attr('x2', chartSvgRef.value!.clientWidth - margin.right)
      .attr('y1', yScale.value(bottomValue))
      .attr('y2', yScale.value(bottomValue))
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('opacity', 1);
  }
}

function renderChart() {
  if (!yAxisLabelsRef.value || !chartSvgRef.value) {
    return;
  }

  // Calculate y-axis width first
  calculateYAxisWidth();

  // Get the container width for the chart area
  const chartContainerWidth = chartSvgRef.value.parentElement?.clientWidth || 800;
  const chartWidth = chartContainerWidth;

  // Calculate max value from data, with a small buffer
  const maxValue = maxYValue.value;
  
  yScale.value = d3.scaleLinear()
    .domain([minYValue.value, maxValue])
    .range([height - margin.bottom, margin.top]);

  // Create scales
  const { startDate, endDate } = dateRange.value;
  
  xScale.value = d3.scaleTime()
    .domain([startDate, endDate])
    .range([margin.left, chartWidth - margin.right]);

  // Clear existing chart content
  d3.select(chartSvgRef.value).selectAll("*").remove();

  // Create chart SVG
  chartSvg = d3.select(chartSvgRef.value)
    .attr("width", chartWidth)
    .attr("height", height);

  // Render Y-axis labels as divs
  renderYAxisLabels();

  // Add horizontal grid lines in chart SVG
  createHorizontalGridLines();

  // No need for x-axis in SVG since we're using divs

  // No need for y-axis domain line since labels are separate

  // Apply axis customizations
  customizeAxes();

  // Create line generator
  const line = createLineGenerator();

  // Add paths for each series in chart SVG
  props.series.forEach((series, index) => {
    // Add background line with --bg-color (wider stroke)
    chartSvg!.append('path')
      .attr('class', `chart-line-bg chart-line-bg-${index}`)
      .attr('fill', 'none')
      .attr('stroke', 'var(--bg-color)')
      .attr('stroke-width', 8);
    
    // Add main line with series color
    chartSvg!.append('path')
      .attr('class', `chart-line chart-line-${index}`)
      .attr('fill', 'none')
      .attr('stroke', series.color)
      .attr('stroke-width', 4);
  });

  // Create invisible circles for tooltip interaction in chart SVG
  const circles = chartSvg.append('g')
    .attr('class', 'tooltip-circles');

  // Create tooltip divs for each series (clean up any existing ones first)
  props.series.forEach((series, index) => {
    d3.select(`.chart-tooltip-${index}`).remove();
    const tooltip = d3.select('body').append('div')
      .attr('class', `chart-tooltip chart-tooltip-${index}`)
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('z-index', '1000');
  });

  // Create tooltip circles if we have data
  if (chartPointsBySeries.value.length > 0 && chartPointsBySeries.value.some(series => series.length > 0)) {
    createTooltipCircles();
  }
  
  // If we have series data, render the lines immediately
  if (props.series.length > 0 && props.series.some(series => series.points.length > 0)) {
    const newPointsBySeries = props.series.map(series => series.points);
    updateChartPoints(newPointsBySeries);
  }
  
  // Update inset clipping path after initial render
  Vue.nextTick(() => {
    updateInsetClippingPath();
  });
}

function updateChartPoints(newPointsBySeries: {x: string, y: number}[][]) {
  chartPointsBySeries.value = newPointsBySeries.map(series => [...series]);
  
  if (chartSvg && xScale.value && yScale.value && newPointsBySeries.some(series => series.length > 0)) {
    // Recalculate y-axis width based on new data
    calculateYAxisWidth();
    
    // Recalculate y-scale based on new data
    const maxValue = maxYValue.value;
    yScale.value!.domain([minYValue.value, maxValue]);
    yScale.value!.range([height - margin.bottom, margin.top]);
    
    // Update y-axis labels as divs
    renderYAxisLabels();
    
    // Update horizontal grid lines in chart SVG to match new y-axis ticks
    chartSvg.selectAll('.y-grid').remove();
    createHorizontalGridLines();
    
    // Apply axis customizations
    customizeAxes();

    // Create line generator
    const line = createLineGenerator();

    // Update the lines in chart SVG for each series
    newPointsBySeries.forEach((seriesPoints, index) => {
      if (seriesPoints.length > 0) {
        // Update background line
        const bgLinePath = chartSvg!.select(`.chart-line-bg-${index}`)
          .datum(seriesPoints)
          .attr('d', line);
        
        // Update main line
        const linePath = chartSvg!.select(`.chart-line-${index}`)
          .datum(seriesPoints)
          .attr('d', line);
      }
    });

    // Update tooltip circles in chart SVG
    createTooltipCircles();
    
    // Update the inset clipping path to follow the chart line
    Vue.nextTick(() => {
      updateInsetClippingPath();
    });
  }
}

function getChartPointCoordinates(seriesIndex: number, pointIndex: number): { x: number; y: number; } | null {
  if (!xScale.value || !yScale.value || seriesIndex < 0 || seriesIndex >= chartPointsBySeries.value.length) {
    console.log('getChartPointCoordinates: invalid series index');
    return null;
  }
  
  const seriesPoints = chartPointsBySeries.value[seriesIndex];
  console.log('seriesPoints: ', seriesPoints);
  if (!seriesPoints || pointIndex < 0 || pointIndex >= seriesPoints.length) {
    console.log('getChartPointCoordinates: invalid point index');
    return null;
  }
  
  const point = seriesPoints[pointIndex];
  const x = xScale.value(dayjs.utc(point.x).toDate());
  const y = yScale.value(point.y);
  
  return { x, y };
}

function updateInsetClippingPath() {
  if (!insetContainerRef.value || !chartPointsBySeries.value.length || !xScale.value || !yScale.value) {
    return;
  }
  
  // Use the first series for the clipping path (assuming primary line)
  const primarySeries = chartPointsBySeries.value[0];
  if (!primarySeries || primarySeries.length === 0) {
    return;
  }
  
  // Create a clipping path that follows the chart line
  // We'll create a polygon that goes along the line and then down to the bottom
  const containerWidth = insetContainerRef.value.offsetWidth;
  const containerHeight = insetContainerRef.value.offsetHeight;
  
  // Generate points along the line path - using percentage values
  const linePoints: string[] = [];
  
  // Start from the left edge, at the height of the first point
  const firstPoint = primarySeries[0];
  const firstY = yScale.value!(firstPoint.y);
  const firstYPercent = (firstY / containerHeight) * 100;
  linePoints.push(`0% ${firstYPercent}%`);
  
  // Add all points along the line
  primarySeries.forEach(point => {
    const x = xScale.value!(dayjs.utc(point.x).toDate());
    const y = yScale.value!(point.y);
    const xPercent = (x / containerWidth) * 100;
    const yPercent = (y / containerHeight) * 100;
    linePoints.push(`${xPercent}% ${yPercent}%`);
  });
  
  // End at the right edge, at the height of the last point
  const lastPoint = primarySeries[primarySeries.length - 1];
  const lastY = yScale.value!(lastPoint.y);
  const lastYPercent = (lastY / containerHeight) * 100;
  linePoints.push(`100% ${lastYPercent}%`);
  
  // Complete the polygon by going to the bottom corners
  linePoints.push(`100% 100%`);
  linePoints.push(`0% 100%`);
  
  const clipPath = `polygon(${linePoints.join(', ')})`;
  insetContainerRef.value.style.clipPath = clipPath;
}

defineExpose({
  updateChartPoints,
  getChartPointCoordinates,
  $el,
});

// Watch for changes in series prop
Vue.watch(() => props.series, (newSeries) => {
  const newPointsBySeries = newSeries.map(series => series.points);
  if (newPointsBySeries.some(series => series.length > 0)) {
    updateChartPoints(newPointsBySeries);
  }
}, { immediate: true });

// Watch for changes in markers prop
Vue.watch(() => props.markers, () => {
  // Markers will automatically update via the computed property
  // This watcher ensures reactivity when markers prop changes
}, { immediate: true });

Vue.onMounted(() => {
  renderChart();
  
  // Set up resize observer for chart container
  if (chartSvgRef.value?.parentElement) {
    resizeObserver = new ResizeObserver(() => {
      renderChart();
      // Re-render the lines if we have data
      if (chartPointsBySeries.value.length > 0 && chartPointsBySeries.value.some(series => series.length > 0)) {
        updateChartPoints(chartPointsBySeries.value);
      }
      // Update clipping path on resize
      Vue.nextTick(() => {
        updateInsetClippingPath();
      });
    });
    resizeObserver.observe(chartSvgRef.value.parentElement);
  }
});

Vue.onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  
  // Clean up tooltips for all series
  props.series.forEach((_, index) => {
    d3.select(`.chart-tooltip-${index}`).remove();
  });
});
</script>

<style>
@reference "tailwindcss";

.TimeChart {
  .y-axis-labels {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .y-axis-label {
    @apply text-gray-600/60;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    font-size: 12px;
    user-select: none;
    transform: translateY(-50%);
    &:last-child {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateY(50%);
    }
  }
}
</style>

<style scoped>
.chart-line {
  stroke: #1f77b4;
  stroke-width: 2;
  fill: none;
}

.grid-line, .y-grid {
  stroke: #ccc;
  stroke-width: 1;
  opacity: 0.1;
}

/* Hide the horizontal caps of the Y-axis domain line */
:deep(.y-axis .domain) {
  stroke-dasharray: none;
}

:deep(.y-axis .domain) {
  vector-effect: non-scaling-stroke;
}

/* Ensure proper alignment and spacing */
.flex {
  align-items: stretch;
}

/* Y-axis labels container styling */
.flex-shrink-0 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

/* Chart area styling */
.flex-grow {
  min-width: 0; /* Allow flex item to shrink below content size */
}
</style>