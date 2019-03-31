import React, {Component} from 'react';
import * as d3 from 'd3';

import CrimeOverlay from './CrimeOverlay';

const chartContainer = "chartContainer";
const mapSize = {
    width: "90vw",
    height: "80vh"
};

class Graphs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: "object_of_search",
            highlightedBar: null,
            mouseX: 0,
            mouseY: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.mouseout = this.mouseout.bind(this);
        this.mouseover = this.mouseover.bind(this);
    }

    mouseover(d, prop) {
        const e = window.event;
        setTimeout(() => {
            this.setState({highlightedBar: prop, incidents: d, mouseX: e.clientX, mouseY: e.clientY});
        }, 150);
    }

    mouseout() {
        setTimeout(() => {
            this.setState({highlightedBar: null});
        }, 150);
    }

    createGraph(data) {
        document.getElementById(chartContainer).innerHTML = "";
        // console.log(data);
        const values = Object.values(data);
        const properties = Object.keys(data);
        properties.splice(properties.indexOf('null'), 1, 'No Information');
        const mapPixelWidth = window.innerWidth * 0.9;
        const mapPixelHeight = window.innerHeight * 0.8;
        const chartPaddingX = mapPixelWidth * 0.1;
        const chartPaddingY = mapPixelHeight * 0.1;
        const chartWidth = mapPixelWidth - chartPaddingX * 2;
        const chartHeight = mapPixelHeight - chartPaddingY * 2;
        const xGap = chartWidth / values.length;
        const barWidth = 25;
        // console.log(properties, values);
        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(properties);
        const yScale = d3.scaleLinear()
            .domain([d3.max(values), 0])
            .range([0, chartHeight])
            .nice();
        const svg = d3
            .select("#"+chartContainer)
            .append("svg")
            .attr("width", mapSize.width)
            .attr("height", mapSize.height)
            .style("background", '#ACCBE1');
            // .style("background", '#7C98B3');
        svg.selectAll("rect")
            .data(values)
            .enter()
            .append("rect")
            .attr('class', 'barForChart')
            .attr("x", (d, i) => i * xGap + xGap / 2 + chartPaddingX - barWidth / 2)
            .attr("y", d => yScale(d) + chartPaddingY)
            .attr("width", barWidth)
            .attr("height", d => chartHeight - yScale(d))
            .attr("fill", "#4f7ca8")
            .on('mouseover', (d, i) => {
                this.mouseover(d, properties[i]);
                // const e = window.event;
                // this.setState({highlightedBar: properties[i], incidents: d, mouseX: e.clientX, mouseY: e.clientY});
                // console.log(d, properties[i], e.clientX, e.clientY);
            })
            .on('mouseout', (d, i) => {
                this.mouseout();
                // console.log('out');
                // this.setState({highlightedBar: null});
            });
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("transform", `translate(${chartPaddingX}, ${chartHeight + chartPaddingY})`)
            .call(xAxis);
        svg.append("g")
            .attr("transform", `translate(${chartPaddingX}, ${chartPaddingY})`)
            .call(yAxis);
        // d3
        //     .select('body')
        //     .append('div')
        //     .style('background', '#ACCBE1')
        //     .style('position', 'fixed')
        //     .style('width', '300px')
        //     .style('height', '400px')
        //     .style('top', '10px')
    }

    componentDidUpdate() {
        this.sortByCategory(this.state.sortedBy);
    }

    sortByCategory() {
        const category = this.state.sortedBy;
        const data = this.props.data;
        const listOfSearchObjects = data.map(datum => datum[category]);
        const uniqueValues = [...new Set(listOfSearchObjects)];
        const jsObjectForGraph = {};
        uniqueValues.forEach(property => {
            jsObjectForGraph[property] = data.filter(datum => datum[category] === property).length;
        });
        this.createGraph(jsObjectForGraph);
    }

    handleSelect(e) {
        this.setState({sortedBy: e.target.value}, this.sortByCategory);
    }

    render() {
        const selectorContainerStyle = {
            position: 'absolute',
            width: 250,
            top: window.innerHeight * 0.025,
            left: window.innerWidth * 0.5 - 80,
            fontSize: 14
        };
        const selectorStyle = {
            height: 30,
            margin: 3
        };
        return (
            <div style={{display: !this.props.mapView ? "block" : "none"}}>
                <CrimeOverlay
                    forMap={false}
                    crime={this.state.highlightedBar}
                    incidents={this.state.incidents}
                    mouseX={this.state.mouseX}
                    mouseY={this.state.mouseY}
                    sortedBy={this.state.sortedBy}
                />
                <div style={selectorContainerStyle}>
                    <label htmlFor="sortBySelector">Sort By: </label>
                    <select style={selectorStyle} id="sortBySelector" onChange={this.handleSelect}>
                        <option value="object_of_search">Object of Search</option>
                        <option value="age_range">Age Range</option>
                        <option value="outcome">Outcome</option>
                    </select>
                </div>
                <div style={mapSize} className="dataDisplay">
                    <div style={mapSize} id={chartContainer}/>
                </div>
            </div>
        );
    }
}

export default Graphs;