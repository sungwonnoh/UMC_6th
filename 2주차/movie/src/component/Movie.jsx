import { useState } from "react";
import { movies } from "../api";
import "../movie.css";
function Movie() {
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태

  const onMouseEnter = (movie) => {
    setSelectedMovie(movie); // 마우스를 올린 영화 설정
  };

  const onMouseLeave = () => {
    setSelectedMovie(null); // 마우스를 영화 밖으로 이동했을 때 선택된 영화 초기화
  };

  return (
    <div className="wrapper">
      <div className="movie">
        {movies.results.map((movie, i) => (
          <div
            key={i}
            className="movie-item"
            onMouseEnter={() => onMouseEnter(movie)}
            onMouseLeave={onMouseLeave}
          >
            <div>
              {selectedMovie === movie ? (
                <div className="modal">{movie.overview}</div>
              ) : null}
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </div>
            <div className="movie-info">
              <div>{movie.original_title}</div>
              <div>{movie.vote_average}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;
