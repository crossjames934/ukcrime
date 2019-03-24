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
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [longitude, latitude],
            zoom
        });
        this.map.on('move', () => {
            const {lng, lat} = this.map.getCenter();
            this.props.getPostcode(lat, lng);
            this.props.updateCoordinates(lat, lng, this.map.getZoom());
        });
        const el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
            .setLngLat({lng: this.props.longitude, lat: this.props.latitude})
            .addTo(this.map);
        console.log(this.map);
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