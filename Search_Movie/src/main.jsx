import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.scss';
import { MovieCardComponent } from './Movie';
import { Contact } from './Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MainApp = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<MovieCardComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
};

root.render(<MainApp />);