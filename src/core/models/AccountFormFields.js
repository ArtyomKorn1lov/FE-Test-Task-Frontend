const AccountFormFields = {
  groups: [
    {
      title: 'Fields',
      code: 'accounts-fields',
      items: [
        {
          code: 'login',
          title: 'Account name',
          type: 'text',
          placeholder: 'Enter accounts name',
          required: true
        },
        {
          code: 'email',
          title: 'Account email',
          type: 'email',
          placeholder: 'Enter accounts email',
          required: true
        },
        {
          code: 'role',
          title: 'Permission',
          type: 'select',
          items: [],
          placeholder: 'Select permission',
          required: true
        },
        {
          code: 'picture',
          title: 'Account image',
          type: 'file',
          placeholder: 'Download image',
          required: false
        },
      ]
    }
  ]
};

export default AccountFormFields;
