import React, { useState } from 'react';
import ClaimButton from './components/ClaimButton';
import ClaimModal from './components/ClaimModal';
import ExistingClaimList from './components/ExistingClaimList';
import ClaimHistory from './components/ClaimHistory';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [viewMode, setViewMode] = useState('initial'); // 'initial', 'newClaim', 'existingClaims'
  
  // Sample data - replace with your actual data structure
  const [existingClaims, setExistingClaims] = useState([
    {
      id: 1,
      date: '2024-10-01',
      status: 'In Progress',
      history: [
        {
          date: '2024-10-01',
          claimForm: { name: 'claim-form-v1.pdf' },
          firReport: { name: 'fir-report-v1.pdf' },
          orderDetails: { name: 'order-details-v1.pdf' }
        }
      ]
    },
    {
      id: 2,
      date: '2024-10-05',
      status: 'Under Review',
      history: [
        {
          date: '2024-10-05',
          claimForm: { name: 'claim-form-v1.pdf' },
          firReport: { name: 'fir-report-v1.pdf' },
          orderDetails: { name: 'order-details-v1.pdf' }
        }
      ]
    }
  ]);

  const handleNewClaim = () => {
    setViewMode('newClaim');
    setModalType('new');
    setIsModalOpen(true);
  };

  const handleExistingClaim = () => {
    setViewMode('existingClaims');
  };

  const handleSelectClaim = (claimId) => {
    setSelectedClaimId(claimId);
    setModalType('existing');
    setIsModalOpen(true);
  };

  const handleViewPrevious = (claimId) => {
    setSelectedClaimId(claimId);
    setIsHistoryModalOpen(true);
  };

  const handleClaimSubmit = (files) => {
    if (modalType === 'new') {
      // Handle new claim submission
      const newClaim = {
        id: existingClaims.length + 1,
        date: new Date().toISOString().split('T')[0],
        status: 'New',
        history: [
          {
            date: new Date().toISOString().split('T')[0],
            ...files
          }
        ]
      };
      setExistingClaims([...existingClaims, newClaim]);
      setViewMode('initial');
    } else {
      // Handle existing claim update
      const updatedClaims = existingClaims.map(claim => {
        if (claim.id === selectedClaimId) {
          return {
            ...claim,
            history: [
              {
                date: new Date().toISOString().split('T')[0],
                ...files
              },
              ...claim.history
            ]
          };
        }
        return claim;
      });
      setExistingClaims(updatedClaims);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Only reset viewMode if we're in newClaim mode
    if (modalType === 'new') {
      setViewMode('initial');
    }
  };

  const getSelectedClaimHistory = () => {
    const claim = existingClaims.find(c => c.id === selectedClaimId);
    return claim ? claim.history : [];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Insurance Claim Management
        </h1>

        {viewMode === 'initial' && (
          <div className="flex space-x-4">
            <ClaimButton 
              text="New Claim" 
              onClick={handleNewClaim}
            />
            <ClaimButton 
              text="Existing Claims" 
              onClick={handleExistingClaim}
            />
          </div>
        )}

        {viewMode === 'existingClaims' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Existing Claims</h2>
              <button
                onClick={() => setViewMode('initial')}
                className="rounded-lg border border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-50"
              >
                Back to Home
              </button>
            </div>
            <ExistingClaimList
              claims={existingClaims}
              onSelectClaim={handleSelectClaim}
              onViewPrevious={handleViewPrevious}
            />
          </div>
        )}

        <ClaimModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleClaimSubmit}
          type={modalType}
          selectedClaimId={selectedClaimId}
        />

        {isHistoryModalOpen && (
          <ClaimHistory
            history={getSelectedClaimHistory()}
            onClose={() => setIsHistoryModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;