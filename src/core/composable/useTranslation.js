import { computed, ComputedRef } from 'vue';
import translations from '@/translations';
import { Lang } from '@/core/lib/constants.js';

/**
 * @param {String} component
 * @returns {ComputedRef<Object>}
 */
export default function useTranslation(component) {
  return computed(() => translations[component][Lang]);
}
