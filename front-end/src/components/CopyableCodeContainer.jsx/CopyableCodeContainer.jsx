import React from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import "../styles/CopyableCodeContainer.css";

const CopyableCodeContainer = ({ text, label = "Copied!" }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  return (
    <div className="copyable-code" onClick={handleCopy}>
      <FiCopy className="copy-icon" />
      <div className="code-wrapper">
        <code>{text}</code>
      </div>
    </div>
  );
};

export default CopyableCodeContainer;
