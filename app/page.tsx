"use client";

import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
// import logo from "./assets/logo.png";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4b3556] to-[#062764] p-10 flex flex-col justify-center">
      <Card className="max-w-4xl mx-auto bg-slate-300 rounded-2xl">
        {/* <div className="flex justify-center align-middle items-center">
          <Image
            src={logo}
            alt="Weathermate Logo"
            height={75}
            width={75}
            className="flex"
          />
        </div> */}
        <Text className="text-7xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#7c5a8d] to-[#062257] ">
          weathermate
        </Text>
        <Subtitle className="text-md font-light text-center">
          Powered by OpenAI, Next.js 14, Tailwind CSS, GraphQL
        </Subtitle>

        <Divider className="bg-[#4b3556] my-10" />

        <Card className="bg-gradient-to-br from-[#4b3556] to-[#062257] rounded-md">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
