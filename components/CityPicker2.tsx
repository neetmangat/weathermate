"use client";
// City Picker to remove hydration error from NextJS

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import { GlobeIcon } from "@heroicons/react/solid";

type countryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const countryOptions = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const handleSelectedCountry = (option: countryOption) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.latitude}/${option?.value.longitude}/`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>

        {isMounted && (
          <Select
            value={selectedCountry}
            options={countryOptions}
            onChange={handleSelectedCountry}
            placeholder="Select a country"
          />
        )}
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          {isMounted && (
            <Select
              value={selectedCity}
              options={City.getCitiesOfCountry(
                selectedCountry.value.isoCode
              )?.map((city) => ({
                value: {
                  latitude: city.latitude!,
                  longitude: city.longitude!,
                  countryCode: city.countryCode,
                  name: city.name,
                  stateCode: city.stateCode,
                },
                label: city.name,
              }))}
              onChange={handleSelectedCity}
              placeholder="Select a city"
            />
          )}
        </div>
      )}
    </div>
  );
}
export default CityPicker;
