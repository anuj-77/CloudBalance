// import React from 'react';
// import '../../../components/styles/UserDetails.css';

// const roleDisplayMap = {
//   ADMIN: 'Admin',
//   READ_ONLY: 'Read-Only',
//   CUSTOMER: 'Customer',
// };

// function UserDetails({ user }) {
//     console.log(user)
//   if (!user) return null;

//   return (
//     <div className="user-details-container">
//       <h3>User Information</h3>
//       <div className="user-details-grid">
//         <div className="user-details-label">First Name:</div>
//         <div className="user-details-value">{user.firstName}</div>

//         <div className="user-details-label">Last Name:</div>
//         <div className="user-details-value">{user.lastName}</div>

//         <div className="user-details-label">Email:</div>
//         <div className="user-details-value">{user.email}</div>

//         <div className="user-details-label">Role:</div>
//         <div className="user-details-value">{roleDisplayMap[user.role] || user.role}</div>

//         <div className="user-details-label">Accounts:</div>
//         <div className="user-details-value">
//           {user.accounts && user.accounts.length > 0
//             ? user.accounts.join(', ')
//             : 'None'}
            
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDetails;
