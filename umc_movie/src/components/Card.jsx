import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;

  justify-content: space-around;
  padding-top: 50px;
`;

const StyledBox = styled.div`
  width: 300px;
  height: 500px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid black;
  position: relative;
  color: black;
`;

const Poster = styled.img`
  width: 250px;
  height: 400px;
`;

const Box1 = styled.div`
  width: 250px;
  height: 400px;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
`;

export default function Card(props) {
  const [isVisible, setIsvisible] = useState(false);

  const whileHover = () => {
    setIsvisible(true);
  };

  const whileLeave = () => {
    setIsvisible(false);
  };

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  return (
    <Container>
      <StyledBox
        key={props.id}
        onMouseLeave={whileLeave}
        onMouseOver={whileHover}
        onClick={handleClick}
      >
        {isVisible ? (
          <Box1>
            <div>{props.overview}</div>
          </Box1>
        ) : null}
        <Poster src={`https://image.tmdb.org/t/p/w200/${props.poster}`} />
        <h4>{props.title}</h4>
        <div>⭐{props.average}</div>
      </StyledBox>
    </Container>
  );
}
