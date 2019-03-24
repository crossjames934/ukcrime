import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jvc3NqYW1lczkzNCIsImEiOiJjanRsYTBoaGkwYmVnM3lwZnRqcm1raGkwIn0.n6wWS702HkBqpsQ79d-QgA';

class GeoMap extends Component {
    constructor(props) {
        super(props);
        this.previousLat = this.props.latitude;
        this.previousLon = this.props.longitude;
    }

    createMap() {
        const {latitude, longitude, zoom} = this.props;
        this.mapContainer.innerHTML = "";
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [longitude, latitude],
            zoom
        });
        map.on('move', () => {
            const {lng, lat} = map.getCenter();
            this.props.updateCoordinates(lat, lng, map.getZoom());
        });
        this.update = () => {
            this.previousLat = this.props.latitude;
            this.previousLon = this.props.longitude;
            map.setCenter({lng: this.props.longitude, lat: this.props.latitude});
        };
    }

    componentDidMount() {
        this.createMap();
    }

    componentDidUpdate() {
        if (this.props.latitude !== this.previousLat || this.props.longitude !== this.previousLon) {
            this.update();
        }
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="geoMap"/>
            </div>
        );
    }
}

export default GeoMap;