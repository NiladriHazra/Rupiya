import React from 'react';

export const Balance = ({ value }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md  mt-10">
      <h2 className="text-fuchsia-50 text-lg font-bold">Balance</h2>
      <p className="text-fuchsia-50 text-xl">Rs {value}</p>
    </div>
  );
};