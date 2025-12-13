import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { ResponseStatus, MessageTypes, MessageHelper, FileHelper, File as CustomFile, CommonResponse, BaseUseCase, useFetch } from '@/core';
import { FileDividerTypeCasting } from '@/core';
import { MaxFileSize } from '@/modules/forms/constants';
import { FileUploadException } from '@/modules/forms/exceptions';
import { FormFields, FormField } from '@/modules/forms/models';
import { FormFieldsBuilder } from '@/modules/forms/fabrics';

/**
 * @description Примесь с общей логикой форм обратной связи
 * @param {{ formFields: FormFields, ajaxFunc: Function, useCase: BaseUseCase, sendModel: Class, validators: Object }} args
 * @returns {Object}
 */
export default function useForm({ formFields, ajaxFunc = null, useCase = null, sendModel = null, validators = {} }) {
  const { t } = useI18n();

  const fieldBuilder = new FormFieldsBuilder(formFields, validators);

  /**
   * @type {import('vue').Reactive<FormFields>}
   */
  const fields = reactive(formFields);
  /**
   * @type {import('vue').Reactive<Object>}
   */
  const formData = reactive(fieldBuilder.getFormData);
  /**
   * @type {import('vue').Ref<Boolean>}
   */
  const isLoading = ref(false);
  /**
   * @type {import('vue').Reactive<Object>}
   */
  const rules = reactive(fieldBuilder.getRules);

  /**
   * @type {(function(...args): Promise<CommonResponse>)}
   */
  const fetch = useFetch({
    useCase: useCase,
    ajaxFunc: ajaxFunc,
    messageType: MessageTypes.messageBox,
  });

  /**
   * @param {String} fieldCode
   * @param {Array} items
   */
  const setFieldItems = (fieldCode, items) => {
    fieldBuilder.setFields(fields);
    fieldBuilder.setFormFieldItems(fieldCode, items);
    Object.assign(fields, fieldBuilder.getFields);
  };

  /**
   * @param {Object} values
   */
  const setFormDataValues = (values) => {
    Object.assign(formData, values);
  };

  /**
   * @param {String} code
   */
  const removeFormDataValue = (code) => {
    formData[code] = null;
  };

  /**
   * @param {File} rawFile
   * @return {Boolean}
   */
  const onFileUpload = (rawFile) => {
    try {
      const maxFileSizInBytes = MaxFileSize * Math.pow(FileDividerTypeCasting, 2);
      if (!FileHelper.checkMaxFileSize(rawFile, maxFileSizInBytes)) {
        throw new FileUploadException(t('form.files.fileSizeErrorMessage'));
      }
      return true;
    } catch (/** @type {Error} */ exception) {
      MessageHelper.showNotification({
        message: exception.message,
      });
      return false;
    }
  };

  /**
   * @param {String} code
   * @param {CommonResponse} response
   * @param {Object} uploadFile
   */
  const onFileUploadSuccess = async (code, response, uploadFile) => {
    try {
      MessageHelper.showNotification({
        title: t('core.messages.successTitle'),
        message: response?.message,
        type: ResponseStatus.success,
      });
      formData[code] = new CustomFile({
        file: await FileHelper.convertToBase64(uploadFile.raw),
        name: uploadFile.name,
        url: FileHelper.createFileUrl(uploadFile.raw),
      });
    } catch (/** @type {Error} */ exception) {
      console.error(exception);
      MessageHelper.showNotification({
        message: exception.message,
      });
    }
  };

  /**
   * @param {Object} formRef
   * @param {VoidFunction} afterSuccess
   * @param {Boolean} resetFrom
   * @return {Promise<void>}
   */
  const onSubmit = async (formRef, afterSuccess = null, resetFrom = true) => {
    if (!formRef) {
      return;
    }

    await formRef.validate(async (valid, fields) => {
      if (!valid) {
        return;
      }
      await sendRequest(formRef, afterSuccess, resetFrom);
    });
  };

  /**
   * @param {Object} formRef
   * @param {VoidFunction} afterSuccess
   * @param {Boolean} resetFrom
   * @return {Promise<void>}
   */
  const sendRequest = async (formRef, afterSuccess = null, resetFrom = true) => {
    try {
      let model;
      if (!sendModel) {
        model = formData;
      } else {
        model = new sendModel({ ...formData });
      }
      isLoading.value = true;
      const response = await fetch(model);
      isLoading.value = false;
      !!resetFrom && resetForm(formRef);
      await MessageHelper.showMessageBox({
        title: t('core.messages.successTitle'),
        message: response?.message,
        type: ResponseStatus.success,
        callback: afterSuccess,
      });
    } catch (e) {
      isLoading.value = false;
    }
  };

  /**
   * @param {Object} formRef
   */
  const resetForm = (formRef) => {
    if (!formRef) return;
    formRef.resetFields();
  };

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
    resetForm,
  };
}
