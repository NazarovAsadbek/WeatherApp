import * as Location from 'expo-location';
import React from "react";
import {Alert} from "react-native";
import Loading from "./components/Loading";
import axios from "axios";

const API_KEY = "d7b504927f176b42e4e1f8be9a3861ea";
export default class extends React.Component {
    state = {
        isLoading: true
    }

    getWeatherFromAPI = async (latitude, longitude) => {
        const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        console.log('api',data)
    }

    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync()
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            await this.getWeatherFromAPI(latitude, longitude)
            this.setState({isLoading: false})
        } catch (e) {
            Alert.alert("Не могу определить местоположение", "Очень грустно :(")
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    render() {
        const {isLoading} = this.state;

        return (
            isLoading ? <Loading/> : null
        );
    }
    ;
}
