export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY
    }
  };

 export const genres = {
  Comedy: 35,
  Drama: 18,
  Romance: 10749,
  Horror: 27,
  ScienceFiction: 878
  }


export const MOVIE_API='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&page=1&region=IN&sort_by=popularity.desc&watch_region=IN&with_origin_country=IN&with_genres=%20';


export const MOVIE_TRAILER='https://api.themoviedb.org/3/movie/';

export const TRAILER_LINK="https://www.youtube-nocookie.com/embed/";


export const LOGO='https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg'

