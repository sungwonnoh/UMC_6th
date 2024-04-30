import { useEffect, useState } from "react";
import { getPopular } from "../api";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  /*setTimeout(() => {
    setLoading(false);
  }, 5000);
*/
  const getMovies = async () => {
    const result = await getPopular();
    setMovies(result);
    setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
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
          <div>
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
          </div>
        </div>
      )}
    </div>
  );
}
