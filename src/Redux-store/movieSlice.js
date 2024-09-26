import { createSlice } from "@reduxjs/toolkit";


const movieSlice=createSlice({
    name:'movie',
    initialState:{
        comedyMovies:[],
        dramaMovies:[],
        romanticMovies:[],
        horrerMovies:[],
        ScienceFictionMovies:[],
        trendingMovie:{},
        trendingMovieTrailer:[]
    }
    ,
    reducers:{
        addComedyMovies:(state,actions)=>{
            state.comedyMovies=actions.payload;
        },
        addDramaMovies:(state,actions)=>{
            state.dramaMovies=actions.payload;
        },
        addRomanticMovies:(state,actions)=>{
            state.romanticMovies=actions.payload;
        },
        addHorrorMovies:(state,actions)=>{
            state.horrerMovies=actions.payload;
        },
        addScienceMovies:(state,actions)=>{
            state.ScienceFictionMovies=actions.payload;
        },
        addTrendingMovie:(state,actions)=>{
            state.trendingMovie=actions.payload;
        },
        addTrendingMovieTrailer:(state,actions)=>{
            state.trendingMovieTrailer=actions.payload;
        }
    }
});

export const{addComedyMovies,addDramaMovies,addRomanticMovies,addHorrorMovies,addScienceMovies,addTrendingMovie,addTrendingMovieTrailer} = movieSlice.actions
export default movieSlice.reducer;