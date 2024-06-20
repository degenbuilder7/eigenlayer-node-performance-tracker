"use client";
import React, { useState } from 'react';


import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
      {
          text: " Enter",
      },
     
      {
          text: "AVS or Operator",
          className: "text-purple-500 dark:text-purple-500",
      },
      {
        text: " address",
    },

  ];
  return (
      <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          </div>
      </div>
  );
}

function Mapping() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = () => {
    if (!address.trim()) {
      setError('Please enter an operator or AVS address.');
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_APP_DUNE_API_KEY!;
    const options = {
      method: 'GET',
      headers: {
        'X-DUNE-API-KEY': apiKey
      }
    };

    fetch(`https://api.dune.com/api/v1/eigenlayer/operator-to-avs-mapping?operator_contract_address=${address}&avs_contract_address=${address}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.result && data.result.rows.length > 0) {
          setData(data.result.rows);
          setError('');
        } else {
          setData(null);
          setError('No data found for the given address.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching data.');
      });
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 py-[30px]">
      <TypewriterEffectSmoothDemo/>
      </h1>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter operator or AVS address"
            value={address}
            onChange={handleInputChange}
            className="rounded-none relative block w-[350px] h-[50px] px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm border-blue-500 border-4"
          />
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 text-xl bg-black w-[350px] gradient-border rounded border border-white text-purple-500 font-medium mb-6"
        >
          Fetch Data
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {data && (
        <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-[1200px] overflow-x-auto gradient-border ">
          <h2 className="text-2xl font-semibold mb-4 text-purple-500">Operator and AVS Data</h2>
          <p className='text-white text-md'>scroll right to see all info</p>
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">AVS Contract Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">AVS Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">AVS Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Operator Contract Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Operator Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Operator Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registered Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.avs_contract_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.avs_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                    <a href={item.avs_website} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      {item.avs_website}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.operator_contract_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.operator_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                    <a href={item.operator_website} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                      {item.operator_website}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.registered_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Mapping;
