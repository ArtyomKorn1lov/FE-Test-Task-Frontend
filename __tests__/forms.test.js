/**
 * @fileOverview
 * @description Unit-тесты для модуля `form`
 */

import { mocks_field_data, result_mock_fields_data, result_mock_form_data, result_mock_rules_data } from '../__mocks__/forms';
import Translations from '@/translations';
import { ArgumentException } from '@/core';
import { EmailRegex, PhoneRegex, FieldsValidateException, FormFieldsBuilder } from '@/modules/forms';

const t = Translations.global.t;

/**
 * @description Для validator убираем идентичное сравнение ф-ций, нам не важно знать что за функция, нам важно знать наличие ключа
 * @param {Object} received
 * @param {Object} expected
 * @return {Object}
 */
const replaceRulesValidatorFunction = (received, expected) => {
  for (let key in received) {
    received[key] = received[key].map((rule, index) => {
      if (rule['validator']) {
        rule['validator'] = expected[key][index]['validator'] ?? null;
      }
      return rule;
    });
  }
  return received;
};

describe('forms', () => {
  let formBuilder;

  test('should null check to ArgumentException', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder(null);
    }).toThrow(ArgumentException);
  });

  test('should null check to ArgumentException message', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder(null);
    }).toThrow(t('form.builder.errors.empty'));
  });

  test('should empty object check to FieldsValidateException', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        test: '',
      });
    }).toThrow(FieldsValidateException);
  });

  test('should empty object check to FieldsValidateException message', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        test: '',
      });
    }).toThrow(t('form.builder.errors.structure'));
  });

  test('should empty groups check to FieldsValidateException', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        groups: [{}],
      });
    }).toThrow(FieldsValidateException);
  });

  test('should empty groups check to FieldsValidateException message', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        groups: [{}],
      });
    }).toThrow(t('form.builder.errors.structure'));
  });

  test('should invalid field check to FieldsValidateException', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        groups: [
          {
            items: [
              {
                code: 'test',
                required: false,
              },
            ],
          },
        ],
      });
    }).toThrow(FieldsValidateException);
  });

  test('should invalid field check to FieldsValidateException message', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder({
        groups: [
          {
            items: [
              {
                type: 'www',
              },
            ],
          },
        ],
      });
    }).toThrow(t('form.builder.errors.structure'));
  });

  test('should success form build', () => {
    expect(() => {
      formBuilder = new FormFieldsBuilder(mocks_field_data, {
        email: EmailRegex,
        phone: PhoneRegex,
      });
    }).not.toThrow();
  });

  test('should check fields', () => {
    expect(formBuilder.getFields).toEqual(result_mock_fields_data);
  });

  test('should check formData', () => {
    expect(formBuilder.getFormData).toEqual(result_mock_form_data);
  });

  test('should check rules', () => {
    const rules = replaceRulesValidatorFunction(formBuilder.getRules, result_mock_rules_data);
    expect(rules).toEqual(result_mock_rules_data);
  });
});
