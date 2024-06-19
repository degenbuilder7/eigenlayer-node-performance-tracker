
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
      {
          text: " Enter",
      },
     
      {
          text: "AVS",
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

// fetch the AVS stats utiling the Dune API
const AVS = () => {
  const [avsAddress, setAvsAddress] = useState('');
  const [avsData, setAvsData] = useState(null);
  const [error, setError] = useState('');
  const chartRef = useRef(null);

  const fetchAvsData = (address) => {
    const options = {
      method: 'GET',
      headers: {
        'X-DUNE-API-KEY': process.env.NEXT_PUBLIC_APP_DUNE_API_KEY!
      }
    };

    fetch('https://api.dune.com/api/v1/eigenlayer/avs-stats', options)
      .then(response => response.json())
      .then(data => {
        const result = data.result.rows.find(row => row.avs_contract_address === address);
        if (result) {
          setAvsData(result);
          setError('');
        } else {
          setAvsData(null);
          setError('AVS contract address not found.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching data.');
      });
  };

  const handleInputChange = (e) => {
    setAvsAddress(e.target.value);
  };

  const handleFetchData = () => {
    fetchAvsData(avsAddress);
  };

  const getChartData = () => {
    if (!avsData) return {};

    const labels = Object.keys(avsData).filter(key => key.includes('_TVL') && avsData[key] > 0);
    const data = labels.map(key => avsData[key]);

    return {
      labels,
      datasets: [{
        label: 'TVL',
        data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [avsData]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
    <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold mb-6 py-[30px]">
    <TypewriterEffectSmoothDemo/>
    </h1>
    <button className="absolute top-[120px] right-[30px] border border-2 border-white text-xl text-purple-500 px-4 py-2 rounded-lg font-medium gradient-border">
      <a href="/avs1">AVS metadata</a>
    </button>
  </div>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Enter AVS contract address"
          value={avsAddress}
          onChange={handleInputChange}
     className="rounded-none relative block w-[350px] h-[50px] px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm border-blue-500 border-4"
        />
        <button
          onClick={handleFetchData}
          className="px-6 py-3 text-xl w-[350px]  bg-black gradient-border rounded border border-white text-purple-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 mt-[20px]">
          Fetch AVS Data
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {avsData && (
        <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded shadow-lg w-full max-w-2xl gradient-border mb-[50px] ">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">AVS Data</h2>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(avsData, null, 2)}</pre>
          </div>
          <div className="w-full md:w-1/2 ml-[30px]">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">TVL Distribution</h2>
            <Doughnut ref={chartRef} data={getChartData()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AVS;
