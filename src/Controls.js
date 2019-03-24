import React, {Component} from 'react';
import axios from 'axios';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postcode: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getLatitudeAndLongitude() {
        const postcodeAPI = "http://api.postcodes.io/postcodes/";
        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
        if (postcodeRegex.test(this.state.postcode)) {
            axios
                .get(postcodeAPI + this.state.postcode.split(" ").join(""))
                .then(res => {
                    this.props.updateCoordinates(res.data.result.latitude, res.data.result.longitude);
                })
                .catch(err => {
                    // console.log(err)
                });
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value}, this.getLatitudeAndLongitude);
    }

    render() {
        const postcodeInput = "postcodeInput";
        return(
            <div className="controls softShadow">
                <form>
                    <label htmlFor={postcodeInput}>Post Code: </label>
                    <input onChange={this.handleChange} value={this.state.postcode} className="formInput" type="text" name="postcode" id={postcodeInput}/>
                    {/*<input type="text" className="formInput" name=""/>*/}
                </form>
            </div>
        );
    }
}

export default Controls;