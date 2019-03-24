import React, {Component} from 'react';

class StreetNames extends Component {
    makeList() {
        return this.props.nameList.map((streetName, index) => {
            return(
                <li key={index}>{streetName}</li>
            );
        });
    }

    render() {
        return(
            <div>
                <h2>Nearby places with police stop and searches:</h2>
                <ul>
                    {this.makeList()}
                </ul>
            </div>
        );
    }
}

export default StreetNames;