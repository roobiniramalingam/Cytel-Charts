import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ScatterChart } from 'recharts'
const TABLE_LIST = [
  { name: "Tamil", pv: 2400, amt: 2400 },
  { name: "English", pv: 1398, amt: 2210 },
  { name: "Hindi", pv: 9800, amt: 2290 },
  { name: "Malayalam", pv: 3908, amt: 2000 },
  { name: "Telugu ", pv: 4800, amt: 2181 },
  { name: "Kannada", pv: 3800, amt: 2500 }
];
const TABLE_LIST_1 = [
  { x: 10, y: 180 },
  { x: 20, y: 200 },
  { x: 50, y: 380 },
  { x: 70, y: 50 },
  { x: 90, y: 200 },
  { x: 210, y: 50 }
];
const TABLE_LIST_2 = [
  { x: 10, y: 600 },
  { x: 50, y: 1000 },
  { x: 60, y: 800 },
  { x: 65, y: 450 },
  { x: 80, y: 350 },
  { x: 90, y: 450 },
  { x: 110, y: 615 },
  { x: 140, y: 300 },
  { x: 240, y: 400 },
  { x: 320, y: 200 }
];

class ReChartsBarChart extends Component {
  state = {
    list: [...TABLE_LIST],
    list1: [...TABLE_LIST_1],
    list2: [...TABLE_LIST_2]
  };

  render() {
    const { list, list1, list2 } = this.state;

    return (
      <div className="container" style={{ marginTop: '80px' }}>
        <label style={{ fontSize: '30px', fontWeight: 'bold' }} > Recharts(React)</label> <br /> <br />
        <label style={{ fontSize: '20px', fontWeight: 'bold' }} > Recharts BarChart</label> <br /> <br />
        <BarChart
          width={600}
          height={300}
          data={list}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>

        <label style={{ fontSize: '20px', fontWeight: 'bold' }} > Recharts ScatterChart</label> <br /> <br />

        <ScatterChart
          width={600}
          height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey={"x"} name="stature" unit="cm" />
          <YAxis type="number" dataKey={"y"} name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter
            name="Median"
            data={list1}
            fill="#8884d8"
            line
            shape="circle"
          />
          <Scatter name="Hypo" data={list2} fill="red" line shape="circle" />
        </ScatterChart>
      </div>
    );
  }
}


export default ReChartsBarChart