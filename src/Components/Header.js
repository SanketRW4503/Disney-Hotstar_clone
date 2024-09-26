import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { BiMovie } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addComedyMovies, addDramaMovies, addHorrorMovies, addRomanticMovies, addScienceMovies, addTrendingMovie, addTrendingMovieTrailer } from "../Redux-store/movieSlice";
import { addUser, removeUser } from "../Redux-store/userSlice";
import { LOGO, MOVIE_API, MOVIE_TRAILER, genres, options } from '../Utils/constant';
import { auth } from "../Utils/firebase";

function Header() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeMenu, setActiveMenu] = useState("home"); // Manage active menu state

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fetchMovie = async (movieGernID) => {
        const res = await fetch(MOVIE_API + movieGernID, options);
        const json = await res.json();
        return json;
    };

    const getMovies = async () => {
        const comedyMovies = await fetchMovie(genres.Comedy);
        const dramaMovies = await fetchMovie(genres.Drama);
        const romanticMovies = await fetchMovie(genres.Romance);
        const horrerMovies = await fetchMovie(genres.Horror);
        const scienceFictionMovies = await fetchMovie(genres.ScienceFiction);

        dispatch(addComedyMovies(comedyMovies?.results));
        dispatch(addDramaMovies(dramaMovies?.results));
        dispatch(addRomanticMovies(romanticMovies?.results));
        dispatch(addHorrorMovies(horrerMovies?.results));
        dispatch(addScienceMovies(scienceFictionMovies?.results));

        if ( comedyMovies && comedyMovies?.results?.length > 0) {
            const randomIndex = Math.floor(Math.random() * comedyMovies?.results?.length);
            dispatch(addTrendingMovie(comedyMovies?.results[randomIndex]));
            await getTrendingMovieTrailer(comedyMovies?.results[randomIndex]?.id);
        }
    };

    const getTrendingMovieTrailer = async (id) => {
        const res = await fetch(MOVIE_TRAILER + id + '/videos?', options);
        const json = await res.json();
        dispatch(addTrendingMovieTrailer(json?.results));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid } = user;
                dispatch(addUser({ displayName, email, uid }));
                getMovies();
                navigate("/home");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    // Handle active menu state to dynamically change color
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <header className={`fixed z-[200] top-0 left-0 bottom-0 p-4 w-[8%] ${location.pathname!=="/"?'bg-gradient-to-r from-black to-transparent':''} ` }>
            <img
                src={LOGO}
                width={100}
                height={100}
                alt="logo-image"
            />
        {
            location.pathname!=='/'?  <ul
            className="text-white text-2xl absolute top-[25%] left-[20px] bottom-0 space-y-8"
            id="menu-container"
            onMouseEnter={() => setMenuVisible(true)}
            onMouseLeave={() => setMenuVisible(false)}
        >
            <li
                className={`hover:text-white ${activeMenu === "profile" ? "text-white" : "text-gray-400"}`}
                id="profile"
                onClick={() => handleMenuClick("profile")}
            >
                <Link to={"/profile"} className="cursor-pointer flex items-center">
                    <CgProfile />
                    <span
                        className={`ml-2 text-sm  transition-all duration-500 ease-in-out ${
                            menuVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        My Space
                    </span>
                </Link>
            </li>
            <li
                className={`hover:text-white ${activeMenu === "search" ? "text-white" : "text-gray-400"}`}
                id="search"
                onClick={() => handleMenuClick("search")}
            >
                <Link to={"/search"} className="cursor-pointer flex items-center">
                    <CiSearch />
                    <span
                        className={`ml-2 text-sm transition-all duration-500 ease-in-out ${
                            menuVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        Search
                    </span>
                </Link>
            </li>
            <li
                className={`hover:text-white ${activeMenu === "home" ? "text-white" : "text-gray-400"}`}
                id="home"
                onClick={() => handleMenuClick("home")}
            >
                <Link to={"/home"} className="cursor-pointer flex items-center">
                    <IoMdHome />
                    <span
                        className={`ml-2 text-sm transition-all duration-500 ease-in-out ${
                            menuVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        Home
                    </span>
                </Link>
            </li>
            <li
                className={`hover:text-white ${activeMenu === "movies" ? "text-white" : "text-gray-400"}`}
                id="movies"
                onClick={() => handleMenuClick("movies")}
            >
                <Link to={"/home"} className="cursor-pointer flex items-center">
                    <BiMovie />
                    <span
                        className={`ml-2 text-sm transition-all duration-500 ease-in-out ${
                            menuVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        Movies
                    </span>
                </Link>
            </li>
        </ul>:null
        }
          
        </header>
    );
}

export default Header;
