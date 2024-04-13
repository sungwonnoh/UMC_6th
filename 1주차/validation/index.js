const form = document.querySelector("form");
const modal = document.querySelector(".modal-wrapper");
const button = document.querySelector("button");
let validation = [0, 0, 0, 0, 0];

const error = [
  document.querySelector(".error.name"),
  document.querySelector(".error.email"),
  document.querySelector(".error.age"),
  document.querySelector(".error.password"),
  document.querySelector(".error.checkpw"),
];
const conform = [
  document.querySelector(".conform.name"),
  document.querySelector(".conform.email"),
  document.querySelector(".conform.age"),
  document.querySelector(".conform.password"),
  document.querySelector(".conform.checkpw"),
];

// 입력 필드의 유효성을 검사하는 함수
function validateInput() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const ageInput = document.getElementById("age").value;
  const pwInput = document.getElementById("pw").value;
  const checkpw = document.getElementById("checkpw").value;

  let check = true; //느려질 수 있음

  // 이름 확인
  if (nameInput === "") {
    error[0].style.display = "flex";
    conform[0].style.display = "none";
    check = false;
  } else {
    error[0].style.display = "none";
    conform[0].style.display = "flex";
    validation[0] = 1;
  }

  // 이메일 확인
  if (!emailInput.includes("@") && !emailInput.includes(".")) {
    error[1].style.display = "flex";
    conform[1].style.display = "none";
    check = false;
  } else {
    error[1].style.display = "none";
    conform[1].style.display = "flex";
    validation[1] = 1;
  }

  // 나이 확인
  if (ageInput === "") {
    error[2].textContent = "나이를 입력해주세요!";
    error[2].style.display = "flex";
    conform[2].style.display = "none";
    check = false;
  } else if (isNaN(ageInput)) {
    error[2].textContent = "나이는 숫자 형식이어야 합니다!";
    error[2].style.display = "flex";
    conform[2].style.display = "none";
    check = false;
  } else if (ageInput % 1 !== 0) {
    error[2].textContent = "나이는 정수 형식이어야 합니다!";
    error[2].style.display = "flex";
    conform[2].style.display = "none";
    check = false;
  } else if (ageInput < 19) {
    error[2].textContent = "19세 미만은 가입이 불가능합니다!";
    error[2].style.display = "flex";
    conform[2].style.display = "none";
    check = false;
  } else {
    error[2].style.display = "none";
    conform[2].style.display = "flex";
    validation[2] = 1;
  }

  // 비밀번호 확인
  if (pwInput === "" || pwInput.length < 4) {
    error[3].style.display = "flex";
    conform[3].style.display = "none";
    check = false;
  } else if (pwInput.length > 12) {
    error[3].textContent = "비밀번호는 최대 12자리까지 가능합니다.";
    error[3].style.display = "flex";
    conform[3].style.display = "none";
    check = false;
  } else if (
    !/[a-zA-Z]/.test(pwInput) ||
    !/\d/.test(pwInput) ||
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwInput)
  ) {
    error[3].textContent =
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
    error[3].style.display = "flex";
    conform[3].style.display = "none";
    check = false;
  } else {
    error[3].style.display = "none";
    conform[3].style.display = "flex";
    validation[3] = 1;
  }

  // 비밀번호 확인 검사
  if (pwInput === checkpw && pwInput !== "" && checkpw !== "") {
    error[4].style.display = "none";
    conform[4].style.display = "flex";
    validation[4] = 1;
  } else {
    error[4].style.display = "flex";
    conform[4].style.display = "none";
    check = false;
  }
  if (validation.reduce((a, b) => a + b, 0) == 5) {
    modal.style.display = "flex";
  }
}

// 입력 필드의 유효성을 실시간으로 확인하는 이벤트 추가
document.querySelectorAll("input").forEach((inputField) => {
  inputField.addEventListener("input", validateInput);
});

function onLoginSubmit(event) {
  event.preventDefault(); // 폼 제출 기본 동작 방지
}

const open = document.getElementById("enter");
const close = document.getElementById("close");

close.onclick = () => {
  modal.style.display = "none"; // 모달 창을 숨김
};

open.onclick = () => {
  if (validateInput()) {
    modal.style.display = "flex"; // 모달 창을 나타냄
  } else {
    modal.style.display = "none"; // 모달 창을 숨김
  }
};

form.addEventListener("submit", onLoginSubmit);
