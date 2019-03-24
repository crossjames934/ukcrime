import React, {Component} from 'react';

class CrimeOverlay extends Component {
    render() {
        const overlayStyle = {
            position: "fixed",
            width: 300,
            padding: 20,
            borderRadius: 10,
            background: "#ACCBE1",
            zIndex: 100,
            top: this.props.mouseY,
            left: this.props.mouseX,
            pointerEvents: "none",
            display: this.props.crime ? "block" : "none"
        };
        const crime = this.props.crime;
        return (
            <div className="softShadow" style={overlayStyle}>
                <p>{crime ? crime.age_range || "No age information" : ""}</p>
                <p>{crime ? crime.gender || "No gender information" : ""}</p>
                <p>{crime ? crime.object_of_search || "No defined object of search" : ""}</p>
                <p>{crime ? crime.self_defined_ethnicity || "No self-defined ethnicity" : ""}</p>
                <p>{crime ? crime.outcome || "No specified outcome" : ""}</p>
                <p>{crime ? crime.location.street.name || "No location" : ""}</p>
            </div>
        );
    }
}

export default CrimeOverlay;