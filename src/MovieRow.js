import React from "react";
import "./movierow.css";
import imageBlak from "./img/blank_splash.png";

class MovieRow extends React.Component {
    constructor(props) {
        super(props);

        this.url_path = "https://image.tmdb.org/t/p/w185/";
    }

    viewMovie() {
        console.log("Trying to view movie");
        const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
        window.location.href = url;
    }
    render() {
        return (
            <div className="Movie Movie--hover">
                <img
                    src={
                        this.props.movie.poster_src
                            ? this.props.movie.poster_src
                            : imageBlak
                    }
                    alt="ImageMovie"
                    width="130"
                />
                <div className="Movie__info">
                    <h3 className="Movie__info__title">
                        {this.props.movie.title}
                    </h3>
                    <p className="Movie__info__overview">
                        {this.props.movie.overview}
                    </p>
                    <input
                        className="Movie__info__button"
                        type="button"
                        value="Ver"
                        onClick={this.viewMovie.bind(this)}
                        formTarget="_blank"
                    />
                </div>
            </div>
        );
    }
}

export default MovieRow;
