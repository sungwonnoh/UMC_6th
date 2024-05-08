import styled from "styled-components";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginInput = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 500px;
  height: 25px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 15px;
  margin: 20px;
`;

export function Login() {
  return (
    <Wrapper>
      <h2>로그인 페이지</h2>
      <LoginInput>
        <Input placeholder="아이디"></Input>
        <Input placeholder="비밀번호"></Input>
        <button>로그인</button>
      </LoginInput>
    </Wrapper>
  );
}
