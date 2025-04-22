import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../axios/api/authService';
import '../../components/styles/UserManagement.css';
import { userTableColumns } from './userTableConfig';
import { useNavigate } from 'react-router-dom';
import { formatRole } from '../../roleUtils/roleUtils';
import Modal from '../../components/modal/Modal';
import CreateUser from './CreateUser/CreateUser';

function UserManagement() {
  const role = useSelector((state) => state.user.role);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;


  // Modal thing
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/dashboard/UserManagement/CreateUser');
  };

  const handleEditUser = (userId) => {
    navigate(`/dashboard/UserManagement/EditUser/${userId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    })();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentUsers = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="user-management-container">
      <h1 className="onboarding-title">User Management</h1>
      <p className="onboarding-subtitle">Manage your application's users below.</p>

      <div className="onboarding-box">

        {/* <div className="header-row">
          {role === 'ADMIN' && (
            <button className="add-user-btn" onClick={handleAddUser}>
              + Add New User
            </button>
          )}
        </div> */}

        {/* Modal */}
        
        <div className="header-row">

          <button className="add-user-btn" onClick={openModal}>+ Add New User</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <CreateUser onClose={closeModal} />
          </Modal>

        </div>

        <table className="user-table">
          <thead>
            <tr>
              {userTableColumns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx}>
                {userTableColumns.map((col, i) => (
                  <td key={i}>
                    {col.key === 'lastLogin'
                      ? user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : 'Non-Logged in User'
                      : col.key === 'role'
                        ? formatRole(user.role)
                        : user[col.key]}
                  </td>
                ))}
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user.id)}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
