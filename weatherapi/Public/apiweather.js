class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CityName: "Ha Noi",
            NameSearch: "",
            _Weather: [],
        }
    }
    selectItem = () => {
        this.props._selectItem(this.props._data);
    }
    _onChange = (search) => {
        this.setState({ NameSearch: search.target.value });
    }
    _onKeyPress = (value) => {
        if (value.key === "Enter") {
            this.setState({ CityName: this.state.NameSearch });
            console.log(this.state.CityName);
        }
    }
    componentDidMount() {
        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.CityName + "&key=4ef48f68beb74124acfb3395ad520ca9")
            .then(result => {
                if (result.status == 200) {
                    return result.json()
                }
                else {
                    alert("error :" + result.statusText)
                }
            })
            .then(WeatherObject => {
                this.setState({
                    _Weather: WeatherObject
                })
                console.log(this.state._Weather);
            })
    }
    componentDidUpdate(prevProps, prevSate) {
        if (this.state.CityName !== prevSate.CityName) {
            fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=" + this.state.CityName + "&key=4ef48f68beb74124acfb3395ad520ca9")
                .then(result => {
                    if (result.status == 200) {
                        return result.json()
                    }
                    else {
                        alert(("error: ") + result.statusText)
                    }
                })
                .then(WeatherObject => {
                    this.setState({
                        _Weather: WeatherObject
                    })
                })
        }
    }
    render() {
        if (this.state._Weather.length != 0) {
            var Icon = "https://www.weatherbit.io/static/img/icons/" + this.state._Weather.data[0].weather.icon + ".png";
            var Date = this.state._Weather.data[0].datetime;
            var Temp = this.state._Weather.data[0].temp;
            var Description = this.state._Weather.data[0].weather.description;
            var App = this.state._Weather.data[0].dewpt;
            var Visibility = this.state._Weather.data[0].wind_spd.toFixed(2);
            var Humidity = this.state._Weather.data[0].rh;
            var Wind = this.state._Weather.data[0].vis;
            var Pres = this.state._Weather.data[0].pres;
        }
        return (
            <div>
                <div className="A1 container-fluid">
                    <div className="navbl py-auto"><h4>Forecast</h4></div>
                    <div className="boxsearch justify-content-end py-auto">
                        <input className="inputA" type="text" placeholder="Search" onChange={this._onChange} onKeyPress={this._onKeyPress} /></div>
                </div>
                <div>
                    <div className="A2">
                        <div className="mx-auto currentweatherz align-content-center justify-content-center">
                            <div className="px-auto mx-auto"></div>
                            <div className="px-auto mx-auto"><h3>{this.state.CityName}</h3></div>
                            <div className="mx-auto px-auto tempz">
                                <img className="d-inline" height="70" src={Icon} width="70" />{Temp}<sup>o</sup>C
                                </div>
                            <h5 className="mx-auto px-auto">Updated as of :{Date}</h5>
                            <div className="mx-auto px-auto"><h3>{Description}</h3></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="mx-auto px-auto">Feel Like 26<sup>o</sup>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="d-block"> Wind: {Visibility} km/h</span> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="d-block">Visibility: {Wind} km</span></div> &nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="mx-auto px-auto" >
                                <div className="d-block">Dew Point: {App}<sup>o</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="d-lock">Pres: {Pres}<sup>mb</sup></span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="d-block">Humidity: {Humidity}%</span></div>&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('root')
); 