import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllDogs, getDetailedDog } from "../services/dogs";
import "../styles/DetailedCard.css";

function DetailedDogs() {
  const { id } = useParams();
  const [particularDog, setParticularDog] = useState({});
  const { image, name, temperament, weight, height, life_span } = particularDog;

  useEffect(() => {
    async function fetchDetailedDog(dogId) {
      const detailedDog = await getDetailedDog(dogId);
      if (typeof detailedDog !== "string") {
        return setParticularDog(detailedDog);
      } else {
        const dbDogs = await getAllDogs();
        const detailedDbDog = dbDogs.find((dog) => dog.id === id);
        return setParticularDog(detailedDbDog);
      }
    }

    fetchDetailedDog(id);
  }, [id]);

  return (
    <Link to="/home" className="card">
      <article>
        <figure className="detailed_figure">
          <img src={image} alt={name} className="detailed_image" />
          <h2>{name}</h2>
          <h3>
            Temperament: <em>{temperament}</em>
          </h3>
          <h4>
            <strong>Height:</strong> {height}
          </h4>
          <h4>
            <strong>Weight:</strong> {weight} Kg
          </h4>
          <h4>
            <strong>Life Span:</strong> {life_span}
          </h4>
        </figure>
      </article>
    </Link>
  );
}

export default DetailedDogs;
