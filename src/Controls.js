import React, {Component} from 'react';
// import axios from 'axios';
import MapIcon from './mapIcon.svg';
import ChartIcon from './chartIcon.svg';

class Controls extends Component {
    render() {
        const postcodeInput = "postcodeInput";
        const dateInput = "dateInput";
        const gap = {margin: "0 20px"};
        const icon = {width: 40, height: 40};
        return(
            <div className="controls softShadow">
                <form className="controlForm" onSubmit={e => e.preventDefault()}>
                    <label htmlFor={postcodeInput}>Post Code: &nbsp;</label>
                    <input onChange={e => this.props.updatePostcode(e)} value={this.props.postcode} className="formInput" type="text" name="postcode" id={postcodeInput}/>
                    <div style={gap}/>
                    <label htmlFor={dateInput}>Date: &nbsp;</label>
                    <input onChange={e => this.props.changeDate(e.target.value)} value={this.props.date} type="month" max="2019-01" className="formInput" name="date" id={dateInput}/>
                    <div style={gap}/>
                    <p>{this.props.loading ? "Loading..." : "Records: " + this.props.recordCount}</p>
                    <div style={gap}/>
                    <img onClick={() => this.props.switchView(true)} src={MapIcon} style={icon} alt="Map Icon"/>
                    <div style={gap}/>
                    <img onClick={() => this.props.switchView(false)} src={ChartIcon} style={icon} alt="Chart Icon"/>
                </form>
            </div>
        );
    }
}

export default Controls;