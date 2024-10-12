import React from 'react';

const ClaimButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border-current rounded-lg border bg-blue-700 px-5 py-2.5 text-sm font-medium tracking-wider text-white outline-none hover:bg-blue-800 active:bg-blue-700"
    >
      {text}
    </button>
  );
};

export default ClaimButton;