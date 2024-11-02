import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [castdetails , setCastDetails] = useState([])

    const genreList = movie?.genres?.map(genre => genre.name).join(", ");

    const getMovieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
            if (response.data) {
                console.log(response.data)
                setMovie(response.data)
            }

        } catch (error) {
            console.error(error)
        }
    }
    const getCastingDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
            if (response.data) {
                console.log(response.data.cast)
                setCastDetails(response.data.cast)
            }

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getMovieDetails()
        getCastingDetails()
    }, [])
    return (
        <div>
            <div className='movie-details-container' style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`
            }}>
                <div className="movie-details-content">
                    <div className='movie-details'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                        <div className='movie-inner-data'>
                            <div className='movie-name'>{movie.original_title}</div>
                            <div className='rating'>Rating: {parseFloat(movie.vote_average).toFixed(2)}</div>

                            <div className='movie-genres'>
                                <span className='movie-runtime'>{movie.runtime} min</span>
                                <span> {genreList}</span>
                            </div>
                            <div className='release-date'>Release Date : {dayjs(movie.release_date).format('ddd MMM DD YYYY')}</div>

                        </div>
                    </div>
                    <div className='overview-container'>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>

            </div>
            <div className='cast-container'>
                <h2>Cast</h2>
                <div className='cast-details'>
                    {castdetails?.map((data,index)=>(
                        <div className='cast-data' key={index}>
                            <img className='cast-img' src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}/>
                            <p className='character'>{data.original_name}</p>
                            <p className='character'>Character: {data.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
