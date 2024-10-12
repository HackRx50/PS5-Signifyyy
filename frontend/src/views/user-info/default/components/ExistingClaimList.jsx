import React from 'react';

const ExistingClaimList = ({ claims, onSelectClaim, onViewPrevious }) => {
  return (
    <div className="mt-6 space-y-4">
      {claims.map((claim, index) => (
        <div 
          key={index}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Claim #{claim.id}</h3>
              <p className="text-sm text-gray-600">Date: {claim.date}</p>
              <p className="text-sm text-gray-600">Status: {claim.status}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onViewPrevious(claim.id)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View Previous
              </button>
              <button
                onClick={() => onSelectClaim(claim.id)}
                className="rounded-lg border bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Add Documents
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExistingClaimList;