const AccountFormFields = {
  groups: [
    {
      title: 'Fields',
      code: 'account-fields',
      items: [
        {
          code: 'login',
          title: 'Account name',
          type: 'text',
          placeholder: 'Enter account name',
          required: true
        },
        {
          code: 'email',
          title: 'Account email',
          type: 'email',
          placeholder: 'Enter account email',
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
