import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, handleFiltersValues } from "../services/dogs";
import { getFilteredDogs } from "../redux/actions";
import "../styles/Filters.css";

function BreedFilter() {
  const dispatch = useDispatch();
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function fetchBreeds() {
      const species = [];
      const canines = await getAllDogs();

      for (const canine of canines) {
        if (!canine.breed_group) continue;
        species.push(canine.breed_group);
      }

      const breedGroup = [...new Set(species)];
      setBreeds(breedGroup);
    }

    fetchBreeds();
  }, []);

  async function handleChage(e) {
    if (e.target.value === "void") return;
    const dogs = await getAllDogs();
    const filteredDogs = dogs.filter(
      (dog) => dog.breed_group === e.target.value
    );
    dispatch(getFilteredDogs(filteredDogs));

    handleFiltersValues("search_dog", "");
    handleFiltersValues("temperaments", "void");
    handleFiltersValues("abc", "a");
  }

  return (
    <div>
      <label htmlFor="breed" className="detailed_filter">
        Breed Group:
      </label>
      <select id="breed" onChange={handleChage}>
        <option value="void">---</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BreedFilter;
