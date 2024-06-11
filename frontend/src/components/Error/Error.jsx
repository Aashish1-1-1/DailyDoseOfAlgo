import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white mb-4">404 Error: Page Not Found</h1>
            <p className="text-white text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-white underline">Go back to home</Link>
        </div>
    );
};

export default Error;