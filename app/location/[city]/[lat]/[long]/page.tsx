type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

function WeatherDashboard({ params: { city, lat, long } }: Props) {
  return (
    <div>
      <h1>
        WeatherDashboard for {city} {lat} {long}
      </h1>
    </div>
  );
}

export default WeatherDashboard;
