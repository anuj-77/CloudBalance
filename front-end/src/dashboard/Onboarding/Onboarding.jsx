import React, { useState } from 'react';
import '../../components/styles/Onboarding.css';
import AddCustomerManagedPolicies from './AddCustomerMaanagedPolicies/AddCustomerManagedPolicies';
import IAMRoleStep from './IAMRoleStep/IAMRoleStep';
import SubmitPage from './SubmitPage/SubmitPage';
import { addAccount } from '../../axios/api/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  accountId: '',
  accountName: '',
  roleArn: ''
};

function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const isStep1Valid =
    formData.accountId.trim() !== '' &&
    formData.accountName.trim() !== '' &&
    formData.roleArn.trim() !== '';

  const nextStep = () => {
    if (step === 1 && !isStep1Valid) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const cancel = () => {
    setStep(1);
    setFormData(initialFormData);
    console.log('Onboarding cancelled');
  };

  const handleSubmit = async () => {
    console.log('Submitting formData:', formData);
    try {
      const payload = {
        accountNumber: formData.accountId,
        accountName: formData.accountName,
        roleArn: formData.roleArn
      };

      const response = await addAccount(payload); // response = response.data

      // ✅ If `id` is returned, assume success
      if (response?.id) {
        toast.success('Form data submitted successfully');
        setFormData(initialFormData);
        setStep(1);
        // ✅ Redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard/Onboarding/success');
        }, 1000); 
        // 1 second delay to show toast
      } else {
        toast.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error(error.message || 'Network error');
    }
  };



  return (
    <div className="onboarding-container">
      {step === 1 && (
        <IAMRoleStep formData={formData} setFormData={setFormData} />
      )}
      {step === 2 && <AddCustomerManagedPolicies />}
      {step === 3 && <SubmitPage />}

      <div className="onboarding-controls">
        <button onClick={cancel} className="cancel-button">
          Cancel
        </button>

        <div>
          {step > 1 && (
            <button onClick={prevStep} className="back-button">
              {step === 2 && 'Back - Create an IAM Role'}
              {step === 3 && 'Back - Add Customer Managed Policies'}
            </button>
          )}

          {step < 3 && (
            <button
              onClick={nextStep}
              className={`next-button ${step === 1 && !isStep1Valid ? 'disabled' : ''}`}
              disabled={step === 1 && !isStep1Valid}
            >
              {step === 1 && 'Next - Add Customer Managed Policies'}
              {step === 2 && 'Next - Create Cost & Usage Report'}
            </button>
          )}

          {step === 3 && (
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
