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
        //<Route path="/" element={<Home />} />
        <Route path="/" element={<SecondTest />} />
    </Routes>
    </Router>
  );
}

export default App;
