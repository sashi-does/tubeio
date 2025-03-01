import React from 'react';

const Heading = ({ name, subtitle, align = 'left', className = '' }) => {
  // Function to determine the display name based on the `name` prop
  const getDisplayName = () => {
    if (name === 'all') {
      return 'All';
    } else if (name === 'trending') {
      return 'Trending';
    }
    else if (name === 'gaming') {
      return 'Gaming';
    } else {
      return name; // Return the original name if no condition matches
    }
  };

  return (
    <div className={`mb-6 text-${align} ${className}`}>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {getDisplayName()}
      </h1>
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;