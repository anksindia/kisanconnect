import React from 'react';

const Stepper = ({ step }) => {
  const steps = ['Personal Info', 'Verification', 'Onboarding Dashboard'];

  return (
    <ol className="flex items-center justify-center mb-8 w-full max-w-2xl text-sm font-medium text-gray-500">
      {steps.map((label, index) => (
        <li key={index} className={`flex items-center w-full ${index + 1 === step ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 ${index + 1 <= step ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300'} rounded-full mr-2`}>
            {index + 1}
          </span>
          {label}
          {index !== steps.length - 1 && <div className="flex-auto border-t-2 mx-2 border-gray-300" />}
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
