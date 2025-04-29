// createUserFormConfig.js

export const createUserFormConfig = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { value: '', label: 'Select Role' },
      { value: 'ADMIN', label: 'Admin' },
      { value: 'READ_ONLY', label: 'Read-Only' },
      { value: 'CUSTOMER', label: 'Customer' },
    ],
    required: true,
  },
];
