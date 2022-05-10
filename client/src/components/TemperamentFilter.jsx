import { useSelector, useDispatch } from "react-redux";
import { error, getDogs, getFilteredDogs } from "../redux/actions";
import { getAllDogs, handleFiltersValues } from "../services/dogs";
import "../styles/Filters.css";

function TemperamentFilter() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  async function handleClick(e) {
    const character = e.target.value;
    dispatch(error(""));

    if (character === "void") return null;
    else if (character === "all") dispatch(await getDogs());
    else {
      const dogs = await getAllDogs();
      const filteredDogs = dogs.filter(
        (dog) => dog.temperament && dog.temperament.includes(character)
      );
      if (filteredDogs.length === 0)
        dispatch(error(`No dogs including ${character} as temperament`));
      dispatch(getFilteredDogs(filteredDogs));
    }

    handleFiltersValues("abc", "a");
    handleFiltersValues("weight", "void");
    handleFiltersValues("search_dog", "");
    handleFiltersValues("breed", "void");
  }

  return (
    <div>
      <label htmlFor="temperaments" className="detailed_filter">
        Temperaments:
      </label>
      <select id="temperaments" defaultValue={"all"} onChange={handleClick}>
        <option value="void">---</option>
        <option value="all">All</option>
        {temperaments.map((temper) => (
          <option key={temper.id} value={temper.name}>
            {temper.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TemperamentFilter;
