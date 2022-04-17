import { Link } from "react-router-dom";
import "../styles/Card.css";

function Card({ dog }) {
  const { id, image, name, temperament, weight } = dog;

  return (
    <Link to={`/details/${id}`} className="card">
      <article>
        <figure className="figure">
          <img src={image} alt={name} className="image" />
          <div>
            <h2>{name}</h2>
            <h3>
              Temperament: <em>{temperament}</em>
            </h3>
            <h4>
              <strong>Weight:</strong> {weight} Kg
            </h4>
          </div>
        </figure>
      </article>
    </Link>
  );
}

export default Card;
