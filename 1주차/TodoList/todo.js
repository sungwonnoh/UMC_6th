const form = document.querySelector(".form");
const todolist = document.querySelector(".todolist");
const donelist = document.querySelector(".done");

document.addEventListener("DOMContentLoaded", function () {
  // 엔터 키를 눌렀을 때 할 일 추가
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 제출 이벤트 방지
    const todoInput = form.querySelector("input");
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodo(todoText);
      todoInput.value = ""; // 입력창 비우기
    }
  });

  // 할 일을 리스트에 추가하는 함수
  function addTodo(text) {
    const todoItem = document.createElement("div");
    todoItem.textContent = text;
    todoItem.classList.add("newitem");

    // 완료 버튼 추가
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.classList.add("button");
    completeBtn.addEventListener("click", function () {
      moveItem(todoItem);
    });

    todoItem.appendChild(completeBtn);
    todolist.appendChild(todoItem);
  }

  // 할 일 아이템을 완료 목록으로 이동하고 삭제하는 함수
  function moveItem(todoItem) {
    todolist.removeChild(todoItem); // 할일 목록에서 삭제
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("button");
    deleteBtn.addEventListener("click", function () {
      donelist.removeChild(todoItem);
    });

    // 완료 버튼 제거
    const completeBtn = todoItem.querySelector(".button");
    todoItem.removeChild(completeBtn);

    todoItem.appendChild(deleteBtn);
    donelist.appendChild(todoItem); // 완료 목록에 추가
  }
});
