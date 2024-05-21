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
export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageList = [];
  const totalPages = Math.ceil();
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }
  //
  /*setTimeout(() => {
    setLoading(false);
  }, 5000);
*/
  const handlePage = (page) => {
    setCurrentPage(page);
    getMovies(page);
  };
  const getMovies = async (page) => {
    const result = await getPopular(page);
    setMovies(result);
    setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]); //배열이 비어있으니까 한번만 실행
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
      <Paginate>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
          <button onClick={() => handlePage(page)}>{page}</button>
        ))}
      </Paginate>
    </div>
  );
}
