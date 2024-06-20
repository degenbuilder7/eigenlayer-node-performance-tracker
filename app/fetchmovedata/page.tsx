"use client"
import React, { useState } from 'react';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: " Track" },
    { text: " data with" },
    { text: "MovementLabs", className: "text-purple-500 dark:text-purple-500" }
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
    </div>
  );
};

// This component fetches live move data from the mainnet ,
// Endpoint: https://aptos.dev/en/build/apis/fullnode-rest-api-reference#tag/accounts/get/accounts/{address}

const Move = () => {
  const [address, setAddress] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async (endpoint: any) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error fetching data');
        setData(null);
        return;
      }
      const data = await response.json();
      setData(data);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Error fetching data');
      setData(null);
    }
  };

  const handleFetchAccountData = () => {
    fetchData(`https://api.mainnet.aptoslabs.com/v1/accounts/${address}`);
  };

  const handleFetchResources = () => {
    fetchData(`https://api.mainnet.aptoslabs.com/v1/accounts/${address}/resources`);
  };

  const handleFetchModules = () => {
    fetchData(`https://api.mainnet.aptoslabs.com/v1/accounts/${address}/modules`);
  };

  const handleFetchResourceByType = () => {
    fetchData(`https://api.mainnet.aptoslabs.com/v1/accounts/${address}/resource/${resourceType}`);
  };

  const handleFetchModuleByName = () => {
    fetchData(`https://api.mainnet.aptoslabs.com/v1/accounts/${address}/module/${moduleName}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 py-10"><TypewriterEffectSmoothDemo /></h1>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 mt-[-20px] rounded bg-white border-blue-600 border-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
        />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleFetchAccountData}
            className="px-4 py-2 text-xl bg-black gradient-border rounded border border-white text-purple-500 font-medium"
          >
            Fetch Account Data
          </button>
          <button
            onClick={handleFetchResources}
            className="px-4 py-2 text-xl bg-black gradient-border rounded border border-white text-purple-500 font-medium"
          >
            Fetch Resources
          </button>
          <button
            onClick={handleFetchModules}
            className="px-4 py-2 text-xl bg-black gradient-border rounded border border-white text-purple-500 font-medium"
          >
            Fetch Modules
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Enter resource type"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          className="p-2 mt-[20px] rounded bg-white border-blue-600 border-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
        />
        <button
          onClick={handleFetchResourceByType}
          className="px-4 py-2 text-xl bg-black mt-4 gradient-border rounded border border-white text-purple-500 font-medium"
        >
          Fetch Resource By Type
        </button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Enter module name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="p-2 mt-[20px] rounded bg-white border-blue-600 border-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
        />
        <button
          onClick={handleFetchModuleByName}
          className="px-4 py-2 text-xl bg-black mt-4 gradient-border rounded border border-white text-purple-500 font-medium"
        >
          Fetch Module By Name
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {data && (
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-lg w-full max-w-5xl gradient-border mb-10 overflow-x-auto">
          <pre className="whitespace-pre-wrap break-words text-white">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Move;
