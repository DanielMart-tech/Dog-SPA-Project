import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DetailedDogs from "./components/DetailedDogs";
import Form from "./components/Form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTemperaments } from "./redux/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTemperamentData() {
      dispatch(await getTemperaments());
    }

    fetchTemperamentData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="details/:id" element={<DetailedDogs />} />
        <Route path="create" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
