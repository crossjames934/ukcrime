import React, { Component } from 'react';
import './App.css';

class Info extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     };
    // }

    render() {
        let infoCards = this.props.data.map((datum, index) => {
            return(
                <div key={index} className="infoCard softShadow">
                    <p>{datum.age_range || "No age information"}</p>
                    <p>{datum.gender || "No gender information"}</p>
                    <p>{datum.object_of_search || "No defined object of search"}</p>
                    <p>{datum.self_defined_ethnicity || "No self-defined ethnicity"}</p>
                    <p>{datum.outcome || "No specified outcome"}</p>
                    <p>{datum.location.street.name || "No location"}</p>
                </div>
            );
        });
        return(
            <div className="infoCardContainer">
                {infoCards}
            </div>
        );
    }
}

export default Info;