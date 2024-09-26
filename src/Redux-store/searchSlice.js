import { createSlice } from "@reduxjs/toolkit";




const searchSlice= createSlice({

    name:'search',
    initialState:{
        searchResults:[]
    }
    , reducers:{

            addSearchResults:(state, actions)=>{
                state.searchResults=actions.payload;
            },
            clearSearch:(state)=>{
                state.searchResults=[];
            }

    }
});



export const{addSearchResults,clearSearch} = searchSlice.actions;
export default searchSlice.reducer;