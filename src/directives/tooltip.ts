import { createApp, type DirectiveBinding } from 'vue';
import TooltipComponent from './TooltipComponent.vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltipApp = createApp(TooltipComponent, { text: binding.value });
    const tooltipInstance = tooltipApp.mount(document.createElement('div')) as any;

    document.body.appendChild(tooltipInstance.$el);

    // Mouseover event
    el.addEventListener('mouseover', (event) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY + rect.height + 12;
      
      let left: number | null = rect.left + window.scrollX + rect.width / 2;
      let right: number | null = null;
      
      let arrowLeft: number | null = left;
      let arrowRight: number | null = null;

      if (el.getAttribute('align') === 'right') {
        left = null;
        right = window.innerWidth - (rect.left + window.scrollX + rect.width);
        arrowLeft = null;
        arrowRight = window.innerWidth - (rect.left + window.scrollX + (rect.width / 2));
      }

      console.log(top, left, right);

      tooltipInstance.showTooltip({ top, left, right, arrowLeft, arrowRight });
    });

    // Mouseout event
    el.addEventListener('mouseout', () => {
      tooltipInstance.hideTooltip();
    });

    // Cleanup on unmount
    (el as any)._tooltipInstance = tooltipInstance;
    (el as any)._tooltipApp = tooltipApp;
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._tooltipApp) {
      (el as any)._tooltipApp.unmount();
    }
    try {
      if ((el as any)._tooltipInstance.$el) {
        document.body.removeChild((el as any)._tooltipInstance.$el);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
