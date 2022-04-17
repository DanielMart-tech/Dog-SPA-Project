import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, getDogName, handleFiltersValues } from "../services/dogs";
import { getFilteredDogs, error } from "../redux/actions";
import "../styles/Search.css";

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  async function handleClick() {
    if (!input.trim()) return dispatch(error("You should type a name"));
    if (input.length > 40) return dispatch(error("40 characters maximum"));
    if (input.length < 3) return dispatch(error("3 characters minimum"));
    const numRegex = /\d/g;
    const nonAlphabetRegex = /[a-zA-Z ]/g;
    if (numRegex.test(input) || !nonAlphabetRegex.test(input))
      return dispatch(
        error("You must not include numbers or special characters")
      );

    const apiDogs = await getDogName(input);
    const dbDogs = await getAllDogs();

    const dogs = [];

    if (typeof apiDogs !== "string") {
      const filteredApiDogs = apiDogs.filter((dog) =>
        dog.name.toLowerCase().includes(input.toLowerCase())
      );
      dogs.push(...filteredApiDogs);
    }

    const filteredDbDogs = dbDogs.filter((dog) =>
      dog.name.toLowerCase().includes(input.toLowerCase())
    );
    dogs.push(...filteredDbDogs);

    const list = dogs.filter(
      (value, index, self) =>
        index === self.findIndex((element) => element.name === value.name)
    );

    if (dogs.length === 0)
      dispatch(error(`No dogs containing ${input} in its title`));
    else {
      dispatch(error(""));
      dispatch(getFilteredDogs(list));
    }

    handleFiltersValues("temperaments", "void");
    handleFiltersValues("abc", "void");
    handleFiltersValues("weight", "void");
    handleFiltersValues("breed", "void");
  }

  return (
    <div className="search">
      <label htmlFor="search_dog" className="title">
        Search a dog
      </label>
      <input
        id="search_dog"
        maxLength={40}
        minLength={3}
        placeholder="write your favourite dog here"
        onChange={(e) => setInput(e.target.value)}
        className="input"
      />
      <button type="button" onClick={handleClick}>
        search
      </button>
    </div>
  );
}

export default Search;
