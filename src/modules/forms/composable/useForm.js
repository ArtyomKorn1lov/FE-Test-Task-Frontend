import {ref, reactive, Ref, Reactive, ComputedRef} from "vue";
import {
  ResponseStatus,
  MessageTypes,
  MessageHelper,
  FileHelper,
  File as CustomFile,
  BaseUseCase,
  useFetch,
  useTranslation,
} from "@/core";
import {FileDividerTypeCasting} from "@/core";
import {MaxFileSize} from "@/modules/forms/constants";
import {FileUploadException} from "@/modules/forms/exceptions";
import {FormFields, FormField} from "@/modules/forms/models";
import {FormFieldsBuilder} from "@/modules/forms/fabrics";

/**
 * @description Примесь с общей логикой форм обратной связи
 * @param {{ formFields: FormFields, ajaxFunc: Function, useCase: BaseUseCase, sendModel: Class, validators: Object }} args
 * @returns {Object}
 */
export default function useForm(
  {
    formFields,
    ajaxFunc = null,
    useCase = null,
    sendModel = null,
    validators = {}
  }
) {
  /**
   * @type {ComputedRef<Object>}
   */
  const messageTranslations = useTranslation('core');

  const fieldBuilder = new FormFieldsBuilder(formFields, validators);

  /**
   * @type {Reactive<FormFields>}
   */
  const fields = reactive(formFields);
  /**
   * @type {Reactive<Object>}
   */
  const formData = reactive(fieldBuilder.formData);
  /**
   * @type {Ref<Boolean>}
   */
  const isLoading = ref(false);
  /**
   * @type {Reactive<Object>}
   */
  const rules = reactive(fieldBuilder.rules);

  /**
   * @type {(function(...args): Promise<any>)}
   */
  const fetch = useFetch({
    useCase: useCase,
    ajaxFunc: ajaxFunc,
    messageType: MessageTypes.messageBox
  });

  /**
   * @param {String} fieldCode
   * @param {Array} items
   */
  const setFieldItems = (fieldCode, items) => {
    fieldBuilder.setFields(fields);
    fieldBuilder.setFormFieldItems(fieldCode, items);
    Object.assign(fields, fieldBuilder.fields);
  }

  /**
   * @param {Object} values
   */
  const setFormDataValues = (values) => {
    Object.assign(formData, values);
  }

  /**
   * @param {String} code
   */
  const removeFormDataValue = (code) => {
    formData[code] = null;
  }

  /**
   * @param {File} rawFile
   * @return {Boolean}
   */
  const onFileUpload = (rawFile) => {
    try {
      const maxFileSizInBytes = MaxFileSize * Math.pow(FileDividerTypeCasting, 2);
      if (!FileHelper.checkMaxFileSize(rawFile, maxFileSizInBytes)) {
        throw new FileUploadException("Picture size can not exceed");
      }
      return true;
    } catch (/** @type {Error} */ exception) {
      MessageHelper.showNotification({
        message: exception.message
      });
      return false;
    }
  }

  /**
   * @param {String} code
   * @param {String} response
   * @param {Object} uploadFile
   */
  const onFileUploadSuccess = async (code, response, uploadFile) => {
    try {
      MessageHelper.showNotification({
        message: response,
        type: ResponseStatus.success
      });
      formData[code] = new CustomFile({
        file: await FileHelper.convertToBase64(uploadFile.raw),
        name: uploadFile.name,
        url: FileHelper.createFileUrl(uploadFile.raw)
      });
    } catch (/** @type {Error} */ exception) {
      console.error(exception);
      MessageHelper.showNotification({
        message: exception.message,
      });
    }
  }

  /**
   * @param {Object} formRef
   * @param {VoidFunction} afterSuccess
   */
  const onSubmit = async (formRef, afterSuccess = null) => {
    if (!formRef) {
      return;
    }

    await formRef.validate(async (valid, fields) => {
      if (!valid) {
        return;
      }
      await sendRequest(formRef, afterSuccess);
    });
  }

  /**
   * @param {Object} formRef
   * @param {VoidFunction} afterSuccess
   */
  const sendRequest = async (formRef, afterSuccess = null) => {
    try {
      let model;
      if (!sendModel) {
        model = formData;
      } else {
        model = new sendModel({...formData});
      }
      isLoading.value = true;
      const response = await fetch(model);
      isLoading.value = false;
      resetForm(formRef);
      await MessageHelper.showMessageBox({
        title: messageTranslations.value.messages.successTitle,
        message: response?.data,
        type: ResponseStatus.success,
        callback: afterSuccess
      });
    } catch (e) {
      isLoading.value = false;
    }
  }

  /**
   * @param {Object} formRef
   */
  const resetForm = (formRef) => {
    if (!formRef) return;
    formRef.resetFields()
  }

  return {
    fields,
    formData,
    isLoading,
    rules,
    setFieldItems,
    setFormDataValues,
    removeFormDataValue,
    onFileUpload,
    onFileUploadSuccess,
    onSubmit,
    resetForm
  }
}
