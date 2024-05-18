import React, { useState } from "react";

const Accordion = () => {
  const [openItems, setOpenItems] = useState([0]); // Set the first item open by default

  const toggleAccordion = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div id="accordion-open" data-accordion="open" className="dark">
      <div className="mb-4">
        <h2 id="accordion-open-heading-1">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-400 border border-b-0 border-gray-700 rounded-t-xl focus:ring-4 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700 ${
              openItems.includes(0) ? "bg-gray-700" : ""
            }`}
            onClick={() => toggleAccordion(0)}
          >
            <span className="flex items-center">
              {/* <svg
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
              </svg> */}
              What is Flowbite?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 shrink-0 ${
                openItems.includes(0) ? "rotate-180" : ""
              }`}
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
          id="accordion-open-body-1"
          className={`${openItems.includes(0) ? "block" : "hidden"}`}
          aria-labelledby="accordion-open-heading-1"
        >
          <div className="p-5 border border-b-0 border-gray-700 bg-gray-900">
            <p className="mb-2 text-gray-400">
              Flowbite is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
            </p>
            <p className="text-gray-400">
              Check out this guide to learn how to{" "}
              <a
                href="/docs/getting-started/introduction/"
                className="text-blue-500 hover:underline"
              >
                get started
              </a>{" "}
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </p>
          </div>
        </div>
      </div>

      {/* Repeat the above structure for the remaining accordion items */}
      <div className="mb-4">
        <h2 id="accordion-open-heading-2">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-400 border border-b-0 border-gray-700 focus:ring-4 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700 ${
              openItems.includes(1) ? "bg-gray-700" : ""
            }`}
            onClick={() => toggleAccordion(1)}
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
              Is there a Figma file available?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 shrink-0 ${
                openItems.includes(1) ? "rotate-180" : ""
              }`}
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
          id="accordion-open-body-2"
          className={`${openItems.includes(1) ? "block" : "hidden"}`}
          aria-labelledby="accordion-open-heading-2"
        >
          <div className="p-5 border border-b-0 border-gray-700 bg-gray-900">
            <p className="mb-2 text-gray-400">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-400">
              Check out the{" "}
              <a
                href="https://flowbite.com/figma/"
                className="text-blue-500 hover:underline"
              >
                Figma design system
              </a>{" "}
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 id="accordion-open-heading-3">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-400 border border-gray-700 focus:ring-4 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700 ${
              openItems.includes(2) ? "bg-gray-700" : ""
            }`}
            onClick={() => toggleAccordion(2)}
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
              What are the differences between Flowbite and Tailwind UI?
            </span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 shrink-0 ${
                openItems.includes(2) ? "rotate-180" : ""
              }`}
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
          id="accordion-open-body-3"
          className={`${openItems.includes(2) ? "block" : "hidden"}`}
          aria-labelledby="accordion-open-heading-3"
        >
          <div className="p-5 border border-t-0 border-gray-700 bg-gray-900">
            <p className="mb-2 text-gray-400">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="mb-2 text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="mb-2 text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="ps-5 text-gray-400 list-disc">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-blue-500 hover:underline"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-blue-500 hover:underline"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;