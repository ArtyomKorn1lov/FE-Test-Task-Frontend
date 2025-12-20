export default {
  name: [
    {
      required: true,
      message: '',
      trigger: 'change',
    },
    {
      required: true,
      message: '',
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
      message: '',
      trigger: 'change',
    },
    {
      required: true,
      message: '',
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
      message: '',
      trigger: 'change',
    },
    {
      required: true,
      message: '',
      trigger: 'blur',
    },
  ],
  items: [
    {
      required: true,
      message: '',
      trigger: 'change',
    },
    {
      required: true,
      message: '',
      trigger: 'blur',
    },
  ],
  file: [
    {
      required: true,
      message: '',
      trigger: 'change',
    },
    {
      required: true,
      message: '',
      trigger: 'blur',
    },
  ],
};
