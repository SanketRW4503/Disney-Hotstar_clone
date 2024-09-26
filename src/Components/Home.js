import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import VideoCover from './VideoCover';
import MovieListShimmer from './Shimmer/MovieListShimmer'
const Home = () => {
    const movielist = useSelector((store) => store?.movie);

    return <div >

        <VideoCover className="w-full h-screen  shadow-2xl" />

        {movielist?.ScienceFictionMovies === [] ? <div className='mt-[-10%] relative ml-[6.9%] z-[100]'>{
            Array(5).fill('').map((index) => <MovieListShimmer key={index} />)}</div> :
            <div className='mt-[-10%] relative ml-[6.9%] z-[100]'>

                <MovieList title="Comedy" movielist={movielist?.comedyMovies} />
                <MovieList title="Drama" movielist={movielist?.dramaMovies} />
                <MovieList title="Romance" movielist={movielist?.romanticMovies} />
                <MovieList title="Horror" movielist={movielist?.horrerMovies} />
                <MovieList title="Science-Fiction" movielist={movielist?.ScienceFictionMovies} />
            </div>
        }



    </div>
}

export default Home;