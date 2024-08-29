import React from 'react';

export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" class="w-full  text-white bg-cyan-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}