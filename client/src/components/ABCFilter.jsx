import { useSelector, useDispatch } from "react-redux";
import { getFilteredDogs } from "../redux/actions";
import { handleFiltersValues } from "../services/dogs";
import "../styles/Filters.css";

function ABCFilter() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  function az() {
    const sortedAZDogs = dogs.sort((a, b) =>
      a["name"].localeCompare(b["name"])
    );
    return sortedAZDogs;
  }

  function za() {
    return az().reverse();
  }

  function handleSelect(event) {
    if (event.target.value === "a") dispatch(getFilteredDogs([...az()]));
    else if (event.target.value === "z") dispatch(getFilteredDogs([...za()]));

    handleFiltersValues("weight", "void");
  }

  return (
    <div>
      <label htmlFor="abc" className="detailed_filter">
        Alphabetical Order:
      </label>
      <select id="abc" onChange={handleSelect}>
        <option value="void">---</option>
        <option value="a">A - Z</option>
        <option value="z">Z - A</option>
      </select>
    </div>
  );
}

export default ABCFilter;
