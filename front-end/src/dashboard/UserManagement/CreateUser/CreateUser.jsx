import React, { useState } from 'react';
import { createUserFormConfig } from './createUserFormConfig';
import '../../../components/styles/CreateUser.css';
import { createUser } from '../../../axios/api/authService';
import { toast } from 'react-toastify';
import AccountSelector from '../../../components/AccountSelector/AccountSelector';

function CreateUser({ onClose }) {
  const initialFormState = createUserFormConfig.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormState);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPayload = {
      ...formData,
      accounts: formData.role === 'CUSTOMER' ? selectedAccounts : [],
    };

    try {
      const response = await createUser(finalPayload);
      console.log('User created:', response);
      toast.success('User created successfully!');
      onClose(); // Close the modal upon successful creation
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error('Failed to create user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Create User</h2>
      <div className="form-grid">
        {createUserFormConfig.map((field) => (
          <div
            className={`form-group ${
              field.type === 'select' ? 'full-width' : ''
            }`}
            key={field.name}
          >
            <label>{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      {formData.role === 'CUSTOMER' && (
        <AccountSelector
          selectedAccounts={selectedAccounts}
          setSelectedAccounts={setSelectedAccounts}
        />
      )}

      <button type="submit" className="submit-btn">
        Create User
      </button>
    </form>
  );
}

export default CreateUser;