import React, {Component} from 'react';
import * as d3 from 'd3';

const chartContainer = "chartContainer";
const data = [12, 5, 6, 6, 9, 10];

class Graphs extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }
    componentDidMount() {
        const svg = d3
            .select(chartContainer)
            .append("svg")
            .attr("width", "inherit")
            .attr("height", "inherit");
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", 0)
            .attr("width", 25)
            .attr("height", (d, i) => d)
            .attr("fill", "green");
    }

    render() {
        if (this.props.mapView) return null;
        return (
            <div className="dataDisplay">
                <div id={chartContainer}/>
            </div>
        );
    }
}

export default Graphs;