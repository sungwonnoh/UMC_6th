import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: cadetblue;
  position: absolute;
  top: 50%; /* 상단에서 절반의 위치로 이동 */
  left: 50%; /* 왼쪽에서 절반의 위치로 이동 */
  transform: translate(-50%, -50%); /* 중앙으로 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 30px;
`;
const Error = styled.div`
  font-size: larger;
`;
const Error1 = styled.div`
  font-size: smaller;
`;
const Gotomain = styled.div`
  background-color: grey;
  font: bold;
  margin: 20px;
  padding: 10px;
`;
export default function Notfound() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <h4>Oops</h4>
      <Error>예상치 못한 에러가 발생했습니다</Error>
      <Error1>NOT FOUND</Error1>
      <Gotomain>
        <span onClick={onClick}>메인으로 이동</span>
      </Gotomain>
    </Wrapper>
  );
}
