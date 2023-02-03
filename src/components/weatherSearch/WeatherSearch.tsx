import React, { useState } from "react";
// import geocode from ".@/utils/weather/geocode";
// import forecast from ".@/utils/weather/forecast";

const WeatherSearch = () => {
  const searchBase = { searchTerm: "", previousSearchTerm: "" };
  const [search, setSearchTerm] = useState({ ...searchBase });
  const [previousSearchResults, setPreviousSearchResults] = useState([]);

  // Chains forcast to geocode and updates results with the return forcast object
  // const getWeatherFromLocationAndUpdateResults = async (searchWord) => {
  //   try {
  //     const locationResults = await geocode(searchWord);
  //     const forecastResult = await forecast(locationResults);

  //     if (forecastResult) {
  //       setPreviousSearchResults([forecastResult, ...previousSearchResults]);
  //     }
  //   } catch (error) {
  //     return console.error(error);
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (search.searchTerm && search.searchTerm !== search.previousSearchTerm) {
  //     getWeatherFromLocationAndUpdateResults(search.searchTerm);
  //     setSearchTerm({ ...search, previousSearchTerm: search.searchTerm });
  //   }
  // };

  const handleChange = (event) => {
    setSearchTerm({
      searchTerm: event.target.value,
      previousSearchTerm: search.previousSearchTerm,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.searchTerm && search.searchTerm !== search.previousSearchTerm) {
      console.log(search);
    }
  };

  return (
    <div className="WeatherSearch">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="text--input"
          value={search.searchTerm}
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;
