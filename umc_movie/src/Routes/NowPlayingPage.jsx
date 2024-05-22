import { useEffect, useState } from "react";
import { getNow } from "../api";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
`;

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const getMovies = async () => {
    const result = await getNow(page);
    setMovies((prevMovies) => [...prevMovies, ...result]);
    setIsLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const goToDetailPage = (id) => {
    navigate(`/movies/${id}`);
  };

  const loadFunc = () => {
    getMovies();
  };

  return (
    <div>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true}
          loader={
            <div className="loader" key={0}>
              <Loading loading={isLoading} />
            </div>
          }
        >
          <Container>
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                overview={movie.overview}
                average={movie.vote_average}
                onClick={() => goToDetailPage(movie.id)}
              />
            ))}
          </Container>
        </InfiniteScroll>
      )}
    </div>
  );
}
