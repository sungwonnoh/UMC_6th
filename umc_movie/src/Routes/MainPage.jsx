import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

const Input = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 3px;
`;

export default function Home() {
  return (
    <Wrapper>
      <Banner>환영합니다</Banner>
      <Findmovie>
        <div>🎥Find Your Moives !</div>
        <Input type="text" />
      </Findmovie>
    </Wrapper>
  );
}
