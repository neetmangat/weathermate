import weatherCodeToString from "@/lib/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div className="bg-gradient-to-br  from-[#4b3556] to-[#062764] text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold mb-2">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-lg">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="xl:text-sm font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5" />

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <Image
              src={`https://www.weatherbit.io/static/img/icons/${
                weatherCodeToString[results.current_weather.weathercode].icon
              }.png`}
              alt={
                weatherCodeToString[results.current_weather.weathercode].label
              }
              width={75}
              height={75}
            />
            <p className="text-right font-extralight text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>

          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
