import React from 'react';

const ClaimList = ({ claims }) => {
  if (claims.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Submitted Claims</h2>
      <div className="space-y-4">
        {claims.map((claim, index) => (
          <div 
            key={index}
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
          >
            <h3 className="font-medium">Claim #{index + 1}</h3>
            <div className="mt-2 space-y-1">
              <p>Claim Form: {claim.claimForm.name}</p>
              <p>FIR Report: {claim.firReport.name}</p>
              <p>Order Details: {claim.orderDetails.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimList;
