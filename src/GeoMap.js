import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

import CrimeOverlay from './CrimeOverlay';

import drugIcon from './drugs.svg';
import firearmIcon from './firearm.svg';
import stolenIcon from './stolenGoods.svg';
import bobbyIcon from './bobbyPin.svg';
import evidenceIcon from './footprints.svg';

class GeoMap extends Component {
    constructor(props) {
        super(props);
        this.previousLat = this.props.latitude;
        this.previousLon = this.props.longitude;
        this.markers = [];
        this.previousDataLength = this.props.data.length;
        this.state = {
            highlightedCrime: null,
            mouseX: 0,
            mouseY: 0
        };
        mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jvc3NqYW1lczkzNCIsImEiOiJjanRsYTBoaGkwYmVnM3lwZnRqcm1raGkwIn0.n6wWS702HkBqpsQ79d-QgA';
    }

    createMap() {
        const {latitude, longitude, zoom} = this.props;
        this.mapContainer.innerHTML = "";
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [longitude, latitude],
            zoom
        });
        this.map.on('move', () => {
            setTimeout(() => {
                if (!window.mouseIsDown) {
                    const {lng, lat} = this.map.getCenter();
                    this.props.updateCoordinates(lat, lng, this.map.getZoom());
                    this.props.getPostcode(lat, lng);
                    this.placeMarkers();
                }
            }, 100);
        });
        this.map.on('zoom', () => {
           this.placeMarkers();
        });
    }

    placeMarkers() {
        this.markers = [];
        // let previousMarkers = document.getElementsByClassName('marker');
        // while (previousMarkers[0]) {
        //     previousMarkers[0].parentNode.removeChild(previousMarkers[0]);
        // }
        let previousMarkersContainers = document.getElementsByClassName('markerContainer');
        while (previousMarkersContainers[0]) {
            previousMarkersContainers[0].parentNode.removeChild(previousMarkersContainers[0]);
        }
        this.props.data.forEach(crime => {
            const el = document.createElement('div');
            const img = document.createElement('img');
            switch(crime.object_of_search) {
                case "Controlled drugs":
                    img.src = drugIcon;
                    break;
                case "Offensive weapons":
                    img.src = firearmIcon;
                    break;
                case "Stolen goods":
                    img.src = stolenIcon;
                    break;
                case "Article for use in theft":
                    img.src = bobbyIcon;
                    break;
                case "Evidence of offences under the Act":
                    img.src = evidenceIcon;
                    break;
                default:
                    img.src = evidenceIcon;
                    break;
            }
            img.className = 'marker';
            el.appendChild(img);
            el.className = 'markerContainer';
            el.onmouseover = () => {
                const e = window.event;
                this.setState({highlightedCrime: crime, mouseX: e.clientX, mouseY: e.clientY});
            };
            el.onmouseout = () => {
                this.setState({highlightedCrime: null});
            };
            this.markers.push(new mapboxgl.Marker(el)
                .setLngLat({lng: crime.location.longitude, lat: crime.location.latitude})
                .addTo(this.map));
        });
    }

    componentDidMount() {
        this.createMap();
    }

    componentDidUpdate() {
        if (this.props.latitude !== this.previousLat || this.props.longitude !== this.previousLon) {
            this.previousLat = this.props.latitude;
            this.previousLon = this.props.longitude;
            this.map.setCenter({lng: this.props.longitude, lat: this.props.latitude});
        }
        if (this.previousDataLength !== this.props.data.length) {
            this.placeMarkers();
            this.previousDataLength = this.props.data.length;
        }
    }

    render() {
        return (
            <div>
                <CrimeOverlay mouseX={this.state.mouseX} mouseY={this.state.mouseY} crime={this.state.highlightedCrime}/>
                <div ref={el => this.mapContainer = el} className="geoMap"/>
            </div>
        );
    }
}

export default GeoMap;