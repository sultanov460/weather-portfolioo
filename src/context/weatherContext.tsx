import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import type { Weather } from "../types/weatherType";

interface WeatherContext {
  getWeatherData: (city: string) => Promise<Weather>;
  weather: Weather | null;
  loading: boolean;
  error: string | null;
}

interface WeatherProviderProps {
  children: ReactNode;
}

const weatherContext = createContext({} as WeatherContext);

export const useWeather = () => useContext(weatherContext);

export default function WeatherProvider({ children }: WeatherProviderProps) {
  const [weather, setWeather] = useState<Weather | null>(() => {
    const saved = localStorage.getItem("weatherData");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (weather) {
      localStorage.setItem("weatherData", JSON.stringify(weather));
    }
  }, [weather]);

  async function getWeatherData(city: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      return res.data;
    } catch (e: unknown) {
      console.log(e);
      setError("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <weatherContext.Provider
      value={{ getWeatherData, weather, loading, error }}
    >
      {children}
    </weatherContext.Provider>
  );
}
