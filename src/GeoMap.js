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
        this.previousMapView = this.props.mapView;
        this.state = {
            highlightedCrime: null,
            mouseX: 0,
            mouseY: 0,
            markers: [],
        };
        mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jvc3NqYW1lczkzNCIsImEiOiJjanRsYTBoaGkwYmVnM3lwZnRqcm1raGkwIn0.n6wWS702HkBqpsQ79d-QgA';
    }

    createMap = () => {
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
        this.placeMarkers();
    };

    placeMarkers = () => {
        this.markers.forEach(m => {
            m.remove();
        });
        this.markers = [];
        let previousMarkersContainers = document.getElementsByClassName('markerContainer');
        while (previousMarkersContainers[0]) {
            previousMarkersContainers[0].parentNode.removeChild(previousMarkersContainers[0]);
        }
        this.props.data.forEach(crime => {
            const el = document.createElement('div');
            const img = document.createElement('img');
            switch(crime.object_of_search) {
                case "Controlled drugs":
                case "Psychoactive substances":
                    img.src = drugIcon;
                    break;
                case "Offensive weapons":
                case "Firearms":
                case "Anything to threaten or harm anyone":
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
            const m = new mapboxgl.Marker(el)
                .setLngLat({lng: crime.location.longitude, lat: crime.location.latitude})
                .addTo(this.map);

            this.markers.push(m);
        });
    };

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
        if (this.previousMapView !== this.props.mapView) {
            this.createMap();
            this.previousMapView = this.props.mapView;
        }
    }

    render() {
        return (
            <div style={{display: this.props.mapView ? "block" : "none"}}>
                <CrimeOverlay mouseX={this.state.mouseX} mouseY={this.state.mouseY} crime={this.state.highlightedCrime}/>
                <div ref={el => this.mapContainer = el} className="dataDisplay"/>
            </div>
        );
    }
}

export default GeoMap;