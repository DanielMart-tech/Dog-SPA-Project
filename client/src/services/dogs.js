import axios from "axios";

const baseURL = "http://localhost:3001";

/* fetch */

export async function getAllDogs() {
  const allDogs = await axios.get(`${baseURL}/dogs`);
  return allDogs.data;
}

export async function getDogName(name) {
  const dogName = await axios.get(`${baseURL}/dogs?name=${name}`);
  return dogName.data;
}

export async function getDetailedDog(id) {
  const detailedDog = await axios.get(`${baseURL}/dogs/${id}`);
  return detailedDog.data;
}

export async function getTempers() {
  const tempers = await axios.get(`${baseURL}/temperament`);
  return tempers.data;
}

export function createDog(formData, temperamentData) {
  axios
    .post(`${baseURL}/dog`, {
      name: formData["name"],
      height: formData["height"],
      weight: formData["weight"],
      life_span: formData["life_span"],
      breed: formData["breed"],
      temperaments: temperamentData,
    })
    .then(() => alert("Dog created successfully"))
    .catch((error) => console.log(error.message));
}

/* DOM */

export function handleFiltersValues(id, newValue) {
  return (document.getElementById(id).value = newValue);
}

/* Validations */

export function nameFieldValidation(obj) {
  const numRegex = /\d/g;
  const nonAlphabetRegex = /\W/g;
  const nameInput = obj["name"];
  const breedInput = obj["breed"];
  const alerts = [];

  if (!nameInput || !breedInput) alerts.push("You should type a name");
  if (nameInput.length > 40 || breedInput.length > 40)
    alerts.push("Name: 40 characters maximum");
  if (nameInput.length < 3 || breedInput.length < 3)
    alerts.push("Name: 3 characters minimum");
  if (
    numRegex.test(nameInput) ||
    numRegex.test(breedInput) ||
    nonAlphabetRegex.test(nameInput) ||
    nonAlphabetRegex.test(nameInput)
  )
    alerts.push(
      "Name/Breed: You must not include numbers or special characters"
    );

  return alerts;
}

export function heightAndWeightFieldsValidation(obj) {
  const minHeightInput = obj["min_height"];
  const maxHeightInput = obj["max_height"];
  const minWeightInput = obj["min_height"];
  const maxWeightInput = obj["max_height"];
  const alerts = [];

  if (!Number(minHeightInput)) alerts.push("Minimum height must be a number");
  if (minHeightInput < 13)
    alerts.push("Minimum height must be greater than 12");
  if (!Number(maxHeightInput)) alerts.push("Maximum height must be a number");
  if (maxHeightInput < 14 || maxHeightInput > 107)
    alerts.push("Maximum height must be greater than 14 and lesser than 107");
  if (minHeightInput === maxHeightInput || minHeightInput > maxHeightInput)
    alerts.push(
      "Height values must be different: (min_height =/= max_height) AND (min_height < max_height)"
    );

  if (!Number(minWeightInput)) alerts.push("Minimum weight must be a number");
  if (minWeightInput < 1) alerts.push("Minimum weight must be greater than 0");
  if (!Number(maxWeightInput)) alerts.push("Maximum weight must be a number");
  if (maxWeightInput < 2 || maxHeightInput > 156)
    alerts.push("Maximum weight must be greater than 1 and lesser than 157");
  if (minWeightInput === maxWeightInput || minWeightInput > maxWeightInput)
    alerts.push(
      "Weight values must be different: (min_weight =/= max_weight) AND (min_weight < max_weight)"
    );

  return alerts;
}

export function lifeSpanValidation(obj) {
  const minLifeSpan = obj["min_life_span"];
  const maxLifeSpan = obj["max_life_span"];
  const alerts = [];

  if (!Number(minLifeSpan)) alerts.push("Minimum life span must be a number");
  if (minLifeSpan < 1) alerts.push("Minimum life span must be greater than 0");
  if (!Number(maxLifeSpan)) alerts.push("Maximum life span must be a number");
  if (maxLifeSpan > 15) alerts.push("Maximum life span must be lesser than 16");
  if (
    Number(minLifeSpan) === Number(maxLifeSpan) ||
    Number(minLifeSpan) > Number(maxLifeSpan)
  )
    alerts.push(
      "Life span values must be different: (min_life_span =/= max_life_span) AND (min_life_span < max_life_span)"
    );

  return alerts;
}
