import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearch } from "../api";
import { useNavigate } from "react-router-dom";
import useDebounce from "../components/Debounce";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 50px;
`;

const Banner = styled.div`
  background-color: black;
  height: 50vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  padding: 20px;
`;

const Findmovie = styled.div`
  background-color: beige;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
`;
const Search = styled.div`
  display: flex;
  padding: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 3px;
`;

const Btn = styled.button`
  background-color: yellow;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: none;
  margin-top: 10px;
  margin-left: 20px;
  cursor: pointer;
`;

const SearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
  overflow-y: scroll;
`;
const List = styled.div`
  width: 300px;
  height: 400px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Poster = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Name = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
`;
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const debounced = useDebounce(searchTerm, 200);

  const getMovies = async () => {
    setIsLoading(true); //검색 시작
    const result = await getSearch(searchTerm);
    const moviesData = result.results; // results에서 데이터 추출
    setMovies(moviesData);
    setIsLoading(false); //검색 종료
  };

  useEffect(() => {
    // searchTerm이 변경될 때마다 getMovies 호출
    if (searchTerm !== "") {
      getMovies();
    }
  }, [searchTerm]);

  const goToDetailPage = (id) => {
    navigate(`/movies/${id}`);
  };
  return (
    <Wrapper>
      <Banner>{localStorage.getItem("username")}환영합니다</Banner>
      <Findmovie>
        <div>🎥Find Your Moives !</div>
        <Search>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} //onChange사용하면 검색어 입력시 상태 업데이트
          />
          <Btn onClick={getMovies}>🔍</Btn>
        </Search>
      </Findmovie>
      <div>
        {isLoading ? (
          <LoadingMessage>로딩중...</LoadingMessage>
        ) : (
          <SearchList target={debounced}>
            {movies.map((movie) => (
              <List key={movie.id} onClick={() => goToDetailPage(movie.id)}>
                {movie.poster_path && (
                  <Poster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                )}
                <Name>
                  <div>{movie.title}</div>
                  <div>⭐{movie.vote_average}</div>
                </Name>
              </List>
            ))}
          </SearchList>
        )}
      </div>
    </Wrapper>
  );
}
