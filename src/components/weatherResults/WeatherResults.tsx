import React from "react";
import "./WeatherResults.pcss";

const WeatherResults = ({ results }) => {
  return (
    <div className="WeatherResults">
      <div className="WeatherHeader">
        <p>Searched Term</p>
        <p>Temperature &#8451;</p>
        <p>Feels Like &#8451;</p>
        <p>Description</p>
        <p>Location</p>
      </div>
      <div className="WeatherResult" data-empty={results.length === 0}>
        {results.length === 0 ? (
          <p className="CenterItem">No item searched</p>
        ) : (
          results.map((result) => {
            return (
              <>
                <p>{result.submitSearchTerm}</p>
                <p className="CenterItem">{result.temperature}</p>
                <p className="CenterItem">{result.feelslike}</p>
                <p>{result.weatherDescription}</p>
                <p>{result.placeName}</p>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WeatherResults;
