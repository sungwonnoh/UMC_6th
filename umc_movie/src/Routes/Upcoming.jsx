import { useEffect, useState } from "react";
import { getUpcoming } from "../api";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
`;
export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getMovies = async () => {
    const result = await getUpcoming();
    setMovies(result);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  const goToDetailPage = (id) => {
    navigate(`/movies/${id}`);
  };
  return (
    <div>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
}
