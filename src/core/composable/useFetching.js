import {ref} from 'vue';
import {ArgumentException} from "@/core/exceptions";
import {MessageHelper} from "@/core/utils";
import {BaseUseCase} from "@/core/use-case";

/**
 * @param {Function} ajaxFunc
 * @param {BaseUseCase} useCase
 * @param {Boolean} showMessage
 * @param {any} args
 * @return {Object}
 * @throws {ArgumentException|Error}
 */
export default function useFetching(
  {
    ajaxFunc = null,
    useCase = null,
    showMessage = true,
    ...args
  }
) {
  /**
   * @type {import('vue').Ref<any>}
   */
  const data = ref(null);
  /**
   * @type {import('vue').Ref<Boolean>}
   */
  const isLoading = ref(false);
  /**
   * @type {import('vue').Ref<Error|null>}
   */
  const error = ref(null);

  /**
   * @return {Promise<void>}
   */
  const fetch = async () => {
    try {
      isLoading.value = true;
      if (!!useCase) {
        data.value = await useCase.execute(...args);
      } else {
        data.value = await ajaxFunc(...args);
      }
      isLoading.value = false;
    } catch (exception) {
      isLoading.value = false;
      error.value = {...exception};
      if (showMessage) {
        MessageHelper.showNotification({
          message: exception?.message
        });
      }
    }
  }

  if (!useCase && !ajaxFunc) {
    throw new ArgumentException("The request execution method cannot be empty");
  }
  fetch();
  return {
    data,
    error,
    isLoading
  }
}
