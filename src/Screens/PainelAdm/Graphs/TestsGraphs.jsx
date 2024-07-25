import React from 'react';
import { CssBaseline } from '@mui/material';
import ChartComponent from '../../../Components/Graph/ChartComponent';

const App = () => {
  return (
    <>
      <div style={{
        overflowX: 'auto',
      }}>
        <CssBaseline />
        <ChartComponent />
      </div>
    </>
  );
};

export default App;
