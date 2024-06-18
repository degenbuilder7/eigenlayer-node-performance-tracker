"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';


import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
      {
          text: " Enter",
      },
     
      {
          text: "Operator",
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

function Operator() {
  const [operatorAddress, setOperatorAddress] = useState('');
  const [operatorData, setOperatorData] = useState(null);
  const [error, setError] = useState('');
  const chartRef = useRef(null);

  const fetchOperatorData = (address) => {
    const options = {
      method: 'GET',
      headers: {
        'X-DUNE-API-KEY': process.env.NEXT_PUBLIC_APP_DUNE_API_KEY!
      }
    };

    fetch('https://api.dune.com/api/v1/eigenlayer/operator-stats', options)
      .then(response => response.json())
      .then(data => {
        const result = data.result.rows.find(row => row.operator_contract_address === address);
        if (result) {
          setOperatorData(result);
          setError('');
        } else {
          setOperatorData(null);
          setError('Operator contract address not found.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error fetching data.');
      });
  };

  const handleInputChange = (e) => {
    setOperatorAddress(e.target.value);
  };

  const handleFetchData = () => {
    fetchOperatorData(operatorAddress);
  };

  const getChartData = () => {
    if (!operatorData) return {};

    const labels = Object.keys(operatorData).filter(key => key.includes('_TVL') && operatorData[key] > 0);
    const data = labels.map(key => operatorData[key]);

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
  }, [operatorData]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
    <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold mb-6 py-[30px]"><TypewriterEffectSmoothDemo/></h1>
    <button className="absolute top-[120px] right-[30px] border border-2 border-white text-xl text-purple-500 px-4 py-2 rounded-lg font-medium gradient-border">
      <a href="/operatormetadata">Operator metadata</a>
    </button>
  </div>
  
      <div className="flex flex-col items-center mb-6 space-y-4">
        <input
          type="text"
          placeholder="Enter operator contract address"
          value={operatorAddress}
          onChange={handleInputChange}
     className="rounded-none relative block w-[350px] h-[50px] px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm border-blue-500 border-4"
        />
        <button
          onClick={handleFetchData}
          className="px-6 py-3 text-xl w-[350px]  bg-black gradient-border rounded border border-white text-purple-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Fetch Operator Data
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {operatorData && (
        <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded shadow-lg w-full max-w-3xl gradient-border mb-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">Operator Data</h2>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(operatorData, null, 2)}</pre>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0 ml-0 md:ml-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">TVL Distribution</h2>
            <Doughnut ref={chartRef} data={getChartData()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Operator;
