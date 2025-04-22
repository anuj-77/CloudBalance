import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
// import Dashboard from './dashboard/Dashboard';
import Layout from './pages/Layout/Layout';
import UserManagement from './dashboard/UserManagement/UserManagement';
import CreateUser from './dashboard/UserManagement/CreateUser/CreateUser';
import ProtectedRoute from './Auth/protectedRoutes';
import AWSService from './dashboard/AwsSerrvices/AWSService';
import Onboarding from './dashboard/Onboarding/Onboarding';
import CostExplorer from './dashboard/CostExplorer/CostExplorer';
import EditUser from './dashboard/UserManagement/EditUser/EditUser';

import SubmitSuccessPage from './dashboard/Onboarding/SubmitSuccess/SubmitSuccessPage';


function App() {


  return (
    <div id="root">
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Layout />}>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]} />} >
              <Route path="UserManagement" element={<UserManagement />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />} >
              <Route path="UserManagement/CreateUser" element={<CreateUser />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />} >
              <Route path="UserManagement/EditUser/:id" element={<EditUser />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]} />} >
              <Route path="AwsService" element={<AWSService />} />
            </Route>

            {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]} />} >
              <Route path="Onboarding" element={<Onboarding />} />
            </Route> */}
             
             <Route element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]} />} >
                <Route path="Onboarding" element={<Onboarding />} />
                <Route path="Onboarding/success" element={<SubmitSuccessPage />} />
              </Route>
            


            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]} />} >
              <Route path="CostExplorer" element={<CostExplorer />} />
            </Route>




          </Route>

        </Routes>



      </Router>


    </div>
  )
}

export default App;

