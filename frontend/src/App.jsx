import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SecondTest from './SecondTest';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Home />} />
        <Route path="/secondtest" element={<SecondTest />} />
    </Routes>
    </Router>
  );
}

export default App;
