import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  position: fixed;
  z-index: 10;
  width: 100vw;
  top: 0;
  flex-direction: row; //왼쪽에서 오른쪽
  justify-content: space-around; //가로정렬, 동일 간격
  background-color: rgb(0, 0, 0, 0.8);
  align-items: center;
  font-size: 20px;
  height: 50px;
  color: white;
`;
const NavContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const Navitem = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // 로그인 상태이면 로그아웃 처리
      setIsLoggedIn(false);
    } else {
      // 로그아웃 상태이면 로그인 처리
      setIsLoggedIn(true);
    }
  };
  const onClick = (r) => {
    if (r === " ") {
      handleAuthClick(); // 로그인 또는 로그아웃 버튼 클릭 시 호출
    } else {
      navigate(`/${r}`);
    }
  };
  return (
    <Wrapper>
      <span onClick={() => onClick("home")}>UMC Movie</span>
      <NavContainer>
        <Navitem onClick={() => onClick(" ")}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </Navitem>
        <Navitem onClick={() => onClick("popular")}>Popular</Navitem>
        <Navitem onClick={() => onClick("now")}>Now Playing</Navitem>
        <Navitem onClick={() => onClick("top")}>Top Rated</Navitem>
        <Navitem onClick={() => onClick("upcoming")}>Upcoming</Navitem>
      </NavContainer>
    </Wrapper>
  );
}
