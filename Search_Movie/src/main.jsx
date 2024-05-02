import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MovieCard } from './Movie'
import { Bar } from './navbar/nav'

const root = ReactDOM.createRoot(document.getElementById('root'))

const MainApp = () => {
  const [ searchTerm, setSearchTerm ] = useState('');

  return (
    <React.Fragment>
      <Bar setSearchTerm={ setSearchTerm } />
      <MovieCard searchTerm={ searchTerm } />
    </React.Fragment>
  )
}

root.render(<MainApp />);