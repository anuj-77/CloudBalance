import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../../axios/api/authService';
import AccountSelector from '../../../components/AccountSelector/AccountSelector';
import '../../../components/styles/EditUser.css';
import { toast } from 'react-toastify';
import UserDetails from './UserDetails';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize formData as null to indicate loading state
  const [formData, setFormData] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);
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
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      accounts: formData.role === 'CUSTOMER' ? selectedAccounts : [],
    };

    try {
      await updateUser(id, payload);
      toast.success('User updated successfully!');
      navigate('/dashboard/UserManagement');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-form-container">
      
      <form onSubmit={handleSubmit} className="user-form">
        <h2>Edit User</h2>
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

        {/* Show AccountSelector only for CUSTOMER role */}
        {formData.role === 'CUSTOMER' && (
          <AccountSelector
            selectedAccounts={selectedAccounts}
            setSelectedAccounts={setSelectedAccounts}
          />
        )}

        <button type="submit" className="submit-btn">
          Update User
        </button>
      </form>
    </div>
  );
}

export default EditUser;
