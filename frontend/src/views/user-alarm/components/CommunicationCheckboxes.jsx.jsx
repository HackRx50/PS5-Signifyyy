import React, { useState, useEffect } from 'react';

const CommunicationCheckboxes = ({ onUpdate, initialState = {} }) => {
  const [communications, setCommunications] = useState({
    email: false,
    call: false,
    whatsapp: false,
    text: false,
    ...initialState
  });

  useEffect(() => {
    if (initialState) {
      setCommunications(prev => ({
        ...prev,
        ...initialState
      }));
    }
  }, [initialState]);

  const handleChange = (channel) => {
    const updatedComms = {
      ...communications,
      [channel]: !communications[channel]
    };
    setCommunications(updatedComms);
    onUpdate?.(updatedComms);
  };

  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Communication History</h3>
      <div className="space-y-3">
        {Object.entries(communications).map(([channel, checked]) => (
          <label key={channel} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(channel)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 capitalize">
              {channel === 'whatsapp' ? 'WhatsApp' : channel}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CommunicationCheckboxes;