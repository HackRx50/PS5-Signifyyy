import React from 'react';

const ClaimHistory = ({ history, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Claim History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {history.map((entry, index) => (
            <div 
              key={index}
              className="mb-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="mb-2 flex justify-between">
                <span className="font-medium">Submission Date: {entry.date}</span>
                <span className="text-blue-700">Version {history.length - index}</span>
              </div>
              <div className="space-y-2">
                <p>Claim Form: {entry.claimForm.name}</p>
                <p>FIR Report: {entry.firReport.name}</p>
                <p>Order Details: {entry.orderDetails.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimHistory;