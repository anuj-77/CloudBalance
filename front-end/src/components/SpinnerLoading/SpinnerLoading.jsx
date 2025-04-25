import React from 'react';
import '../../components/styles/SpinnerLoading.css';

const SpinnerLoading = () => (
  <div className="spinner-container">
    <svg className="svg-spinner" viewBox="0 0 50 50">
      <circle className="spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  </div>
);

export default SpinnerLoading;