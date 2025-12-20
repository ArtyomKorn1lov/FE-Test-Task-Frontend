import { mocks_field_data, result_mock_fields_data, result_mock_form_data, result_mock_rules_data } from '../__mocks__/forms';
import { FormFieldsBuilder, EmailRegex, PhoneRegex } from '@/modules/forms';

describe('forms', () => {
  test('should success form build', () => {
    expect(
      new FormFieldsBuilder(mocks_field_data, {
        email: EmailRegex,
        phone: PhoneRegex,
      }),
    ).not.toThrow();
  });

  test('should check fields', () => {
    const formBuilder = new FormFieldsBuilder(mocks_field_data, {
      email: EmailRegex,
      phone: PhoneRegex,
    });
    expect(formBuilder.getFields).toEqual(result_mock_fields_data);
  });

  test('should check formData', () => {
    const formBuilder = new FormFieldsBuilder(mocks_field_data, {
      email: EmailRegex,
      phone: PhoneRegex,
    });
    expect(formBuilder.getFormData).toEqual(result_mock_form_data);
  });

  test('should check rules', () => {
    const formBuilder = new FormFieldsBuilder(mocks_field_data, {
      email: EmailRegex,
      phone: PhoneRegex,
    });
    expect(formBuilder.getRules).toEqual(result_mock_rules_data);
  });
});
