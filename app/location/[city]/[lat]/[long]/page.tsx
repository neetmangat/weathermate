import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";

export const revalidate = 3600;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherDashboard({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  const dataToSend = cleanData(results, city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    body: JSON.stringify({ data: dataToSend }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const GPTdata = await res.json();
  const { content } = GPTdata;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* SideBar Info Panel */}
      <InformationPanel city={city} lat={lat} long={long} results={results} />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-5 lg:p-10 bg-slate-200">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          {/* GPT Weather Summary */}
          <div className="m-2 mb-10">
            <CalloutCard message={content} />
          </div>

          {/* Weather Info Dashboard */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="yellow"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="green"
            />

            <div>
              <StatCard
                title="UV Index"
                metric={results.daily.uv_index_max[0].toFixed(1)}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  warning
                  message="UV Index is high, please wear sunscreen!"
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}km/h`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
