import {onMounted, onUnmounted, computed, ComputedRef} from 'vue';
import {ReloadPaginationEmit, PaginationSelector} from "@/modules/ui";

/**
 * Примесь с общей логикой пагинации через IntersectionObserver
 * @param {String} paginationSelector
 * @param {VoidFunction} emit
 * @param {String} refreshEmitCode
 */
export default function useObserverPagination(paginationSelector, emit, refreshEmitCode = ReloadPaginationEmit) {
  /**
   * @type {ComputedRef<String>}
   */
  const observerSelector = computed(() => !!paginationSelector ? paginationSelector : PaginationSelector);

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
    let observable = document.querySelector(observerSelector.value);
    observer.observe(observable);
  });

  onUnmounted(() => {
    observer.disconnect();
  });
}
