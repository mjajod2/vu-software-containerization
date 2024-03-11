import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('eghewhg')
    fetch('http://localhost:5000/test')
      .then(response => response.text())  // Convert the response to text
      .then(text => setMessage(text))     // Update state with the text
      .catch(error => console.log(error)); // Log errors, if any
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <p>Message from Flask: {message}</p>
    </div>
  );
};

export default TestComponent;
