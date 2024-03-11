import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import TestComponent from './TestComponent'; // This will be our component that fetches from Flask
import SecondTest from './SecondTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestComponent />} />
        <Route path="/secondtest" element={<SecondTest />} />
    </Routes>
    </Router>
  );
}

export default App;
