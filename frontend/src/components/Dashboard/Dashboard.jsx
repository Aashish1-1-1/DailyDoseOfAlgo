import React, { useState } from 'react';

// Sample algorithm data
const algorithms = [
  {
    id: 1,
    title: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.',
    difficulty: 'Easy',
    language: 'JavaScript',
    code: `function bubbleSort(arr) {
  const n = arr.length;
  
  // Traverse through the array
  for (let i = 0; i < n - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Traverse the array from 0 to n-i-1
      // Swap if the element is greater than the next element
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
`
  },
  {
    id: 2,
    title: 'Binary Search',
    description: 'An efficient algorithm for finding an item from a sorted list of items.',
    difficulty: 'Medium',
    language: 'Go',
    code: `func binarySearch(arr []int, target int) int {
  // Set the initial low and high pointers
  low := 0
  high := len(arr) - 1

  // Perform the binary search
  for low <= high {
    // Calculate the middle index
    mid := low + (high-low)/2

    // Check if the middle element is the target
    if arr[mid] == target {
      return mid
    }
    // If the target is greater, update the low pointer
    else if arr[mid] < target {
      low = mid + 1
    }
    // If the target is smaller, update the high pointer
    else {
      high = mid - 1
    }
  }

  // If the target is not found, return -1
  return -1
}
`
  },
  // Add more algorithms here
];

const DashboardComponent = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 py-6 px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-2xl">Daily Dose of Algo</div>
          <nav>
            {/* Navigation links */}
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {/* Algorithm Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {algorithms.map((algorithm) => (
            <div
              key={algorithm.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleAlgorithmClick(algorithm)}
            >
              <div className="p-4">
                <div className="text-gray-800 font-bold text-lg mb-2">{algorithm.title}</div>
                <p className="text-gray-700">{algorithm.description}</p>
              </div>
              <div className="px-4 py-2 bg-gray-100">
                <div className="text-gray-600">Difficulty: {algorithm.difficulty}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Algorithm Details */}
        {selectedAlgorithm && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedAlgorithm.title}</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <pre className="bg-gray-900 text-white rounded-lg p-4 overflow-auto">
                <code>{selectedAlgorithm.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Progress Tracking */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Progress</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Progress visualizations */}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quizzes</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Quiz section content */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardComponent;