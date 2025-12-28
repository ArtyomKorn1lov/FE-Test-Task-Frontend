import Translations from '@/translations';
import { EmailRegex, PhoneRegex } from '@/core/constants';
import { ValidationException } from '@/core/exceptions';
import { ArrayHelper, ObjectHelper, FormatHelper } from '@/core/utils';

const t = Translations.global.t;

export default class ValidationProvider {
  /**
   * @protected
   * @param {any} value
   * @param {String} code
   * @throws {ValidationException}
   */
  checkUndefined(value, code) {
    if (value === undefined) {
      throw new ValidationException(t('core.services.undefinedValueError', { code: code }));
    }
  }

  /**
   * @protected
   * @param {any} value
   * @return {Boolean}
   */
  isArray(value) {
    return ArrayHelper.isArray(value);
  }

  /**
   * @protected
   * @param {any} value
   * @return {Boolean}
   */
  isObject(value) {
    return ObjectHelper.isObject(value);
  }

  /**
   * @protected
   * @param {Object} value
   * @return {Boolean}
   */
  isEmptyObject(value) {
    return ObjectHelper.isEmpty(value);
  }

  /**
   * @protected
   * @param {String} value
   * @return {String}
   */
  normalizePhone(value) {
    return FormatHelper.normalizePhone(value);
  }

  /**
   * @public
   * @param {any} value
   * @param {String} code
   * @throws {ValidationException}
   */
  checkRequired(value, code = '') {
    this.checkUndefined(value, code);
    if (!value) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
    if (this.isObject(value) && this.isEmptyObject(value)) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
    if (this.isArray(value) && value.length <= 0) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
  }

  /**
   * @public
   * @param {String} value
   * @param {String} code
   * @throws {ValidationException}
   */
  checkEmail(value, code = '') {
    if (!value) {
      return;
    }
    if (!EmailRegex.test(value)) {
      throw new ValidationException(t('core.services.invalidEmailErrorMessage', { code: code }));
    }
  }

  /**
   * @public
   * @param {String} value
   * @param {String} code
   * @throws {ValidationException}
   */
  checkPhone(value, code = '') {
    if (!value) {
      return;
    }
    if (!PhoneRegex.test(this.normalizePhone(value))) {
      throw new ValidationException(t('core.services.invalidEmailErrorMessage', { code: code }));
    }
  }

  checkInstanceOf(value, className, code) {
    if (!value || !className) {
      return;
    }
    if (!ObjectHelper.isCompatibleWithClass(value, className)) {
      throw new ValidationException(
        t('core.services.invalidClassInstance', {
          code: code,
          className: className,
        }),
      );
    }
  }
}
