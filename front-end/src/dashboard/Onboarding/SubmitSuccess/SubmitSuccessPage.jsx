import React from 'react';
import tick from '../../../assets/green_tick_check.svg';
import '../../../components/styles/SubmitSuccessPage.css'

function SubmitSuccessPage() {
  return (
    <div className="page-container">
      <div className="success-content">
        <img src={tick} alt="Green Tick" />
        <p>Thank You For CUR Access!</p>
        <p>If you have additional accounts to contact, please click Onboard to proceed.</p>
        <div className="blue-box">
          <p>Alternatively, you can login onboarding your accounts on Tuner to receive usage-based recommendations.</p>
          <p><strong>Start Onboarding on Tuner</strong></p>
        </div>
      </div>
    </div>
  );
}

export default SubmitSuccessPage
