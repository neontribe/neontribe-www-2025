import { useState } from 'react';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Clicked ${count + 1} times!`);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-lg font-bold mb-2 text-blue-800">Interactive React Component</h3>
      <p className="text-blue-600 mb-4">This is a React component running inside Astro!</p>
      
      <button 
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Click me! ({count})
      </button>
      
      {message && (
        <p className="text-blue-600 mt-2 text-sm">{message}</p>
      )}
    </div>
  );
}
