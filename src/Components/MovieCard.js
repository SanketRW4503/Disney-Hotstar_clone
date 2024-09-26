import { useState } from "react";
import { BiError } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTrendingMovie } from "../Redux-store/movieSlice";



const MovieCard = ({ image, movieName, id, wholeInfo }) => {


    const [showImage, setShowImage] = useState(true);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    function handleNavigate() {
        dispatch(addTrendingMovie(wholeInfo));
        navigate(`/${id}`);

    }


    return showImage ? <img src={image} onError={() => setShowImage(false)} onClick={() => { handleNavigate() }}
        className="w-[150px] m-2 h-full shadow-md rounded-md cursor-pointer hover:scale-110 relative z-[1000] transition-all duration-150 ease-in-out" alt="movie-poster" /> :
        <div onClick={() => { handleNavigate() }}
            className="flex flex-col shadow-lg rounded-sm w-[150px] justify-center text-center items-center text-gray-500 cursor-pointer hover:scale-110 relative z-[1000] transition-all duration-150 ease-in-out ">
            <BiError className="text-4xl font-bold " />
            <span >IMAGE NOT FOUND</span>
            <p>{movieName.length > 20 ? movieName.slice(0, 10) + "..." : movieName}</p>
        </div>


}

export default MovieCard;