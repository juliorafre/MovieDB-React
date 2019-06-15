import React from "react";
import "./App.css";
import MovieRow from "./MovieRow";
import $ from "jquery";

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.API_URL = "https://api.themoviedb.org/3/search/movie?query=name&api_key=7dce56cfa0c066c31e843251accd68a8".trim();
        this.state = {};
        console.log("This is my inicializer");

        /* const movies = [
            {
                id: 0,
                poster_source:
                    "http://t3.gstatic.com/images?q=tbn:ANd9GcSOV0JVW82VnxHBgHu1syHyD_cTSYAgLr76gw9ejI4cmySydjmw",
                title: "avengers, Infinity Wars",
                overview:
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam odit molestiae soluta minus necessitatibus, blanditiis laboriosam ea eos ullam ipsa qui iste nihil autem! Perferendis quo quaerat aperiam aliquid nisi!"
            },
            {
                id: 2,
                poster_source:
                    "http://t3.gstatic.com/images?q=tbn:ANd9GcSOV0JVW82VnxHBgHu1syHyD_cTSYAgLr76gw9ejI4cmySydjmw",
                title: "avengers2",
                overview:
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam odit molestiae soluta minus necessitatibus, blanditiis laboriosam ea eos ullam ipsa qui iste nihil autem! Perferendis quo quaerat aperiam aliquid nisi!"
            }
        ];

        var movieRows = [];

        movies.forEach(movie => {
            console.log(movie.id);
            const movieRow = <MovieRow key={movie.id} movie={movie} />;

            movieRows.push(movieRow);
        });

        this.state = { rows: movieRows }; */

        this.performSearch("Star Wars");
    }

    performSearch(searchTerm) {
        console.log("Perform search using moviedb");
        const urlString =
            "https://api.themoviedb.org/3/search/movie?&api_key=7dce56cfa0c066c31e843251accd68a8&query=" +
            searchTerm;
        $.ajax({
            url: urlString,
            success: searchResults => {
                console.log("Fetched data successfully");
                //console.log(searchResults);
                const results = searchResults.results;
                //console.log(results[0]);

                var movieRows = [];

                results.forEach(movie => {
                    if (movie.poster_path) {
                        movie.poster_src =
                            "https://image.tmdb.org/t/p/w185/" +
                            movie.poster_path;
                    } else {
                        movie.poster_src = movie.poster_path;
                    }

                    //console.log(movie.poster_src);
                    const movieRow = <MovieRow key={movie.id} movie={movie} />;
                    movieRows.push(movieRow);
                });

                this.setState({ rows: movieRows });
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data");
            }
        });
    }

    searchChangeHanlder(event) {
        console.log(event.target.value);
        const boundObjects = this;
        const searchTerm = event.target.value;
        boundObjects.performSearch(searchTerm);
    }

    render() {
        return (
            <div className="App">
                <table className="titleBar">
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    alt="AppIcon"
                                    width="50"
                                    src="green_app_icon.svg"
                                />
                            </td>
                            <td width="8" />
                            <td>
                                <h1>MoviesDB Search</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <input
                    type="text"
                    onChange={this.searchChangeHanlder.bind(this)}
                    placeholder="Enter search term"
                    style={{
                        fontSize: 24,
                        display: "block",
                        width: "100%",
                        margin: "auto",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 16
                    }}
                />

                {this.state.rows}
            </div>
        );
    }
}

export default App;
