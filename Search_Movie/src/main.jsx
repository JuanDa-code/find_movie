import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import { MovieCardComponent } from './Movie';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MainApp = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <React.Fragment>
        <MovieCardComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </React.Fragment>
    </Router>
  );
};

root.render(<MainApp />);