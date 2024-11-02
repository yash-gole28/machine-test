import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContextData } from "./context/ContextData";

const Navbar = () => {
    const [movieName , setMovieName] = useState('')
    const {data , setData , clearData} = useContextData()
    const route = useNavigate()

    const handleInputChange = async(event) => {
        try{
            setMovieName(event.target.value)
            
        }catch(error){
            console.error(error)
        }
    }
    const handleMovieSearch = async ()=>{
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${movieName}&page=1`)
            if(response.data){
                route('/')
                setData(response.data.results)
                setMovieName('')
            }
           
        }catch(error){
            console.error(error)
        }
    }
  return (
    <div className="navbar-container">
      <div className="navleft">MoviesDB</div>
      <div className="navright">
        <div className="navlinks" onClick={()=>{
            clearData(),
            route('/')
        }}>
          Popular
        </div>
        <div className="navlinks"  onClick={()=>{
            clearData(),
            route('/top-rated')
        }}>
          Top Rated
        </div>
        <div className="navlinks"  onClick={()=>{
            clearData(),
            route('/upcoming-movies')
        }}>
          upcoming
        </div>
        <div className="search-container">
          <input className="input-search" type="text" value={movieName} onChange={handleInputChange} placeholder="Movie Name" /> 
          <button onClick={handleMovieSearch} className="search-btn" >Search</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
