import React from "react";
import propTypes from "prop-types";
import {StyleSheet, Text, View, StatusBar} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {weatherConditions} from "../data/weatherConditions";

export default function Weather({temp, condition}) {
    const weatherOption = weatherConditions[condition];
    return (
        <LinearGradient
            colors={weatherConditions[condition].gradient}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor={weatherOption.gradient[0]}/>
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons name={weatherOption.iconName} size={96} color="white"/>
                <Text style={styles.temp}>{temp}°</Text>
            </View>
            <View style={{...styles.halfContainer, ...styles.textContainer}}>
                <Text style={styles.title}>{weatherOption.title}</Text>
                <Text style={styles.subtitle}>{weatherOption.subtitle}</Text>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: propTypes.number.isRequired,
    condition: propTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Smoke", "Fog", "Sand", "Ash", "Squall", "Tornado", "Clear", "Clouds", "Haze", "Mist", "Dust"]).isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "flex-start"
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    title: {
        fontSize: 32,
        color: "white",
        fontWeight: "300",
        marginBottom: 10
    },
    subtitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "600"
    }
})
