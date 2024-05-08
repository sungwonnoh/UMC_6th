import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearch } from "../api";

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
  align-items: center;
  justify-content: center;
  font-size: 2rem;
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
  width: 200px;
  height: 30px;
  padding: 5px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 3px;
`;

const Btn = styled.button`
  background-color: yellow;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  margin-left: 20px;
`;

const SearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 20px;
  overflow-y: scroll;
`;
const List = styled.div`
  width: 250px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Poster = styled.img`
  width: 200px;
  height: 180px;
`;
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async () => {
    const result = await getSearch(searchTerm);
    const moviesData = result.results; // results에서 데이터 추출
    setMovies(moviesData);
  };

  useEffect(() => {
    getMovies();
  }, [searchTerm]);

  return (
    <Wrapper>
      <Banner>환영합니다</Banner>
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
      <SearchList>
        {movies.map((movie) => (
          <List key={movie.id}>
            {movie.poster_path && (
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            )}
            <div>Title: {movie.title}</div>
            <div>Rating: {movie.vote_average}</div>
          </List>
        ))}
      </SearchList>
    </Wrapper>
  );
}
