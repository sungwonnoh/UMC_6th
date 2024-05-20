import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data, errors);
    alert("로그인 성공");
  };
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
