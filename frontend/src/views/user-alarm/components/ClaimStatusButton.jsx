import React from 'react';

const ClaimStatusButton = ({ status }) => {
  const getStatusColors = (status) => {
    switch (status.toLowerCase()) {
      case 'legit':
        return 'bg-green-500 hover:bg-green-600';
      case 'suspicious':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'fraud':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusMessage = (status) => {
    switch (status.toLowerCase()) {
      case 'legit':
        return 'This claim appears to be legitimate';
      case 'suspicious':
        return 'This claim requires additional verification';
      case 'fraud':
        return 'This claim has been flagged as potentially fraudulent';
      default:
        return 'Status unknown';
    }
  };

  return (
    <div className="p-4">
      <div className={`${getStatusColors(status)} text-white rounded-lg shadow-lg transition-colors duration-200 p-4`}>
        <div className="text-lg font-bold mb-2">
          Claim Status: {status.toUpperCase()}
        </div>
        <p className="mt-2">{getStatusMessage(status)}</p>
      </div>
    </div>
  );
};

export default ClaimStatusButton;