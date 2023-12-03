import Navbar from './Navbar'
import MovieCard from './MovieCard'
import React from 'react';
import { data } from '../data'
import { addMovies, setShowFavourites } from '../actions';
import { StoreContext } from '../index'
import { connect } from '../index';
class App extends React.Component {

  componentDidMount() {
    // make api call
    // dispatch action
    /* 
    const { store } = this.props;
    store.subscribe(() => {
      console.log("Updated");
      this.forceUpdate(); // should not be used ideally
    }) 
    */
    this.props.dispatch(addMovies(data));

    //console.log('State in App,js', store.getState())
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies;
    const index = favourites.indexOf(movie);

    if (index === -1) {
      return false;
    }
    return true;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }

  render() {
    const { movies, search } = this.props;
    const { list, favourites = [], showFavourites = [] } = movies;
    //console.log("Render of App component", this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App" >
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? "" : "active-tabs"}`} onClick={() => this.onChangeTab(false)}>
              Movies
            </div>
            <div className={`tab ${showFavourites ? "active-tabs" : ""}`} onClick={() => this.onChangeTab(true)}>
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard movie={movie} key={`movies-${index}`} dispatch={this.props.dispatch} isFavourite={this.isMovieFavourite(movie)} />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className='no-movies'>
              No Movies to display!
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

/* 
class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

export default AppWrapper; 
*/

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;


