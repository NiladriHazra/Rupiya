import React, { useState } from 'react';

export const Balance = ({ value }) => {
  const [hidden, setHidden] = useState(false);

  const toggleBalance = () => {
    setHidden(!hidden);
  };

  return (
    <div className="bg-gray-900 p-3 rounded-lg shadow-md max-w-xs mt-5 text-center relative">
      <h2 className="text-[#f1eeef] text-lg font-semibold mb-2">Balance</h2>
      <p className="text-[#d5d6d6] text-xl font-bold">
        Rs {hidden ? '****' : value}
      </p>
      <button 
        onClick={toggleBalance} 
        className="absolute top-2 right-2 text-[#F72585] bg-transparent border-none cursor-pointer text-sm"
      >
        {hidden ? 'Show' : 'Hide'}
      </button>
    </div>
  );
};
