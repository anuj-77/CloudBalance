import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CopyableCodeContainer from "../../../components/CopyableCodeContainer.jsx/CopyableCodeContainer";
import iAmRoleFormConfig from "./iAmRoleFormConfig";
import img1 from '../../../assets/img-1.png';
import '../../../components/styles/IAMRoleStep.css';

const IAMRoleStep = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

  return (
    <div className="onboarding-container">
      <h1 className="onboarding-title">Create an IAM Role</h1>
      <p className="onboarding-subtitle">Create an IAM Role by following these stages</p>

      <div className="onboarding-box">
        <div className="onboarding-step">
        <span className="step-number">1</span>
          <p>Log into AWS account & Create an IAM Role</p>
        </div>

        <div className="onboarding-step">
        <span className="step-number">2</span>
          <p>In <em>Trusted section</em>, choose <strong>Custom trust policy</strong>. Replace the prefilled policy with the one below:</p>
        </div>

        <CopyableCodeContainer text={iAmRoleFormConfig.text1} />

        <div className="onboarding-step">
        <span className="step-number">3</span>
          <p>Click <strong>Next</strong> to go to the <em>Add permissions</em> page. No permissions are needed at this step. Click <strong>Next</strong> again.</p>
        </div>

        <div className="onboarding-step">
        <span className="step-number">4</span>
          <p>In the <em>Role name</em> field, enter the following role name, and click <strong>Create Role</strong>:</p>
        </div>

        <CopyableCodeContainer text="CK-Tuner-Role-dev2" />

        <div className="onboarding-step">
        <span className="step-number">5</span>
          <p>Go to the newly created IAM Role and copy the <strong>Role ARN</strong>.</p>
        </div>

        <img src={img1} alt="IAM Role Instructions" className="onboarding-image" />

        <div className="onboarding-step">
        <span className="step-number">6</span> 
          <label className="onboarding-label-1">Enter the IAM Role Details:</label>

          
        </div>
        <div className="input-block-1" >
          
            <input
              type="text"
              name="accountId"
              placeholder="Account ID"
              value={formData.accountNumber}
              onChange={handleChange}
              className="onboarding-input-box"
              required
            />
            <input
              type="text"
              name="accountName"
              placeholder="Account Name"
              value={formData.accountName}
              onChange={handleChange}
              className="onboarding-input-box"
              required
            />
            <input
              type="text"
              name="roleArn"
              placeholder="ARN Number - arn:aws:iam::123456789012:role"
              value={formData.roleArn}
              onChange={handleChange}
              className="onboarding-input-box"
              required
            />
          </div>
      </div>
    </div>
  );
};

export default IAMRoleStep;