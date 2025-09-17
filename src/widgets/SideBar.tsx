import { useState, type FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { RiCelsiusFill } from "react-icons/ri";
import { useWeather } from "../context/weatherContext";
import { DotLoader } from "react-spinners";
import { notifySuccess, notifyWarning } from "../utils/notification";

export const SideBar = () => {
  const [search, setSearch] = useState<string>("");
  const { getWeatherData, loading, weather } = useWeather();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      notifyWarning("Please enter your city");
      return;
    }

    const data = await getWeatherData(search);

    if (data) {
      notifySuccess("We found your city");
    }
    setSearch("");
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/70 flex items-center justify-center">
        <DotLoader color="#fff" />
      </div>
    );
  }
  return (
    <div className=" bg-white/10 backdrop-blur-lg p-4  w-full h-screen md:w-[45%] lg:w-[40%] shadow-lg md:rounded-xl absolute right-0">
      <div className="flex items-center justify-center py-8">
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300 rounded-xl w-88 py-2 pl-3 outline-none pr-10 text-slate-800 !mx-3 lg:mx-0 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute top-1.5 right-4 lg:right-2 cursor-pointer">
            <IoSearch size={25} color="#FFF" />
          </span>
        </form>
      </div>
      <div>
        <h5 className="text-center font-medium tracking-[2px] uppercase mb-4 text-gray-300">
          WEATHER DETAILS
        </h5>
        <div className="flex flex-col gap-3 text-gray-300 ">
          <div className="flex justify-between items-center">
            <span className="font-medium">Feels like</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather && (
                <>
                  {Math.round(weather?.main.feels_like)}
                  <RiCelsiusFill />
                </>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Humidity</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather?.main.humidity}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Pressure</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather?.main.pressure}
            </span>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-col gap-3 text-gray-300 ">
          <div className="flex justify-between items-center">
            <span className="font-medium">Country</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather?.sys.country}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Weather</span>
            <span className="flex items-center font-semibold gap-0.5 capitalize">
              {weather?.weather[0].main}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Description</span>
            <span className="flex items-center font-semibold gap-0.5 capitalize">
              {weather?.weather[0].description}
            </span>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-col gap-3 text-gray-300 ">
          <div className="flex justify-between items-center">
            <span className="font-medium">Wind</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather && <>{weather?.wind.speed} km/h</>}
            </span>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex flex-col gap-3 text-gray-300 ">
          <div className="flex justify-between items-center">
            <span className="font-medium">Max Temperature</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather && (
                <>
                  {Math.round(weather?.main.temp_max)} <RiCelsiusFill />
                </>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Min Temperature</span>
            <span className="flex items-center font-semibold gap-0.5">
              {weather && (
                <>
                  {Math.round(weather?.main.temp_min)}
                  <RiCelsiusFill />
                </>
              )}
            </span>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>
      </div>
    </div>
  );
};
