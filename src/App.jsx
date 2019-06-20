import React from 'react';
import MaterialTable from 'material-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.scss';
import AppBar from './components/DenseAppBar.jsx';
import Formula from './components/Formula';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Formula />
    </div>
  );
}

export default App;