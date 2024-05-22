import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
const LoginInput = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 500px;
  height: 25px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Error = styled.div`
  color: red;
`;
const Button = styled.button`
  background-color: #007bff;
  color: white;
  width: 520px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  border: none;
  font-size: large;
  cursor: pointer;
`;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const confirmLogin = async (data) => {
    try {
      await axios.post("http://localhost:8080/auth/login", {
        username: data.id, // 사용자 아이디
        password: data.password, // 사용자 비밀번호
      });

      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("로그인에 실패했습니다.");
    }
  };
  const onSubmit = handleSubmit(confirmLogin);

  return (
    <Wrapper>
      <h2>로그인 페이지</h2>
      <LoginInput onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="아이디"
          {...register("id", {
            //required: true,
            required: "아이디를 입력해주세요",
          })}
        />
        {errors.id && <Error>{errors.id.message}</Error>}
        <Input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            //required: true,
            required: "비밀번호를 입력해주세요",
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Button type="submit">로그인</Button>
      </LoginInput>
    </Wrapper>
  );
}
