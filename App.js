// Tambahkan ActivityIndicator
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
// Import useState
import React, { useState } from "react";
// Import axios, BASE_URL, dan API_KEY
import axios from "axios";
import { BASE_URL, API_KEY } from "./src/constant";
import WeatherSearch from "./src/components/WeatherSearch";
import WeatherInfo from "./src/components/WeatherInfo";

const App = () => {
  // Definisikan state "weatherData" dan "setWeatherData"
  const [weatherData, setWeatherData] = useState();
  // Definisikan state status
  const [status, setStatus] = useState("");
  // Definisikan function renderComponent
  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return;
    }
  };
  // Perbarui function searchWeather dengan menggunakan axios
  const searchWeather = (location) => {
    // Mengatur status ke "loading"
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        // Konversi meter ke kilometer
        data.visibility /= 1000;
        // membulatkan nilai
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // Konversi Kelvin ke Celcius
        // membulatkan nilai
        data.main.temp = data.main.temp.toFixed(2);
        // update state
        setWeatherData(data);
        // Mengatur status ke "success"
        setStatus("success");
      })
      .catch((error) => {
        // Mengatur status ke "error"
        setStatus("error");
      });
  };
  return (
    <View style={styles.container}>
      {/* Berikan function searchWeather ke component weatherSearch */}
      <WeatherSearch searchWeather={searchWeather} />
      {/* Menggunakan function renderComponent di sini */}
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  margintTop20: {
    marginTop: 20,
  },
});
