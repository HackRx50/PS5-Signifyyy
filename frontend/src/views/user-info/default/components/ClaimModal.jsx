// components/ClaimModal.jsx
import React, { useState } from 'react';
import FileUpload from './FileUpload';

const ClaimModal = ({ isOpen, onClose, onSubmit, type, selectedClaimId }) => {
  const [files, setFiles] = useState({
    claimForm: null,
    firReport: null,
    orderDetails: null
  });

  if (!isOpen) return null;

  const handleFileSelect = (file, fileType) => {
    setFiles(prev => ({
      ...prev,
      [fileType.toLowerCase().replace(/\s+/g, '')]: file
    }));
  };

  const handleSubmit = () => {
    // Validate all files are present
    if (!files.claimForm || !files.firReport || !files.orderDetails) {
      alert('Please upload all required documents');
      return;
    }

    onSubmit(files);
    setFiles({
      claimForm: null,
      firReport: null,
      orderDetails: null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {type === 'new' ? 'New Claim' : `Update Claim #${selectedClaimId}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <FileUpload 
          label="Claim Form" 
          onFileSelect={(file) => handleFileSelect(file, 'claimForm')}
        />
        <FileUpload 
          label="FIR Report" 
          onFileSelect={(file) => handleFileSelect(file, 'firReport')}
        />
        <FileUpload 
          label="Order Details" 
          onFileSelect={(file) => handleFileSelect(file, 'orderDetails')}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg border bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;