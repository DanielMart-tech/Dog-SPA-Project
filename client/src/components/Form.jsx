import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { error } from "../redux/actions";
import {
  nameFieldValidation,
  heightAndWeightFieldsValidation,
  lifeSpanValidation,
  createDog,
} from "../services/dogs";
import "../styles/Form.css";

function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const errors = useSelector((state) => state.error);
  const [data, setData] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_life_span: "",
    max_life_span: "",
    breed: "",
  });
  const [checkboxes, setCheckboxes] = useState(new Array(124).fill(false));

  function handleChange(event) {
    const values = {
      ...data,
      [event.target.name]: event.target.value,
    };

    setData(values);
  }

  function handleCheckbox(position) {
    const updatedCheckedState = checkboxes.map((item, index) =>
      index === position ? !item : item
    );

    setCheckboxes(updatedCheckedState);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const checkedTemperaments = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i]) {
        const obj = {};
        obj[i + 1] = temperaments[i].name;
        checkedTemperaments.push(obj);
      }
    }

    const nameInput = nameFieldValidation(data);

    const heightandWeightInput = heightAndWeightFieldsValidation(data);

    const lifeSpanInput = lifeSpanValidation(data);

    const alerts = [...nameInput, ...heightandWeightInput, ...lifeSpanInput];

    if (alerts.length > 0) {
      return dispatch(error(alerts.join()));
    } else {
      dispatch(error(""));
      createDog(
        {
          ...data,
          height: data.min_height + " - " + data.max_height,
          weight: data.min_weight + " - " + data.max_weight,
          life_span: data.min_life_span + " - " + data.max_life_span,
        },
        checkedTemperaments
      );
    }
  }

  return (
    <div>
      <h2 className="title">Create your own dog</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={data.name}
          placeholder="Type a name"
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="breed" className="label">
          Breed Group
        </label>
        <input
          id="breed"
          name="breed"
          value={data.breed}
          placeholder="Type a breed"
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="min_height" className="label">
          Minimum Height
        </label>
        <input
          type="number"
          id="min_height"
          name="min_height"
          value={data.min_height}
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="max_height" className="label">
          Maximum Height
        </label>
        <input
          type="number"
          id="max_height"
          name="max_height"
          value={data.max_height}
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="min_weight" className="label">
          Minimum Weight
        </label>
        <input
          type="number"
          id="min_weight"
          name="min_weight"
          value={data.min_weight}
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="max_weight" className="label">
          Maximum Weight
        </label>
        <input
          type="number"
          id="max_weight"
          name="max_weight"
          value={data.max_weight}
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="min_life_span" className="label">
          Min Life Span
        </label>
        <input
          type="number"
          id="min_life_span"
          name="min_life_span"
          value={data.min_life_span}
          onChange={handleChange}
          className="input"
        />
        <label htmlFor="max_life_span" className="label">
          Max Life Span
        </label>
        <input
          type="number"
          id="max_life_span"
          name="max_life_span"
          value={data.max_life_span}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Temperaments</label>
        <div className="temperaments">
          {temperaments.map((temper, index) => (
            <div key={temper.id} className="item">
              <input
                type="checkbox"
                id={temper.id}
                name={temper.name}
                value={temper.name}
                checked={checkboxes[index]}
                onChange={() => handleCheckbox(index)}
              />
              <label htmlFor={temper.id}>{temper.name}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn_form">
          create
        </button>
      </form>
      {errors
        ? errors.split(",").map((error, index) => <h4 key={index}>{error}</h4>)
        : null}
      <Link to="/home" style={{ display: "flex", textDecoration: "none" }}>
        <button type="button" className="btn_home">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default Form;
