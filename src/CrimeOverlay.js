import React, {Component} from 'react';

class CrimeOverlay extends Component {
    forMap(crime, overlayStyle) {
        return(
            <div className="softShadow" style={overlayStyle}>
                <p>{crime ? crime.age_range ? "Age: " + crime.age_range : "No age information" : ""}</p>
                <p>{crime ? crime.gender || "No gender information" : ""}</p>
                <p>{crime ? crime.object_of_search || "No defined object of search" : ""}</p>
                <p>{crime ? crime.self_defined_ethnicity || "No self-defined ethnicity" : ""}</p>
                <p>{crime ? crime.outcome || "No specified outcome" : ""}</p>
                <p>{crime ? crime.location.street.name || "No location" : ""}</p>
            </div>
        );
    }

    forGraph(crime, overlayStyle) {
        let sortedBy = this.props.sortedBy.replace(/_/g, " ");
        sortedBy = sortedBy.split("");
        sortedBy[0] = sortedBy[0].toUpperCase();
        sortedBy = sortedBy.join("");
        return(
            <div className="softShadow" style={overlayStyle}>
                <p>{sortedBy+ ": " + crime}</p>
                <p>Incidents: {this.props.incidents}</p>
            </div>
        );
    }

    render() {
        const overlayStyle = {
            position: "fixed",
            width: 300,
            padding: 20,
            borderRadius: 10,
            background: "#BCDBF1",
            zIndex: 100,
            top: this.props.mouseY,
            left: this.props.mouseX,
            opacity: 0.9,
            pointerEvents: "none",
            display: this.props.crime ? "block" : "none"
        };
        const crime = this.props.crime;
        return (
            <div>
                {this.props.forMap ? this.forMap(crime, overlayStyle) : this.forGraph(crime, overlayStyle)}
            </div>
        );
    }
}

export default CrimeOverlay;