import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UpComing from "./pages/UpComing";
import TopRated from "./pages/TopRated";
import { useContextData } from "./components/context/ContextData";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  const {data} = useContextData()
  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-movies" element={<UpComing />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
