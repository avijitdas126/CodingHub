import React, { useState, useEffect } from 'react';

const Popup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('blur1');
    } else {
      document.body.classList.remove('blur');
    }
    return () => {
      document.body.classList.remove('blur');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Popup Title</h2>
        <p className="mb-4">This is a popup content.</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsPopupOpen(true)}
      >
        Open Popup
      </button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default App;
