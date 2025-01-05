import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";

/**
 * @param {Array<Object>} fields
 * @param {Function} ajaxFunc
 * @param {Object} validators
 * @returns {Object}
 */
export default function useForm(fields, ajaxFunc, sendModel = {}, validators = {}) {

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
    (!!fields.groups && fields.groups.length > 0)
      && fields.groups.forEach(group => {
        (!!group.items && group.items.length > 0)
          && group.items.forEach((field) => {
            if (!field.required) {
              return;
            }
            switch (field.type) {
              case 'email':
                rules[field.code] = [
                  { required: true, message: 'This field is required', trigger: 'blur' },
                  {
                    validator:
                      (rule, value, callback) => {
                        const regularExpression = !!validators[field.type] ? validators[field.type] : defaultEmailRegex;
                        if (regularExpression.test(value)) {
                          return callback();
                        }
                        return callback(new Error('Invalid email'));
                      },
                    trigger: "change"
                  }
                ];
                break;
              case 'select':
                rules[field.code] = [
                  { required: true, message: 'This field is required', trigger: 'change' },
                ];
                break;
              default:
                rules[field.code] = [
                  { required: true, message: 'This field is required', trigger: 'blur' },
                ];
                break;
            }
          });
      });
  }

  const initFormData = () => {
    (!!fields.groups && fields.groups.length > 0)
      && fields.groups.forEach(group => {
        (!!group.items && group.items.length > 0)
          && group.items.forEach((field) => {
            formData[field.code] = null;
          });
      });
  }

  /**
   * @param {ShallowRef} formRef
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
   * @param {ShallowRef} formRef
   * @param {Function} afterSuccess
   */
  const sendRequest = async (formRef, afterSuccess = null) => {
    isLoading.value = true;
    const data = {...sendModel, ...formData};
    await ajaxFunc(data)
      .then((response) => {
        showMessage('Success', response?.data, 'success', afterSuccess);
        isLoading.value = false;
        resetForm(formRef);
      })
      .catch((error) => {
        showMessage('Error', error);
        isLoading.value = false;
      })
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {String} type
   */
  const showMessage = (title, message, type = 'error', callback = null) => {
    ElMessageBox.alert(
      message,
      title,
      {
        customClass: "b-message-box",
        showClose: type === 'success',
        center: true,
        type: type,
        closeOnPressEscape: type === 'success',
        closeOnHashChange: type === 'success',
        showConfirmButton: type === 'error',
        confirmButtonClass: "b-btn b-btn_primary b-btn_normal b-btn_full",
        confirmButtonText: "Close",
        callback: callback
      })
  }

  /**
   * @param {ShallowRef} formRef
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
