import { type ReactNode, useEffect, useState } from "react";
import { useWeather } from "../context/weatherContext";

interface Props {
  children: ReactNode;
}

const WeatherBackground = ({ children }: Props) => {
  const { weather } = useWeather();
  const [bgClass, setBgClass] = useState("bg-default");

  useEffect(() => {
    const condition = weather?.weather[0].main;
    switch (condition) {
      case "Thunderstorm":
        setBgClass("bg-thunderstorm");
        break;
      case "Rain":
        setBgClass("bg-rain");
        break;
      case "Clear":
        setBgClass("bg-clear");
        break;
      case "Clouds":
        setBgClass("bg-clouds");
        break;
      default:
        setBgClass("bg-default");
        break;
    }
  }, [weather]);

  return (
    <div
      className={`${bgClass} !min-h-screen bg-cover bg-center transition duration-300`}
    >
      {children}
    </div>
  );
};

export default WeatherBackground;
