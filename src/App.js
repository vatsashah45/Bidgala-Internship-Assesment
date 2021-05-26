import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import Watchlist from './components/Watchlist';
import DeleteWatchlist from './components/DeleteWatchlist';

const App = () => {
  const [movies, setMovies] = useState([]);
  const[watchlist, setWatchlist] = useState([]);
  const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c553fb43&Type=movie`

      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.Search){
        setMovies(responseJson.Search);
      }
    };

    useEffect(()=>{
      getMovieRequest(searchValue);
    }, [searchValue]);

    const addToWatchlist = (movie) => {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
    }

    const deleteFromWatchlist = (movie) => {
      const newWatchlist = watchlist.filter((favourite)=> favourite.imdbID !== movie.imdbID);
      setWatchlist(newWatchlist);
    }

  return(
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
        movies={movies}
        handleWatchlistClick={addToWatchlist}
        watchlistComponent={Watchlist}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Watchlist' />
      </div>
      <div className='row'>
        <MovieList 
        movies={watchlist}
        handleWatchlistClick={deleteFromWatchlist}
        watchlistComponent={DeleteWatchlist}/>
      </div>
    </div>
  )
};

export default App;