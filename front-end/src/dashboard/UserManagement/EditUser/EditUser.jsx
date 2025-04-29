import React, { useState, useEffect } from 'react';
import { updateUser, getUserById } from '../../../axios/api/authService';
import AccountSelector from '../../../components/AccountSelector/AccountSelector';
import '../../../components/styles/EditUser.css';
import { toast } from 'react-toastify';

function EditUser({ userId, onClose }) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {

      try {
        const user = await getUserById(userId);
        setFormData({
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          role: user?.role || '',
        });

        setSelectedAccounts(user?.accounts || []);

      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data.');

      } finally {
        setLoading(false);

      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      accounts: formData.role === 'CUSTOMER' ? selectedAccounts : [],
    };

    try {
      await updateUser(userId, payload);
      toast.success('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="user-form-container">Loading...</div>;
  }

  console.log("formData", formData);
  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="modal-header">
          <h2>Edit User</h2>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="READ_ONLY">Read-Only</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
        </div>

        {formData.role === 'CUSTOMER' && (
          <AccountSelector
            selectedAccounts={selectedAccounts}
            setSelectedAccounts={setSelectedAccounts}
          />
        )}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update User'}
        </button>


      </form>
    </div>
  );
}

export default EditUser;
