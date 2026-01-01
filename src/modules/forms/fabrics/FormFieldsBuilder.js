import Translations from '@/translations';
import { ArgumentException, ObjectHelper } from '@/core';
import { EmailRegex, PhoneRegex } from '@/modules/forms/constants';
import { FieldsValidateException } from '@/modules/forms/exceptions';
import { FormFields, FormGroup, FormField } from '@/modules/forms/models';

const t = Translations.global.t;

/**
 * @description Builder полей для реактивных форм, генерация правил валидации формы и value-objet'а для хранения значений формы
 */
export default class FormFieldsBuilder {
  /**
   * @protected
   * @type {Object}
   */
  rules = {};
  /**
   * @protected
   * @type {Object}
   */
  formData = {};
  /**
   * @protected
   * @type {FormFields}
   */
  fields;
  /**
   * @protected
   * @type {Object}
   */
  validators = {};

  get getRules() {
    return this.rules;
  }

  get getFormData() {
    return this.formData;
  }

  get getFields() {
    return this.fields;
  }

  /**
   * @constructor
   * @param {FormFields} fields
   * @param {Object} validators
   */
  constructor(fields, validators = {}) {
    this.fields = fields;
    this.validators = validators;
    this.build();
  }

  /**
   * @public
   */
  build() {
    this.validate();
    this.createRules();
    this.createFormData();
  }

  /**
   * @protected
   * @throws {FieldsValidateException}
   */
  validate() {
    if (ObjectHelper.isEmpty(this.fields)) {
      throw new ArgumentException(t('form.builder.errors.empty'));
    }
    if (!ObjectHelper.hasProperty(this.fields, 'groups')) {
      throw new FieldsValidateException(t('form.builder.errors.structure'));
    }
    if (!!this.fields.groups && this.fields.groups.length > 0) {
      this.fields.groups.forEach((group) => this.validateGroup(group));
    }
  }

  /**
   * @protected
   * @param {FormGroup} group
   * @throws {FieldsValidateException}
   */
  validateGroup(group) {
    if (!ObjectHelper.hasProperty(group, 'items')) {
      throw new FieldsValidateException(t('form.builder.errors.structure'));
    }
    if (!!group.items && group.items.length > 0) {
      group.items.forEach((field) => this.validateField(field));
    }
  }

  /**
   * @protected
   * @param {FormField} field
   * @throws {FieldsValidateException}
   */
  validateField(field) {
    if (!ObjectHelper.hasProperty(field, 'code') || !ObjectHelper.hasProperty(field, 'type') || !ObjectHelper.hasProperty(field, 'required')) {
      throw new FieldsValidateException(t('form.builder.errors.structure'));
    }
  }

  /**
   * @public
   * @param {FormFields} fields
   * @param {Boolean} rebuild
   */
  setFields(fields, rebuild = false) {
    this.fields = fields;
    if (rebuild) {
      this.build();
    }
  }

  /**
   * @public
   */
  createRules() {
    this.fields.groups?.forEach((group) => {
      group.items?.forEach((field) => {
        this.setRuleValidation(field);
        this.addCustomRule(field);
      });
    });
  }

  /**
   * @public
   */
  createFormData() {
    this.fields.groups?.forEach((group) => {
      group.items?.forEach((field) => {
        this.setFormDataValue(field);
      });
    });
  }

  /**
   * @public
   * @param {String} fieldCode
   * @param {Array} items
   */
  setFormFieldItems(fieldCode, items) {
    this.fields.groups?.forEach((group, indexGroup) => {
      group.items?.forEach((field, indexField) => {
        if (!(field.code === fieldCode && ObjectHelper.hasProperty(field, 'items'))) {
          return;
        }
        this.fields.groups[indexGroup].items[indexField].items = [...items];
      });
    });
  }

  /**
   * @protected
   * @param {FormField} field
   */
  setRuleValidation(field) {
    if (!field.required) {
      return;
    }

    this.rules[field.code] = [];

    switch (field.type) {
      case 'tel': {
        const phoneValidator = (rule, value, callback) => {
          const regularExpression = this.validators[field.type] ? this.validators[field.type] : PhoneRegex;
          if (regularExpression.test(value)) {
            return callback();
          }
          return callback(t('form.fields.phone.error'));
        };
        this.rules[field.code] = [
          {
            validator: phoneValidator,
            trigger: 'change',
          },
          {
            validator: phoneValidator,
            trigger: 'blur',
          },
        ];
        break;
      }
      case 'email': {
        const emailValidator = (rule, value, callback) => {
          const regularExpression = this.validators[field.type] ? this.validators[field.type] : EmailRegex;
          if (regularExpression.test(value)) {
            return callback();
          }
          return callback(new Error(t('form.fields.email.error')));
        };
        this.rules[field.code] = [
          {
            validator: emailValidator,
            trigger: 'change',
          },
          {
            validator: emailValidator,
            trigger: 'blur',
          },
        ];
        break;
      }
      default:
        break;
    }

    const requiredRule = [
      {
        required: true,
        message: t('form.fields.default.error'),
        trigger: 'change',
      },
      {
        required: true,
        message: t('form.fields.default.error'),
        trigger: 'blur',
      },
    ];

    this.rules[field.code] = [...this.rules[field.code], ...requiredRule];
  }

  /**
   * @protected
   * @param {FormField} field
   */
  addCustomRule(field) {
    if (!field.customRule) {
      return;
    }

    if (!this.rules[field.code]) {
      this.rules[field.code] = [...field.customRule];
    } else {
      this.rules[field.code] = [...this.rules[field.code], ...field.customRule];
    }
  }

  /**
   * @protected
   * @param field
   */
  setFormDataValue(field) {
    this.formData[field.code] = null;
  }
}
