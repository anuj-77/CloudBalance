const formConfig = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      validation: {
        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        errorMessage: 'Invalid email format',
      },
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        minLength: 6,
        errorMessage: 'Password must be at least 6 characters',
      },
    },
  ];
  
  export default formConfig;
  