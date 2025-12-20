export default {
  groups: [
    {
      title: 'MockField',
      code: 'mock-fields',
      items: [
        {
          code: 'name',
          title: 'Name',
          type: 'text',
          placeholder: 'Enter name',
          required: true,
        },
        {
          code: 'email',
          title: 'Email',
          type: 'email',
          placeholder: 'Enter email',
          required: true,
        },
        {
          code: 'phone',
          title: 'Phone',
          type: 'tel',
          placeholder: 'Enter Phone',
          required: true,
        },
        {
          code: 'items',
          title: 'Items',
          type: 'select',
          items: [
            {
              id: 1,
              name: 'Item 1',
              code: 'item_1',
            },
            {
              id: 2,
              name: 'Item 2',
              code: 'item_2',
            },
            {
              id: 3,
              name: 'Item 3',
              code: 'item_3',
            },
          ],
          placeholder: 'Select items',
          required: true,
        },
        {
          code: 'file',
          title: 'File',
          type: 'file',
          placeholder: 'Download file',
          required: true,
        },
      ],
    },
  ],
};
