import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../redux/actions";
import Search from "./Search";
import Filters from "./Filters";
import Card from "./Card";
import Pagination from "./Pagination";
import "../styles/Home.css";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const errors = useSelector((state) => state.error);
  const pageNumber = useSelector((state) => state.pageNumber);
  const visitedPages = pageNumber * 8;
  const eightDogs = dogs.slice(visitedPages, visitedPages + 8);

  useEffect(() => {
    async function fetchDogData() {
      dispatch(await getDogs());
    }

    fetchDogData();
  }, [dispatch]);

  return (
    <div>
      <header className="header">
        <h1>dogs</h1>
      </header>
      <section>
        <Search />
      </section>
      <section>
        <Filters />
      </section>
      <section className="create">
        <Link to="/create">
          <button type="button" className="btn_create">
            Create Your Own Dog
          </button>
        </Link>
      </section>
      <section className="card">
        {errors ? (
          <h1>{errors}</h1>
        ) : (
          eightDogs.map((dog) => <Card key={dog.id} dog={dog} />)
        )}
      </section>
      <section>
        <Pagination />
      </section>
    </div>
  );
}

export default Home;
