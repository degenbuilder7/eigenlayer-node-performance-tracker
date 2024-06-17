import React from 'react';
import data from '@/lib/data.json';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: " All" },
    { text: "Puffer", className: "text-green-500 dark:text-green-500" },
    { text: " data available" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
    </div>
  );
};


const PufferData = () => {
  return (
    <div className='bg-black min-h-screen'>
    <div className='relative'>
    <h1 className='text-center text-xl font-bold text-white py-[20px]'>
     <TypewriterEffectSmoothDemo/>
    </h1>
    <button className='gradient-border absolute right-[20px] top-[20px] rounded-lg border border-white px-[10px] py-[4px] text-xl
     font-medium text-purple-500'>
     <a href='/operator'>  Get data</a>
    </button>
  </div>
  
      <table className="min-w-full bg-black mt-[40px] border-2 gradient-border">
        <thead>
          <tr>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Puffer Module</th>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Puffer Module Address</th>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Restaking Operator Address</th>
          </tr>
        </thead>
        <tbody>
          {data.modules.map((module, index) => (
            <tr key={index} className="text-white">
              <td className="border border-white px-4 py-2 text-green-400">{module.PufferModule}</td>
              <td className="border border-white px-4 py-2">{module.PufferModuleAddress}</td>
              <td className="border border-white px-4 py-2">{module.RestakingOperatorAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PufferData;