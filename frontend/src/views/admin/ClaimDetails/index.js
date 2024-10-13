import React, { useState } from "react";

const ClaimStatusPage = () => {
  const claimNumber = "123456789"; // Example claim number
  const status = "suspicious"; // Change this to "legit", "suspicious", or "fraud" to test

  // Function to determine the color of the status text
  const getStatusColor = (status) => {
    switch (status) {
      case "fraud":
        return "text-red-500"; // Red for fraud
      case "legit":
        return "text-green-500"; // Green for legit
      case "suspicious":
        return "text-yellow-500"; // Yellow for suspicious
      default:
        return "text-gray-500"; // Default color
    }
  };

  const parameters = [
    "Applicant Name",
    "Applicant Address",
    "Vehicle Number",
    "Hospital Name",
    "CNR Number",
    "MACP Number",
    "Received On",
    "Registered On",
    "Decided On",
    "Duration",
  ];

  const verdict = "Based on the analysis, this claim shows patterns consistent with fraud.";

  // State for checkboxes
  const [channels, setChannels] = useState({
    mail: false,
    message: false,
    whatsapp: false,
    call: false,
  });

  const [whomToSend, setWhomToSend] = useState({
    insurancePartner: false,
    user: false,
  });

  // Handle checkbox changes
  const handleChannelChange = (e) => {
    const { name, checked } = e.target;
    setChannels((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleWhomToSendChange = (e) => {
    const { name, checked } = e.target;
    setWhomToSend((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process selected options
    const selectedChannels = Object.entries(channels)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    const selectedRecipients = Object.entries(whomToSend)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    console.log("Selected Channels:", selectedChannels);
    console.log("Selected Recipients:", selectedRecipients);

    // Here you can do further processing like sending the selected options to an API
    alert(`Channels: ${selectedChannels.join(", ")}, Recipients: ${selectedRecipients.join(", ")}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Claim Number and Status */}
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-lg mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Claim Number: {claimNumber}</h1>
        <p className={`text-2xl font-semibold ${getStatusColor(status)}`}>
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Left Column: Parameters */}
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Parameters Used:</h2>
          <ul className="list-disc list-inside">
            {parameters.map((param, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {param}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Verdict */}
        <div className="bg-white p-6 rounded shadow-lg flex items-center justify-center">
          <p className="text-lg text-gray-800 font-semibold text-center">{verdict}</p>
        </div>
      </div>

      {/* Alarm System Section */}
      <div className="w-full max-w-6xl bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Alarm System</h2>

        {/* Alarm System Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Channel */}
          <div>
            <h3 className="text-xl font-bold mb-4">Channel:</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="mail"
                  checked={channels.mail}
                  onChange={handleChannelChange}
                  className="mr-2"
                />
                Mail
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="message"
                  checked={channels.message}
                  onChange={handleChannelChange}
                  className="mr-2"
                />
                Message
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="whatsapp"
                  checked={channels.whatsapp}
                  onChange={handleChannelChange}
                  className="mr-2"
                />
                WhatsApp
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="call"
                  checked={channels.call}
                  onChange={handleChannelChange}
                  className="mr-2"
                />
                Call
              </label>
            </div>
          </div>

          {/* Right Column: Whom to Send */}
          <div>
            <h3 className="text-xl font-bold mb-4">Whom to Send:</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="insurancePartner"
                  checked={whomToSend.insurancePartner}
                  onChange={handleWhomToSendChange}
                  className="mr-2"
                />
                Insurance Partner
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="user"
                  checked={whomToSend.user}
                  onChange={handleWhomToSendChange}
                  className="mr-2"
                />
                User
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimStatusPage;
