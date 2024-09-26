import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import VideoCover from './VideoCover';
import { useDispatch } from 'react-redux'; // Import useDispatch if you're using Redux
import { MOVIE_TRAILER, options } from '../Utils/constant'; // Make sure to import your constants
import { addTrendingMovieTrailer } from '../Redux-store/movieSlice';

const MoviePage = () => {
    const { id } = useParams(); // Get the id from the URL
    const dispatch = useDispatch(); // Initialize dispatch

    const getMovieData = async (id) => {
        const res = await fetch(MOVIE_TRAILER + id + '/videos?', options); 
        const json = await res.json();
        dispatch(addTrendingMovieTrailer(json?.results));

    };

    useEffect(() => {
        if (id) {
            getMovieData(id); 
        }
        // eslint-disable-next-line 
    }, [id]); 

    return (
        <div>
            <VideoCover className="w-full h-screen shadow-2xl" />
        </div>
    );
};

export default MoviePage;
