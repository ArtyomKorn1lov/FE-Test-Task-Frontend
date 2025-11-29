import {ObjectHelper} from "@/core";
import {EmailRegex} from "@/modules/forms/constants";
import {FieldsValidateException} from "@/modules/forms/exceptions";
import {FormFields, FormGroup, FormField} from "@/modules/forms/models";

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

  get rules() {
    return this.rules;
  }

  get formData() {
    return this.formData;
  }

  get fields() {
    return this.fields;
  }

  /**
   * @constructor
   * @param {FormFields} fields
   * @param {Object} validators
   */
  constructor(fields, validators) {
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
    if (!ObjectHelper.hasProperty(this.fields, "groups")) {
      throw new FieldsValidateException("Invalid form field data structure");
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
    if (!ObjectHelper.hasProperty(group, "items")) {
      throw new FieldsValidateException("Invalid form field data structure");
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
    if (
      !ObjectHelper.hasProperty(field, "code")
      || !ObjectHelper.hasProperty(field, "type")
      || !ObjectHelper.hasProperty(field, "required")
    ) {
      throw new FieldsValidateException("Invalid form field data structure");
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
    this.fields.groups?.forEach(group => {
      group.items?.forEach(field => {
        this.setRuleValidation(field);
        this.addCustomRule(field);
      });
    });
  }

  /**
   * @public
   */
  createFormData() {
    this.fields.groups?.forEach(group => {
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
        if (!(field.code === fieldCode && ObjectHelper.hasProperty(field, "items"))) {
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
      case 'email':
        const emailValidator = (rule, value, callback) => {
          const regularExpression = !!this.validators[field.type] ? this.validators[field.type] : EmailRegex;
          if (regularExpression.test(value)) {
            return callback();
          }
          return callback(new Error("Invalid email"));
        }
        this.rules[field.code] = [
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
        message: "This field is required",
        trigger: 'change'
      },
      {
        required: true,
        message: "This field is required",
        trigger: 'blur'
      },
    ];

    this.rules[field.code] = [...this.rules[field.code], ...requiredRule];
  }

  /**
   * @protected
   * @param {FormField} field
   */
  addCustomRule(field) {
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
