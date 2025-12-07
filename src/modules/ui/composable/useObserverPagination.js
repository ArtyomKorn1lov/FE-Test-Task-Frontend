import {onMounted, onUnmounted, computed} from 'vue';
import {TemplateHelper} from "@/core";
import {ReloadPaginationEmit, PaginationSelectorCode} from "@/modules/ui";

/**
 * Примесь с общей логикой пагинации через IntersectionObserver
 * @param {String} paginationSelector
 * @param {VoidFunction} emit
 * @param {String} refreshEmitCode
 */
export default function useObserverPagination(paginationSelector, emit, refreshEmitCode = ReloadPaginationEmit) {
  /**
   * @type {import('vue').ComputedRef<String>}
   */
  const observerSelector = computed(() => !!paginationSelector ? paginationSelector : PaginationSelectorCode);

  /**
   * @type {IntersectionObserver}
   */
  const observer = new IntersectionObserver((entries) => {
    if (!entries || entries.length <= 0) {
      return;
    }
    const isIntersecting = entries[0]?.isIntersecting;
    !!isIntersecting && emit(refreshEmitCode);
  });

  onMounted(() => {
    let observable = TemplateHelper.getElementByClassName(observerSelector.value);
    observer.observe(observable);
  });

  onUnmounted(() => {
    observer.disconnect();
  });
}
