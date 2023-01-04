import * as Location from 'expo-location';
import React from "react";
import axios from "axios";
import {Alert} from "react-native";
import Loading from "./components/Loading";
import Weather from "./components/Weather";

const API_KEY = "d7b504927f176b42e4e1f8be9a3861ea";
export default class extends React.Component {
    state = {
        isLoading: true,
        temp: 0,
        condition: ""
    }

    getWeatherFromAPI = async (latitude, longitude) => {
        const {
            data: {
                main: {temp},
                weather
            }
        } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        this.setState({
                temp,
                condition: weather[0].main,
                isLoading: false
            }
        );
    }

    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync()
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            await this.getWeatherFromAPI(latitude, longitude)
        } catch (e) {
            Alert.alert("Не могу определить местоположение", "Очень грустно :(")
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    render() {
        const {isLoading, temp, condition} = this.state;
        return isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>;
    }
}