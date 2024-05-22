import { useEffect, useState } from "react";
import { getPopular } from "../api";
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

const Paginate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const handlePage = (page) => {
    setCurrentPage(page);
    getMovies(page);
  };

  const getMovies = async (page) => {
    const result = await getPopular(page);
    setMovies(result.results);
    setTotalPages(result.total_pages);
    setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

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
            {movies.length > 0 &&
              movies.map((movie) => (
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
          <Paginate>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton
                key={page}
                onClick={() => handlePage(page)}
                active={page === currentPage}
              >
                {page}
              </PaginationButton>
            ))}
          </Paginate>
        </div>
      )}
    </div>
  );
}
