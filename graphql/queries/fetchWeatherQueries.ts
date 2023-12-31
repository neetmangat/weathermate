import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $latitude: String!
    $longitude: String!
    $timezone: String!
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
    ) {
      elevation
      generationtime_ms
      current_weather {
        interval
        is_day
        temperature
        time
        winddirection
        windspeed
        weathercode
      }
      current_weather_units {
        interval
        is_day
        temperature
        weathercode
        winddirection
        time
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_min
        temperature_2m_max
        time
        uv_index_max
        uv_index_clear_sky_max
        weathercode
      }
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      hourly_units {
        apparent_temperature
        precipitation
        rain
        precipitation_probability
        relativehumidity_2m
        showers
        snowfall
        snow_depth
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
    }
  }
`;

export default fetchWeatherQuery;
