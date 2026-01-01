import Translations from '@/translations';

const t = Translations.global.t;

export default {
  name: [
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
  ],
  email: [
    {
      validator: () => {},
      trigger: 'change',
    },
    {
      validator: () => {},
      trigger: 'blur',
    },
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
  ],
  phone: [
    {
      validator: () => {},
      trigger: 'change',
    },
    {
      validator: () => {},
      trigger: 'blur',
    },
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
  ],
  items: [
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
  ],
  file: [
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
  ],
};
