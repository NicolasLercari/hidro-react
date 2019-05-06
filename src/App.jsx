import React from 'react';
import './App.scss';
import Formula from './components/Formula.jsx';
import AppBar from './components/DenseAppBar.jsx';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Formula />
    </div>
  );
}

export default App;
