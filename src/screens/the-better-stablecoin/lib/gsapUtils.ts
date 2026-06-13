import * as Vue from "vue";
import { type VNodeRef } from "vue";

type VNodeRefCallback = Extract<VNodeRef, (...args: any[]) => void>;
type VNodeRefElement = Parameters<VNodeRefCallback>[0];

export function setRef(refs: Vue.Ref<HTMLElement[]>): VNodeRef {
  return (el) => {
    const element = resolveElement(el);
    if (element) refs.value.push(element);
    void Vue.nextTick(() => {
      const element = resolveElement(el);
      if (element && !refs.value.includes(element)) refs.value.push(element);
    });
  }
}

function resolveElement(el: VNodeRefElement) {
  if (el instanceof Element) return el as HTMLElement;

  const component = el as { $el?: unknown; rootEl?: unknown; value?: unknown } | null;

  return [
    component?.rootEl,
    component?.$el,
    component?.value,
    (component?.rootEl as { value?: unknown } | null)?.value,
    (component?.$el as { value?: unknown } | null)?.value,
  ].find((element): element is HTMLElement => element instanceof Element) ?? null;
}
