// routes.js
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import UserManagement from './dashboard/UserManagement/UserManagement';
import CreateUser from './dashboard/UserManagement/CreateUser/CreateUser';
import EditUser from './dashboard/UserManagement/EditUser/EditUser';
import AWSService from './dashboard/AwsSerrvices/AWSService';
import Onboarding from './dashboard/Onboarding/Onboarding';
import SubmitSuccessPage from './dashboard/Onboarding/SubmitSuccess/SubmitSuccessPage';
import CostExplorer from './dashboard/CostExplorer/CostExplorer';
import ProtectedRoute from './Auth/protectedRoutes';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        path: 'UserManagement',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY']} />,
        children: [
          {
            path: '',
            element: <UserManagement />,
          },
          {
            path: 'CreateUser',
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [
              {
                path: '',
                element: <CreateUser />,
              },
            ],
          },
          {
            path: 'EditUser/:id',
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [
              {
                path: '',
                element: <EditUser />,
              },
            ],
          },
        ],
      },
      {
        path: 'AwsService',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY', 'CUSTOMER']} />,
        children: [
          {
            path: '',
            element: <AWSService />,
          },
        ],
      },
      {
        path: 'Onboarding',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY']} />,
        children: [
          {
            path: '',
            element: <Onboarding />,
          },
          {
            path: 'success',
            element: <SubmitSuccessPage />,
          },
        ],
      },
      {
        path: 'CostExplorer',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY', 'CUSTOMER']} />,
        children: [
          {
            path: '',
            element: <CostExplorer />,
          },
        ],
      },
    ],
  },
];

export default routes;
