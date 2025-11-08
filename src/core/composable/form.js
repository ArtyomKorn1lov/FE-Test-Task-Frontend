import { ref, reactive, Ref, Reactive } from "vue";
import { ElMessageBox } from "element-plus";
import useTranslation from '@/core/composable/translations.js';
import { SuccessStatusCode, ErrorStatusCode } from "@/core/lib/constants.js";

/**
 * Хук с общей логикой форм обратной связи
 * @param {Array<Object>} fields
 * @param {Function} ajaxFunc
 * @param {Object} sendModel
 * @param {Object} validators
 * @returns {Object}
 */
export default function useForm(fields, ajaxFunc, sendModel = {}, validators = {}) {

  const loc = useTranslation('form');

  /**
   * @type {RegExp}
   */
  const defaultEmailRegex = /^(([^%№/!<>()\[\]\\.,;:\s@"]+(\.[^%№/!<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * @type {Reactive<Object>}
   */
  const formData = reactive({});
  /**
   * @type {Ref<Boolean>}
   */
  const isLoading = ref(false);
  /**
   * @type {Reactive<Object>}
   */
  const rules = reactive({});

  const onInit = () => {
    initRules();
    initFormData();
  }

  const initRules = () => {
    fields?.groups?.forEach(group => {
      group?.items?.forEach(field => {
        if (!field.required) {
          return;
        }
        setRuleValidation(field);
      });
    });
  }

  const setRuleValidation = (field) => {
    rules[field.code] = [];

    switch (field.type) {
      case 'email':
        const emailValidator = (rule, value, callback) => {
          const regularExpression = !!validators[field.type] ? validators[field.type] : defaultEmailRegex;
          if (regularExpression.test(value)) {
            return callback();
          }
          return callback(new Error(loc.value.fields.email.error));
        }
        rules[field.code] = [
          {
            validator: emailValidator,
            trigger: "change"
          },
          {
            validator: emailValidator,
            trigger: "blur"
          }
        ];
        break;
      default:
        break;
    }

    const requiredRule = rules[field.code] = [
      { required: true, message: loc.value.fields.default.error, trigger: 'change' },
      { required: true, message: loc.value.fields.default.error, trigger: 'blur' },
    ];

    rules[field.code] = [...rules[field.code], ...requiredRule];
  }

  const initFormData = () => {
    fields?.groups?.forEach(group => {
      group?.items?.forEach((field) => {
        setFormDataValue(field);
      });
    });
  }

  const setFormDataValue = (field) => {
    formData[field.code] = null;
  }

  /**
   * @param {Object} formRef
   * @param {Function} afterSuccess
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
   * @param {Function} afterSuccess
   */
  const sendRequest = async (formRef, afterSuccess = null) => {
    isLoading.value = true;
    const data = { ...sendModel, ...formData };
    await ajaxFunc(data)
      .then(async (response) => {
        resetForm(formRef);
        isLoading.value = false;
        await showMessage(
          loc.value.messageBox.successTitle,
          response?.data,
          SuccessStatusCode,
          afterSuccess
        );
      })
      .catch(async (error) => {
        await showMessage(loc.value.messageBox.errorTitle, error);
        isLoading.value = false;
      })
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {String} type
   * @param {Function} callback
   */
  const showMessage = async (title, message, type = 'error', callback = null) => {
    await ElMessageBox.alert(
      message,
      title,
      {
        customClass: "b-message-box",
        showClose: type === SuccessStatusCode,
        center: true,
        type: type,
        closeOnPressEscape: type === SuccessStatusCode,
        closeOnHashChange: type === SuccessStatusCode,
        showConfirmButton: type === ErrorStatusCode,
        confirmButtonClass: "b-btn b-btn_primary b-btn_normal b-btn_full",
        confirmButtonText: loc.value.messageBox.confirmButtonText,
        callback: callback
      });
  }

  /**
   * @param {Object} formRef
   */
  const resetForm = (formRef) => {
    if (!formRef) return;
    formRef.resetFields()
  }

  onInit();

  return {
    formData,
    isLoading,
    rules,
    onSubmit
  }
}
