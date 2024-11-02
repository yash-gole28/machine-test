import axios from "axios";
import { useEffect, useState } from "react";
import { useContextData } from "../components/context/ContextData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {data, setData} = useContextData();
  const route = useNavigate()
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"
      );
      if (response.data) {
       
            setData(response.data.results);
       
      } else console.log("no data found");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(data.length === 0){
        getData();
    }
  }, []);
  return (
    <div className="body">
      <div className="card-container">
        {data?.map((item, index) => (
          <div key={index} className="card">
            <div onClick={()=> route(`/movie/${item.id}`)} className="card-inner-container">
              <img
                className="image"
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt="movie poster"
              />
              <h3 className="movie-title">{item.original_title}</h3>
              <h3 className="movie-rating">Rating: {parseFloat(item.vote_average).toFixed(2)}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
