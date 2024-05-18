import React, { useState } from 'react';

const AccordionItem = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <h2 id={`accordion-open-heading-${category}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-400 border border-gray-700 focus:ring-4 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700 ${
            isOpen ? 'bg-gray-700' : ''
          }`}
          onClick={toggleAccordion}
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {category}
          </span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-open-body-${category}`}
        className={`${isOpen ? 'block' : 'hidden'}`}
        aria-labelledby={`accordion-open-heading-${category}`}
      >
        <div className="p-5 border border-t-0 border-gray-700 bg-gray-900">
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex items-center p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-400">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;