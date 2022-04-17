import { useDispatch, useSelector } from "react-redux";
import { getFilteredDogs } from "../redux/actions";
import { handleFiltersValues } from "../services/dogs";
import "../styles/Filters.css";

function WeightFilter() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  const avgWeights = dogs.map((dog) => ({
    ...dog,
    avgWeight: dog.weight
      .split(" - ")
      .reduce(
        (prev, curr) => (Number(prev) + (Number(curr) || Number(prev))) / 2
      ),
  }));

  function numerically(ascending) {
    return function (a, b) {
      if (a.avgWeight === b.avgWeight) {
        return 0;
      } else if (a.avgWeight === null || isNaN(a.avgWeight)) {
        return 1;
      } else if (b.avgWeight === null || isNaN(b.avgWeight)) {
        return -1;
      } else if (ascending) {
        return a.avgWeight < b.avgWeight ? -1 : 1;
      } else {
        return a.avgWeight < b.avgWeight ? 1 : -1;
      }
    };
  }

  function minWeight() {
    const sortedMinWeights = avgWeights.sort(numerically(true));
    dispatch(getFilteredDogs([...sortedMinWeights]));
  }

  function maxWeight() {
    const sortedMaxWeights = avgWeights.sort(numerically(false));
    dispatch(getFilteredDogs([...sortedMaxWeights]));
  }

  function handleChange(e) {
    if (e.target.value === "min") minWeight();
    else if (e.target.value === "max") maxWeight();

    handleFiltersValues("abc", "void");
  }

  return (
    <div>
      <label htmlFor="weight" className="detailed_filter">
        Average Weight Order
      </label>
      <select id="weight" onChange={handleChange}>
        <option value="void">---</option>
        <option value="min">min</option>
        <option value="max">max</option>
      </select>
    </div>
  );
}

export default WeightFilter;
