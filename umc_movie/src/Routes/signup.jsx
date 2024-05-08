import React, { useState } from "react";
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
  font: bold;
`;
export function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 입력 필드 값이 변경될 때마다 유효성 검사
    switch (name) {
      case "name":
        setNameError(value === "" ? "이름을 입력하세요." : "");
        break;
      case "email":
        setEmailError(
          value === ""
            ? "이메일을 입력하세요."
            : !/\S+@\S+\.\S+/.test(value)
            ? "올바른 이메일 형식이 아닙니다."
            : ""
        );
        break;
      case "age":
        setAgeError(
          value === "" || isNaN(value)
            ? "나이를 숫자로 입력하세요."
            : value < 0
            ? "나이는 양수여야합니다."
            : value > 0 && value < 19
            ? "19세 이상만 가입 가능 합니다."
            : ""
        );
        break;
      case "password":
        setPasswordError(
          value === ""
            ? "비밀번호를 입력하세요."
            : value.length < 4
            ? "비밀번호는 최소 4자리 이상이어야 합니다."
            : value.length > 12
            ? "비밀번호는 최대 12자리까지 가능합니다."
            : !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\[\]\/\\])/.test(
                value
              )
            ? "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다."
            : ""
        );
        break;
      case "confirmPassword":
        setConfirmPasswordError(
          value === ""
            ? "비밀번호를 다시 입력해주세요."
            : value !== formData.password
            ? "비밀번호가 일치하지 않습니다."
            : ""
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    // 각 입력 필드의 값 검사
    if (formData.name === "") {
      setNameError("이름을 입력하세요.");
      isError = true;
    } else {
      setNameError("");
    }

    if (formData.email === "") {
      setEmailError("이메일을 입력하세요.");
      isError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      isError = true;
    } else {
      setEmailError("");
    }

    if (formData.age === "" || isNaN(formData.age)) {
      setAgeError("나이를 숫자로 입력하세요.");
      isError = true;
    } else if (formData.age < 0) {
      setAgeError("나이는 양수여야합니다.");
      isError = true;
    } else if (formData.age < 19 && formData.age > 0) {
      setAgeError("19세 이상만 사용 가능합니다.");
      isError = true;
    } else {
      setAgeError("");
    }

    if (formData.password === "") {
      setPasswordError("비밀번호를 입력하세요.");
      isError = true;
    } else if (formData.password.length < 4) {
      setPasswordError("비밀번호는 최소 4자리 이상이여야 합니다.");
      isError = true;
    } else if (formData.password.length > 12) {
      setPasswordError("비밀번호는 최대 12자리까지 가능합니다.");
      isError = true;
    } else if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\[\]\/\\])/g.test(
        formData.password
      )
    ) {
      setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
      isError = true;
    } else {
      setPasswordError("");
    }

    if (formData.confirmPassword === "") {
      setConfirmPasswordError("비밀번호를 다시 입력해주세요.");
      isError = true;
    } else {
      setConfirmPasswordError("");
    }

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isError = true;
    }

    // 오류가 없을 경우 폼 제출
    if (!isError) {
      console.log("폼 데이터:", formData);
      alert("회원가입에 성공했습니다!");
      navigate("/login");
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <H2>회원가입 페이지</H2>
        <InputGroup>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력해주세요"
          />
          {nameError && <Error>{nameError}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          {emailError && <Error>{emailError}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="나이를 입력해주세요"
          />
          {ageError && <Error>{ageError}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          {passwordError && <Error>{passwordError}</Error>}
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
          {confirmPasswordError && <Error>{confirmPasswordError}</Error>}
        </InputGroup>
        <Button onClick={handleSubmit}>Sign Up</Button>
        <Question>
          <Already>이미 아이디가 있으신가요?</Already>
          <MoveLogin>로그인 페이지로 이동하기</MoveLogin>
        </Question>
      </form>
    </FormWrapper>
  );
}
