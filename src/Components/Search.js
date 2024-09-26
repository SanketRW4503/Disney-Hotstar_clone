import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import geminiai from "../Utils/geminiai";
import { options } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";

import { addSearchResults, clearSearch } from "../Redux-store/searchSlice";
import MovieList from "./MovieList";
import MovieListShimmer from "./Shimmer/MovieListShimmer";



const Search = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [showShimmer,setShowShimmer]= useState(false);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const searchResults = useSelector((store) => store.search.searchResults);




    async function getMovieData(movie) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`, options);
            const json = await res.json();
            return { movieName: movie, results: json?.results };
        } catch (error) {
            setErrorMsg("Something Went Wrong !");
        }
       

    }



    async function geminiCall(prompt) {
        try {
            const gemini_response = await geminiai.generateContent(prompt);
            return gemini_response.response.text();

        } catch (error) {
            return "error";
        }

    }

 

    async function handleSearch() {
        dispatch(clearSearch());
        setShowShimmer(true);
        //making sure input tag is not empty otherwise show error
        if (searchRef?.current?.value === "") {
            setErrorMsg('Please Enter Something inside Search Box to search !');
            setShowShimmer(false);
            return;
        }

        //creating propper prompt
        const prompt = `Act as a movie recommendation system for the following query: ${searchRef?.current?.value}. Return only 5 movies, separated by commas, in the following format: dilwale, golmaal, koi mil gaya, hero.`;

        //sending prompt to the gemini
        const res_text = await geminiCall(prompt);  
       
        //checking recieved data is correct or not  
        if (res_text.length > 100 || res_text === "error") {
            setErrorMsg('No Result Found !');
            setShowShimmer(false);
            return;
        }

        const resultArray = res_text.split(",");

        //get all movies data from tmdb 
        const promiseArray = resultArray.map((movie) => getMovieData(movie));

        //resolve all promisses
        const final_result = await Promise.all(promiseArray);

        //add search results to store
        dispatch(addSearchResults(final_result));

        //clear the errors 
        setErrorMsg(null);
        setShowShimmer(false);

    }



    return <div className=" ml-[10%] mr-[2%] relative">
        <form className="mt-[3%] w-full flex items-center bg-slate-800 p-4 rounded-lg text-gray-300 font-bold" onSubmit={(e) => e.preventDefault()}>
            <CiSearch className="text-3xl mx-2 " />
            <input type="text" name="search" ref={searchRef} placeholder="Movies, Shows and more" className="bg-transparent outline-none ml-2" />

            <button onClick={() => handleSearch()}
                className="absolute right-[30px] font-bold">Search</button>



        </form>
            {
            errorMsg ? <p className="m-4 Font-bold text-2xl text-gray-500">{errorMsg}</p> : <div className="mt-[2%]">
                {      


                    searchResults?.map((s, index) => {
                        return <MovieList title={s?.movieName } key={s?.movieName+index} movielist={s?.results} />
                    })
                }
            </div>
             }

             {
                showShimmer?Array(5).fill('').map((e,index)=><MovieListShimmer key={index}/>):null
             }
            
    </div>
}

export default Search;