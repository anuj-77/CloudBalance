export const formatRole = (role) => {
    const roleMap = {
      ADMIN: 'Admin',
      READ_ONLY: 'Read-Only',
      CUSTOMER: 'Customer',
    };
  
    return roleMap[role] || role;
  };
  