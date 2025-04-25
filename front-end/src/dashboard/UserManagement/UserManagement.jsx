import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../axios/api/authService';
import { userTableColumns } from './userTableConfig';
import { formatRole } from '../../roleUtils/roleUtils';
import Modal from '../../components/modal/Modal';
import CreateUser from './CreateUser/CreateUser';
import EditUser from './EditUser/EditUser';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/styles/UserManagement.css';

function UserManagement() {
  const role = useSelector((state) => state.user.role);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openEditModal = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUserId(null);
    setEditModalOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
        {role === 'ADMIN' && (
          <div className="header-row">
            <button className="add-user-btn" onClick={openModal}>+ Add New User</button>
          </div>
        )}


        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateUser onClose={closeModal} refreshUsers={fetchUsers} />
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
          {selectedUserId && (
            <EditUser userId={selectedUserId} onClose={closeEditModal} />
          )}
        </Modal>

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
                        : 'Yet to Login'
                      : col.key === 'role'
                        ? formatRole(user.role)
                        : user[col.key]}
                  </td>
                ))}
                <td>
                  {role === 'ADMIN' && (
                    <button className="edit-btn" onClick={() => openEditModal(user.id)}>
                      ✏️
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </div>
  );
}

export default UserManagement;