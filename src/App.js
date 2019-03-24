import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GeoMap from './GeoMap';
import Controls from './Controls';
import StreetNames from './StreetNames';
import Info from './Info';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // latitude: "51.507351",
            // longitude: "-0.127758",
            latitude: "51.5073",
            longitude: "-0.1277",
            date: "2019-01",
            streetNames: [],
            zoom: "17",
        };
        this.getData();
        this.updateCoordinates = this.updateCoordinates.bind(this);
    }

    getData() {
        let crimeAPI = `https://data.police.uk/api/stops-street?lat=${this.state.latitude}&lng=${this.state.longitude}&date=${this.state.date}`;
        axios
            .get(crimeAPI)
            .then(res => {
                const streetNames = res.data.map(crime => crime.location.street.name);
                const filteredNames = streetNames.filter((streetName, pos) => streetNames.indexOf(streetName) === pos);
                this.setState({
                    data: res.data,
                    streetNames: filteredNames
                });
                // console.log(res.data);
                // console.log(this.state);
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateCoordinates(lat, lon, zoom = Number(this.state.zoom)) {
        this.setState({
            latitude: lat.toFixed(4),
            longitude: lon.toFixed(4),
            zoom: zoom.toFixed(2)
        }, this.getData);
    }

    render() {
        return(
            <div className="myApp">
                <GeoMap latitude={this.state.latitude} longitude={this.state.longitude} zoom={this.state.zoom} updateCoordinates={this.updateCoordinates}/>
                <Controls updateCoordinates={this.updateCoordinates}/>
                <StreetNames nameList={this.state.streetNames}/>
                <Info data={this.state.data}/>
            </div>
        );
    }
}

export default App;
