<template>
  <div ref="$el" class="TimeChart Component relative min-h-[400px] w-full flex flex-row">
    <!-- Y-axis labels container -->
    <div class="absolute top-0 left-0 h-full -translate-x-full flex flex-col justify-between" :style="{ paddingBottom: xAxisHeight + 'px' }">
      <div ref="yAxisLabelsRef" class="y-axis-labels border-r border-gray-600"></div>
    </div>
    
    <!-- Chart area container -->
    <div class="relative flex-grow flex flex-col">

      <!-- Chart area -->
      <div class="relative flex-grow">
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
          <slot />
        </div>
        <svg ref="chartSvgRef" class="w-full h-full"></svg>
      </div>

      <!-- X-axis labels container -->
      <div XAxisLabels ref="xAxisLabelsRef" class="absolute bottom-0 right-0 w-full flex flex-row justify-between x-axis-labels"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const props = defineProps<{
  series: { color: string, points: { x: string, y: number }[] }[];
  startingDate?: string;
  xTimeUnit?: string;
  maxYAxisValue?: number;
  fmtYAxisLabel?: (y: number) => string;
}>();

const $el = Vue.ref<HTMLDivElement | null>(null);

const yAxisLabelsRef = Vue.ref<HTMLDivElement | null>(null);
const xAxisLabelsRef = Vue.ref<HTMLDivElement | null>(null);
const chartSvgRef = Vue.ref<SVGSVGElement | null>(null);
const yAxisWidth = Vue.ref(60); // Dynamic width for y-axis labels
const xAxisHeight = Vue.ref(25); // Height for x-axis labels

const chartPointsBySeries = Vue.ref<{x: string, y: number}[][]>([]);
let chartSvg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
let xScale: d3.ScaleTime<number, number> | null = null;
let yScale: d3.ScaleLinear<number, number> | null = null;
let resizeObserver: ResizeObserver | null = null;

const margin = { top: 0, right: 0, bottom: xAxisHeight.value, left: 1 }; // No left margin since labels are separate
const height = 400;

// Computed properties for reusable calculations
const dateRange = Vue.computed(() => {
  const startDate = props.startingDate ? dayjs.utc(props.startingDate).toDate() : dayjs.utc('1933-01-01').toDate();
  const startYear = dayjs.utc(startDate).year();
  
  let endYear = 2030;
  if (chartPointsBySeries.value.length > 0) {
    const allYears = chartPointsBySeries.value.flat().map(p => dayjs.utc(p.x).year());
    if (allYears.length > 0) {
      const maxDataYear = Math.max(...allYears);
      endYear = Math.max(2030, maxDataYear);
    }
  }
  
  const endDate = dayjs.utc(`${endYear}-01-01`).toDate();
  return { startDate, endDate, startYear, endYear };
});

const maxYValue = Vue.computed(() => {
  if (props.maxYAxisValue) return props.maxYAxisValue;
  
  // Calculate max value across all series
  let maxValue = 100; // default
  if (chartPointsBySeries.value.length > 0) {
    const allValues = chartPointsBySeries.value.flat().map(p => p.y);
    if (allValues.length > 0) {
      maxValue = Math.max(...allValues);
    }
  }
  return maxValue;
});

const timeUnitInfo = Vue.computed(() => {
  const { startYear, endYear } = dateRange.value;
  const timeSpan = endYear - startYear;
  const showCenturies = timeSpan > 200;
  
  return { showCenturies, timeSpan };
});

function calculateYAxisWidth() {
  // Calculate the width needed for y-axis labels based on the data
  const maxValue = maxYValue.value;
  
  // Create a temporary scale to get tick values
  const tempScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, 100]);
  
  const ticks = tempScale.ticks(10);
  const maxTickLength = Math.max(...ticks.map(tick => tick.toString().length));
  
  // Estimate width: ~8px per character + padding
  const estimatedWidth = Math.max(50, maxTickLength * 8 + 20);
  yAxisWidth.value = estimatedWidth;
}

function renderYAxisLabels() {
  if (!yAxisLabelsRef.value || !yScale) return;

  // Clear existing labels
  yAxisLabelsRef.value.innerHTML = '';

  // Get tick values and reverse them to match the inverted chart
  const ticks = yScale.ticks(10).reverse();
  
  // Create label elements with equal spacing
  ticks.forEach((tick, index) => {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'y-axis-label';
    labelDiv.textContent = props.fmtYAxisLabel ? props.fmtYAxisLabel(tick) : tick.toString();
    
    // Each label gets equal height (100% / number of ticks)
    const percentage = 100 / ticks.length;
    
    // Style the label with equal percentage height
    labelDiv.style.height = `${percentage}%`;
    
    yAxisLabelsRef.value!.appendChild(labelDiv);
  });
}

function generateTickValues() {
  const { startYear, endYear } = dateRange.value;
  const { showCenturies } = timeUnitInfo.value;
  const tickValues = [];
  
  if (showCenturies) {
    // Generate century centers (middle of each century)
    const firstCentury = Math.ceil(startYear / 100) * 100;
    for (let year = firstCentury; year <= endYear; year += 100) {
      tickValues.push(dayjs.utc(`${year - 50}-01-01`).toDate()); // Center of the century
    }
  } else {
    // Generate decade centers (middle of each decade)
    const firstDecade = Math.ceil(startYear / 10) * 10;
    for (let year = firstDecade; year <= endYear; year += 10) {
      tickValues.push(dayjs.utc(`${year - 5}-01-01`).toDate()); // Center of the decade
    }
  }
  
  return tickValues;
}

function generateGridLineDates() {
  const { startYear, endYear } = dateRange.value;
  const { showCenturies } = timeUnitInfo.value;
  const gridLineDates = [`${startYear}-01-01`];

  if (showCenturies) {
    // Generate grid lines every 100 years (centuries)
    const firstCentury = Math.ceil(startYear / 100) * 100;
    for (let year = firstCentury; year < endYear; year += 100) {
      gridLineDates.push(`${year}-01-01`);
    }
  } else {
    // Generate grid lines every 10 years (decades)
    const firstDecade = Math.ceil(startYear / 10) * 10;
    for (let year = firstDecade; year < endYear; year += 10) {
      gridLineDates.push(`${year}-01-01`);
    }
  }
  
  return gridLineDates;
}

function renderXAxisLabels() {
  if (!xAxisLabelsRef.value || !xScale) return;

  // Clear existing labels
  xAxisLabelsRef.value.innerHTML = '';

  const gridLineDates = generateGridLineDates();
  const { showCenturies } = timeUnitInfo.value;
  
  // Get the container width
  const containerWidth = xAxisLabelsRef.value.parentElement?.clientWidth || 800;

  // Create label elements positioned based on x-scale
  gridLineDates.forEach((dateString, index) => {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'x-axis-label';
    
    // Create date in UTC to avoid timezone issues
    const date = dayjs.utc(dateString).toDate();
    const year = dayjs.utc(dateString).year();
    if (showCenturies) {
      const century = Math.floor(year / 100) * 100;
      labelDiv.textContent = `${century}s`;
    } else {
      const decade = Math.floor(year / 10) * 10;
      labelDiv.textContent = `${decade}s`;
    }
    
    // Calculate the width for this label (distance to next grid line)
    let labelWidth: number;
    if (index < gridLineDates.length - 1) {
      // Width is the distance to the next grid line
      const currentPosition = xScale!(date);
      const nextDate = dayjs.utc(gridLineDates[index + 1]).toDate();
      const nextPosition = xScale!(nextDate);
      labelWidth = nextPosition - currentPosition;
    } else {
      // For the last label, calculate width based on the time period it represents
      // Use the same time span as other labels (10 years for decades, 100 years for centuries)
      const timeSpan = showCenturies ? 100 : 10;
      const endDate = dayjs.utc(date).add(timeSpan, 'year').toDate();
      const currentPosition = xScale!(date);
      const endPosition = xScale!(endDate);
      labelWidth = endPosition - currentPosition;
    }
    
    // Convert to percentage of container width
    const widthPercentage = (labelWidth / containerWidth) * 100;
    
    // Style the label with the correct width
    labelDiv.style.width = `${widthPercentage}%`;
    
    xAxisLabelsRef.value!.appendChild(labelDiv);
  });
}

function customizeAxes() {
  // No axis customizations needed since we're using divs for labels
}

function createLineGenerator() {
  return d3.line<{x: string, y: number}>()
    .x((d) => xScale!(dayjs.utc(d.x).toDate()))
    .y((d) => yScale!(d.y))
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
      .attr('cx', (d) => xScale!(dayjs.utc(d.x).toDate()))
      .attr('cy', (d) => yScale!(d.y))
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
  if (!chartSvg || !yScale) return;
  
  const yTicks = yScale.ticks(10);
  const gridGroup = chartSvg.select('.grid-group');
  
  gridGroup.selectAll('.y-grid')
    .data(yTicks)
    .enter()
    .append('line')
    .attr('class', 'y-grid')
    .attr('x1', 0)
    .attr('x2', chartSvgRef.value!.clientWidth - margin.right)
    .attr('y1', (d) => yScale!(d))
    .attr('y2', (d) => yScale!(d))
    .attr('stroke', (d) => d === 0 ? '#000' : '#ccc')
    .attr('stroke-width', (d) => d === 0 ? 1 : 1)
    .attr('opacity', 0.5);
}

function renderChart() {
  if (!yAxisLabelsRef.value || !xAxisLabelsRef.value || !chartSvgRef.value) {
    return;
  }

  // Calculate y-axis width first
  calculateYAxisWidth();

  // Get the container width for the chart area
  const chartContainerWidth = chartSvgRef.value.parentElement?.clientWidth || 800;
  const chartWidth = chartContainerWidth;

  // Calculate max value from data, with a small buffer
  const maxValue = maxYValue.value;
  
  yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([height - margin.bottom, margin.top]);

  // Create scales
  const { startDate, endDate } = dateRange.value;
  
  xScale = d3.scaleTime()
    .domain([startDate, endDate])
    .range([margin.left, chartWidth - margin.right]);

  // Clear existing chart content
  d3.select(chartSvgRef.value).selectAll("*").remove();

  // Create chart SVG
  chartSvg = d3.select(chartSvgRef.value)
    .attr("width", chartWidth)
    .attr("height", height);

  // Create x-axis with dynamic tick values based on starting date and data
  const tickValues = generateTickValues().map(date => dayjs.utc(date).startOf('year').toDate());
  const gridLineDates = generateGridLineDates();
  const { showCenturies } = timeUnitInfo.value;
  
  const xAxis = d3.axisBottom(xScale)
    .tickFormat((d) => {
      const date = d as Date;
      const year = date.getFullYear();
      if (showCenturies) {
        const century = Math.floor(year / 100) * 100;
        return `${century}s`;
      } else {
        const decade = Math.floor(year / 10) * 10;
        return `${decade}s`;
      }
    })
    .tickValues(tickValues);

  // Render Y-axis and X-axis labels as divs
  renderYAxisLabels();
  renderXAxisLabels();

  // Create a group for grid lines in chart SVG
  const gridGroup = chartSvg.append('g').attr('class', 'grid-group');
  
  gridGroup.selectAll('.grid-line')
    .data(gridLineDates)
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('x1', (d) => xScale!(dayjs.utc(d).toDate()))
    .attr('x2', (d) => xScale!(dayjs.utc(d).toDate()))
    .attr('y1', margin.top)
    .attr('y2', height - margin.bottom + 100)
    .attr('stroke', '#ccc')
    .attr('stroke-width', 1)
    .attr('opacity', 0.5);

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
}

function updateChartPoints(newPointsBySeries: {x: string, y: number}[][]) {
  chartPointsBySeries.value = newPointsBySeries.map(series => [...series]);
  
  if (chartSvg && xScale && yScale && newPointsBySeries.some(series => series.length > 0)) {
    // Recalculate y-axis width based on new data
    calculateYAxisWidth();
    
    // Recalculate y-scale based on new data
    const maxValue = maxYValue.value;
    yScale!.domain([0, maxValue]);
    yScale!.range([height - margin.bottom, margin.top]);
    
    // Update y-axis and x-axis labels as divs
    renderYAxisLabels();
    renderXAxisLabels();
    
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
        const linePath = chartSvg!.select(`.chart-line-${index}`)
          .datum(seriesPoints)
          .attr('d', line);
      }
    });

    // Update tooltip circles in chart SVG
    createTooltipCircles();
  }
}

function getChartPointCoordinates(seriesIndex: number, pointIndex: number): { x: number; y: number; } | null {
  console.log('getChartPointCoordinates: ', seriesIndex, pointIndex);
  if (!xScale || !yScale || seriesIndex < 0 || seriesIndex >= chartPointsBySeries.value.length) {
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
  const x = xScale(dayjs.utc(point.x).toDate());
  const y = yScale(point.y);
  
  return { x, y };
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
  }

  .y-axis-label {
    @apply text-gray-600/60;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    font-size: 12px;
    user-select: none;
  }

  .x-axis-label {
    @apply text-gray-600/60;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    user-select: none;
    padding-top: 5px;
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