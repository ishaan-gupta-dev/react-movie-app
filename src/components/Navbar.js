import React from "react";
import { connect, StoreContext } from "..";
import { addMovies, addMovieToList, handleMovieSearch } from "../actions";
import { movies } from "../reducers";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    };

    handleSearch = () => {
        const { searchText } = this.state;
        this.props.dispatch(handleMovieSearch(searchText));
    };

    render() {
        const { result, showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input placeholder="Search Movie" onChange={this.handleChange} />
                    <button id="search-btn" onClick={this.handleSearch}> Search </button>

                    {showSearchResults && (
                        <div className="search-results">
                            <div className="search-result">
                                <img src={result.Poster} alt="search-pic" />
                                <div className="movie-info">
                                    <span>{result.title}</span>
                                    <button onClick={() => this.handleAddToMovies(result)}> Add to Movies </button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>

        );
    }
}

/*
class NavbarWrapper extends React.Component {
    render() {
        return (
            <StoreContext.Consumer>
                {(store) => (
                    <Navbar dispatch={store.dispatch} search={this.props.search} />
                )}
            </StoreContext.Consumer>
        )
    }
}

export default NavbarWrapper;
*/

function mapStateToProps({ search }) {
    return {
        search
    }
}

export default connect(mapStateToProps)(Navbar);
