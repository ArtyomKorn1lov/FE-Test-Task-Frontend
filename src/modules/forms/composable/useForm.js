import {ref, reactive, Ref, Reactive, ComputedRef} from "vue";
import {
  ResponseStatus,
  MessageTypes,
  MessageBoxParams,
  MessageHelper,
  useFetch,
  useTranslation,
} from "@/core";
import {emailRegex} from "@/modules/forms";
import {UseFormParams, FormField} from "@/modules/forms/models";

/**
 * Примесь с общей логикой форм обратной связи
 * @param {UseFormParams} args
 * @returns {Object}
 */
export default function useForm(
  {
    fields,
    ajaxFunc,
    sendModel,
    validators = {}
  }
) {

  /**
   * @type {ComputedRef<Object>}
   */
  const formTranslations = useTranslation('form');
  /**
   * @type {ComputedRef<Object>}
   */
  const messageTranslations = useTranslation('core');

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

  /**
   * @type {(function(...args): Promise<any>)}
   */
  const fetch = useFetch({
    ajaxFunc: ajaxFunc,
    messageType: MessageTypes.messageBox
  });

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

  /**
   * @param {FormField} field
   */
  const setRuleValidation = (field) => {
    rules[field.code] = [];

    switch (field.type) {
      case 'email':
        const emailValidator = (rule, value, callback) => {
          const regularExpression = !!validators[field.type] ? validators[field.type] : emailRegex;
          if (regularExpression.test(value)) {
            return callback();
          }
          return callback(new Error(formTranslations.value.fields.email.error));
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

    const requiredRule = [
      {
        required: true,
        message: formTranslations.value.fields.default.error,
        trigger: 'change'
      },
      {
        required: true,
        message: formTranslations.value.fields.default.error,
        trigger: 'blur'
      },
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

  /**
   * @param {FormField} field
   */
  const setFormDataValue = (field) => {
    formData[field.code] = null;
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
      isLoading.value = true;
      const model = new sendModel(formData);
      const response = await fetch(model);
      resetForm(formRef);
      isLoading.value = false;
      await MessageHelper.showMessageBox(new MessageBoxParams({
        title: messageTranslations.value.messages.successTitle,
        message: response?.data,
        type: ResponseStatus.success,
        callback: afterSuccess
      }));
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

  onInit();

  return {
    formData,
    isLoading,
    rules,
    onSubmit
  }
}
