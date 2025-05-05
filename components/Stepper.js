import React from 'react';

const Stepper = ({ step }) => {
  const steps = [
    'Verify Phone',
    'Personal Info',
    'Password Setup',
    'Dashboard',
  ];

  return (
    <ol className="flex items-center justify-center mb-8 w-full max-w-3xl text-sm font-medium text-gray-500">
      {steps.map((label, index) => {
        const current = index + 1 === step;
        const completed = index + 1 < step;
        const upcoming = index + 1 > step;

        const circleStyle = completed
          ? 'bg-yellow-400 text-white'
          : current
          ? 'bg-green-600 text-white'
          : 'bg-white border-2 border-gray-300 text-gray-500';

        const textStyle = current
          ? 'text-green-700 font-bold'
          : completed
          ? 'text-yellow-600 font-semibold'
          : 'text-gray-400';

        return (
          <li key={index} className={`flex items-center w-full ${textStyle}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${circleStyle}`}>
              {index + 1}
            </span>
            {label}
            {index !== steps.length - 1 && (
              <div className={`flex-auto border-t-2 mx-2 ${completed ? 'border-yellow-400' : current ? 'border-green-600' : 'border-gray-300'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
