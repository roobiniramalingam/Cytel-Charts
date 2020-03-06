import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from "d3";

const chartTypes = [
    { label: "Bar Chart", value: 1 },
    { label: "Pie Chart", value: 2 },
];
const yearValues = [
    { label: "2017-2018", value: 1 },
    { label: "2018-2019", value: 2 },
    { label: "2019-2020", value: 3 },
];
var chartType;
var selYear;
var dataValues;
var piedataValues;
dataValues = [5, 12, 18, 25, 8, 20];
class ChartTypeApp extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount() {
        this.loadBarChart(dataValues);
    }
    state = {
        selectedChartType: null,
        selectedYear: null
    };
    handleChange = selectedChartType => {
        this.setState({ selectedChartType });
        chartType = selectedChartType.value;
        this.validation(chartType, selYear);
    };
    yearChange = selectedYear => {
        this.setState({ selectedYear });
        selYear = selectedYear.value;
        this.validation(chartType, selYear);
    };

    validation(chartType, selYear) {
        if ((chartType != undefined) && selYear != undefined) {
            if (chartType == "1") {
                if (selYear == "1") {
                    dataValues = [2, 16, 9, 15, 20, 5];
                }
                if (selYear == "2") {
                    dataValues = [8, 10, 2, 5, 8, 12];
                }
                if (selYear == "3") {
                    dataValues = [14, 24, 9, 25, 17, 2];
                }
                this.loadBarChart(dataValues);
            }
            if (chartType == "2") {

                if (selYear == "1") {
                    piedataValues = [{ name: 'Tamil', value: 20 }, { name: 'English', value: 10 }, { name: 'Malayalam', value: 50 },
                    { name: 'Telugu', value: 30 }, { name: 'Hindi', value: 5 }];
                }
                if (selYear == "2") {
                    piedataValues = [{ name: 'Tamil', value: 50 }, { name: 'English', value: 20 }, { name: 'Malayalam', value: 60 },
                    { name: 'Telugu', value: 5 }, { name: 'Hindi', value: 35 }];
                }
                if (selYear == "3") {
                    piedataValues = [{ name: 'Tamil', value: 80 }, { name: 'English', value: 10 }, { name: 'Malayalam', value: 30 },
                    { name: 'Telugu', value: 62 }, { name: 'Hindi', value: 41 }];
                }
                this.loadPieChart(piedataValues);
            }
        }

    }
    loadBarChart(dataValues) {
        d3.select("#amazingViz").remove();
        document.getElementById('dvPieChart').innerHTML = "";
        const w = 500;
        const h = 350;
        const data = dataValues;
        const svg = d3.select("body")
            .append("svg")
            .attr("id", "amazingViz")
            .attr("width", w)
            .attr("height", h)
            .style("margin-Left", '66px')
            .style("margin-top", '-1070px')
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 50)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - (10 * d) - 3)
        svg.selectAll("circle").transition()
            .duration(750)
            .delay(function (d, i) { return i * 10; })
            .attr("r", function (d) { return Math.sqrt(d * 100); });

    }
    loadPieChart(pieData) {
        d3.select("#amazingViz").remove();
        document.getElementById('dvPieChart').innerHTML = "";
        const data = pieData;
        const size = 50;
        const fourth = size / 4;
        const half = size / 2;
        const labelOffset = fourth * 1.4;
        const total = data.reduce((acc, cur) => acc + cur.value, 0);
        const container = d3.select('#dvPieChart');

        const chart = container.append('svg')
            .style('width', '50%')
            .attr('viewBox', `0 0 ${size} ${size}`);

        const plotArea = chart.append('g')
            .attr('transform', `translate(${half}, ${half})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.schemeCategory10);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        const arcs = pie(data);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(fourth);

        const arcLabel = d3.arc()
            .innerRadius(labelOffset)
            .outerRadius(labelOffset);

        plotArea.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('fill', d => color(d.data.name))
            .attr('stroke', 'white')
            .attr('d', arc);

        const labels = plotArea.selectAll('text')
            .data(arcs)
            .enter()
            .append('text')
            .style('text-anchor', 'middle')
            .style('alignment-baseline', 'middle')
            .style('font-size', '1px')
            .attr('transform', d => `translate(${arcLabel.centroid(d)})`)

        labels.append('tspan')
            .attr('y', '-0.6em')
            .attr('x', 0)
            .style('font-weight', 'bold')
            .text(d => `${d.data.name}`);

        labels.append('tspan')
            .attr('y', '0.6em')
            .attr('x', 0)
            .text(d => `${d.data.value} (${Math.round(d.data.value / total * 100)}%)`);

    }

    render() {

        const { selectedChartType } = this.state;
        const { selectedYear } = this.state;
        return (

            <div className="container">
                <label style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '79px', marginLeft: '224px' }} >D3 Charts (React)</label>
                <div className="row" style={{ marginTop: '55px' }}>
                    <div className="col-3"> Select Chart Type </div>
                    <div className="col-3">
                        <Select value={selectedChartType} onChange={this.handleChange} options={chartTypes} />
                    </div>
                </div>
                <div className="row" style={{ marginTop: '55px' }}>
                    <div className="col-3"> Select Year </div>
                    <div className="col-3">
                        <Select value={selectedYear} onChange={this.yearChange} options={yearValues} />
                    </div>
                </div>
                <div className="row" >
                    <div id="dvPieChart" style={{ width: '1009px' }} ></div>
                </div>
            </div >



        )
    }
}

export default ChartTypeApp