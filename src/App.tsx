import { useState } from 'react';
import './App.css';
import SearchLayout from './layouts/SearchLayout';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <SearchLayout>
      <SearchBar />
    </SearchLayout>
  );
}

export default App;
