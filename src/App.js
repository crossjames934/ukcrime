import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import GeoMap from './GeoMap';
import Graphs from './Graphs';
import Controls from './Controls';
// import StreetNames from './StreetNames';
// import Info from './Info';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            latitude: "51.5073",
            longitude: "-0.1277",
            date: "2018-12",
            streetNames: [],
            zoom: "15",
            loading: false,
            postcode: "WC2N 5DU",
            mapView: true // False if showing graphs instead
        };
        this.updateCoordinates = this.updateCoordinates.bind(this);
        this.updatePostcode = this.updatePostcode.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.getPostcode = this.getPostcode.bind(this);
        this.switchView = this.switchView.bind(this);
        // Whether mouse is pressed or not becomes global variable for use in other components
        window.mouseIsDown = false;
        document.addEventListener('mousedown', () => {
            window.mouseIsDown = true;
        });
        document.addEventListener('mouseup', () => {
            window.mouseIsDown = false;
        });
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let crimeAPI = `https://data.police.uk/api/stops-street?lat=${this.state.latitude}&lng=${this.state.longitude}&date=${this.state.date}`;
        this.setState({loading: true});
        axios
            .get(crimeAPI)
            .then(res => {
                const streetNames = res.data.map(crime => crime.location.street.name);
                const filteredNames = streetNames.filter((streetName, pos) => streetNames.indexOf(streetName) === pos);
                this.setState({
                    data: res.data,
                    streetNames: filteredNames,
                    loading: false
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

    getLatitudeAndLongitude() {
        const postcodeAPI = "http://api.postcodes.io/postcodes/";
        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
        if (postcodeRegex.test(this.state.postcode)) {
            axios
                .get(postcodeAPI + this.state.postcode.split(" ").join(""))
                .then(res => {
                    this.updateCoordinates(res.data.result.latitude, res.data.result.longitude);
                })
                .catch(err => {
                    // console.log(err)
                });
        }
    }

    getPostcode(lat, lon) {
        const latLonToPostcodeAPI = `http://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`;
        axios
            .get(latLonToPostcodeAPI)
            .then(res => {
                this.setState({postcode: res.data.result[0].postcode});
            })
            .catch(err => {
                // console.log(err)
            });
    }

    updatePostcode(event) {
        this.setState({postcode: event.target.value}, this.getLatitudeAndLongitude);
    }

    changeDate(date) {
        this.setState({
            date: date
        }, this.getData);
    }

    switchView(map) {
        this.setState({mapView: map});
    }

    render() {
        return(
            <div className="myApp">
                <header>
                    <GeoMap
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        zoom={this.state.zoom}
                        updateCoordinates={this.updateCoordinates}
                        getPostcode={this.getPostcode}
                        data={this.state.data}
                        date={this.state.date}
                        mapView={this.state.mapView}
                    />
                    <Graphs
                        mapView={this.state.mapView}
                        data={this.state.data}
                    />
                    <Controls
                        postcode={this.state.postcode}
                        updatePostcode={this.updatePostcode}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        loading={this.state.loading}
                        recordCount={this.state.data.length}
                        changeDate={this.changeDate}
                        date={this.state.date}
                        updateCoordinates={this.updateCoordinates}
                        switchView={this.switchView}
                    />
                </header>
            </div>
        );
    }
}

export default App;
