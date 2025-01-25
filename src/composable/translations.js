import { computed } from 'vue';
import translations from '@/translations';
import { Lang } from '@/lib/constants';

/**
 * @param {String} component
 * @returns {computed}
 */
export default function useTranslation(component) {

  /**
   * @type {String}
   */
  const loc = computed(() => translations[component][Lang]);

  return loc;
}
