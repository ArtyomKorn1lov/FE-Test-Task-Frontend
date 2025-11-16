import {ref, Ref} from 'vue';
import {NotificationParams} from "@/core/models";
import {MessageHelper} from "@/core/utils";

/**
 * @param {Function} ajaxFunc
 * @param {Boolean} showMessage
 * @param {any} args
 * @return {Object}
 */
export default function useFetching({ajaxFunc, showMessage = true, ...args}) {
  /**
   * @type {Ref<any>}
   */
  const data = ref(null);
  /**
   * @type {Ref<Boolean>}
   */
  const isLoading = ref(false);
  /**
   * @type {Ref<Error|null>}
   */
  const error = ref(null);

  /**
   * @return {Promise<void>}
   */
  const fetch = async () => {
    try {
      isLoading.value = true;
      data.value = await ajaxFunc(...args);
      isLoading.value = false;
    } catch (exception) {
      isLoading.value = false;
      error.value = {...exception};
      MessageHelper.showNotification(new NotificationParams({
        message: exception?.message
      }));
    }
  }

  fetch();
  return {
    data,
    error,
    isLoading
  }
}
