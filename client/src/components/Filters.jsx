import React from "react";
import TemperamentFilter from "./TemperamentFilter";
import BreedFilter from "./BreedFilter";
import ABCFilter from "./ABCFilter";
import WeightFilter from "./WeightFilter";
import "../styles/Filters.css";

function Filters() {
  return (
    <div className="filters">
      <TemperamentFilter />
      <BreedFilter />
      <ABCFilter />
      <WeightFilter />
    </div>
  );
}

export default React.memo(Filters);
