import React, { useState, useEffect } from 'react';
import ClaimStatusButton from './components/ClaimStatusButton';
import CommunicationCheckboxes from './components/CommunicationCheckboxes.jsx';

const ClaimsManagement = () => {
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from backend
  useEffect(() => {
    // This would be your actual API call
    const fetchClaimData = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample response from backend
        const sampleResponse = {
          claimId: "CLM123456",
          status: "suspicious", // could be 'legit', 'suspicious', or 'fraud'
          riskScore: 0.75,
          lastUpdated: new Date().toISOString(),
          communicationHistory: {
            email: true,
            call: false,
            whatsapp: true,
            text: false
          }
        };
        
        setClaimData(sampleResponse);
      } catch (error) {
        console.error("Error fetching claim data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimData();
  }, []);

  const handleCommunicationUpdate = (prefs) => {
    // This would typically make an API call to update preferences
    console.log('Communication preferences updated:', prefs);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading claim data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Claim Details</h1>
          <p className="text-gray-600">Claim ID: {claimData.claimId}</p>
          <p className="text-gray-600">Last Updated: {new Date(claimData.lastUpdated).toLocaleString()}</p>
        </div>

        <div className="space-y-6">
          <ClaimStatusButton status={claimData.status} />
          
          <div className="border-t pt-6">
            <CommunicationCheckboxes 
              onUpdate={handleCommunicationUpdate}
              initialState={claimData.communicationHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsManagement;