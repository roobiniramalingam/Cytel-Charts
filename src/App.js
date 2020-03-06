import React from 'react';
import './App.css';
import ChartType from './ChartType';
import Recharts from './ReactChartLibrary';


function App() {
  return (
    <div class="row">
      <div class="col-md-6">
        <div><ChartType /></div>
      </div>
      <div class="col-md-6">
        <div><Recharts /> </div>
      </div>
    </div>
  );
}

export default App;
