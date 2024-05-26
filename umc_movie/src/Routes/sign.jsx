import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const H2 = styled.h2`
  display: flex;
  align-items: center;
  text-align: center;
`;
const InputGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  width: 500px;
  height: 25px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 15px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  width: 520px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  font-size: large;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  position: absolute;
`;
const Question = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-around;
`;
const Already = styled.div`
  padding-right: 5px;
`;
const MoveLogin = styled.div`
  font-weight: bold;
  cursor: pointer;
  margin-left: 20px;
`;

export function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const confirmSignup = async (data) => {
    try {
      await axios.post("http://localhost:8080/auth/signup", {
        name: data.name,
        email: data.email,
        age: data.age,
        username: data.username,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });
      alert("회원가입에 성공했습니다!");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };
  const onSubmit = handleSubmit(confirmSignup);

  return (
    <FormWrapper>
      <H2>회원가입 페이지</H2>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <Input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            {...register("name", {
              required: "이름을 입력하세요.",
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            {...register("username", {
              required: { value: true, message: "아이디를 입력하세요." },
            })}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "아이디를 입력하세요.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="number"
            name="age"
            placeholder="나이를 입력해주세요"
            {...register("age", {
              required: "나이를 입력하세요.",
              min: { value: 1, message: "나이는 양수여야합니다." },
              validate: {
                isAdult: (value) =>
                  value >= 19 || "19세 이상만 사용 가능합니다.",
              },
            })}
          />
          {errors.age && <Error>{errors.age.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 4,
                message: "비밀번호는 최소 4자리 이상이여야 합니다.",
              },
              maxLength: {
                value: 12,
                message: "비밀번호는 최대 12자리까지 가능합니다.",
              },
              pattern: {
                value:
                  !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\[\]\/\\])/g,
                message: "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            {...register("passwordCheck", {
              required: "비밀번호를 다시 입력해주세요.",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordCheck && (
            <Error>{errors.passwordCheck.message}</Error>
          )}
        </InputGroup>
        <Button type="submit">Sign Up</Button>
        <Question>
          <Already>이미 아이디가 있으신가요?</Already>
          <MoveLogin onClick={() => navigate("/login")}>
            로그인 페이지로 이동하기
          </MoveLogin>
        </Question>
      </form>
    </FormWrapper>
  );
}
