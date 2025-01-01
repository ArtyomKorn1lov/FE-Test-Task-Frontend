import { onMounted, onUnmounted, computed } from 'vue';
import { ReloadPaginationEmit, PaginationSelector } from '@/lib/constants';

export default function usePagination(paginationSelector, emit, refreshEmitCode = ReloadPaginationEmit) {

  /**
   * @type {computed$1}
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
