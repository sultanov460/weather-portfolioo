import WeatherBackground from "./widgets/WeatherBackground";
import { WeatherCard } from "./widgets/WeatherCard";

const App = () => {
  return (
    <>
      <WeatherBackground>
        <WeatherCard />
      </WeatherBackground>
    </>
  );
};

export default App;
