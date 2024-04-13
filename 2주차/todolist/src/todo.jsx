import React, { useState } from "react";
import "./todo.css";

function TodoList() {
  const [inputText, setInputText] = useState(""); // 입력값 상태
  const [todoItems, setTodoItems] = useState([]); // 할 일 목록 상태
  const [doneItems, setDoneItems] = useState([]); // 완료된 일 목록 상태
  // 입력값 변경 핸들러
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  // 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    if (inputText.trim() !== "") {
      // 입력값이 공백이 아닌 경우에만 처리
      const newTodo = {
        id: Date.now(), //고유 id 생성
        text: inputText,
      };
      setTodoItems([...todoItems, newTodo]); // 새로운 할 일 항목 추가
      setInputText(""); // 입력값 초기화
    }
  };
  //완료 핸들러
  const handleDone = (id) => {
    const doneTodo = todoItems.find((todo) => todo.id === id);
    setDoneItems([...doneItems, doneTodo]); //해낸 일 목록에 추가
    setTodoItems(todoItems.filter((todo) => todo.id !== id));
  };

  const handleDelete = (id) => {
    setDoneItems(doneItems.filter((item) => item.id !== id));
  };
  return (
    <div className="wrapper">
      <h1>UMC Study Plan</h1>
      <div className="board">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="스터디 계획을 작성해보세요!"
            value={inputText}
            onChange={handleChange}
          />
        </form>
        <div className="list">
          <div className="todo">
            <h4>해야 할 일</h4>
            <div className="todolist">
              {todoItems.map((item) => (
                <div key={item.id} className="newitem">
                  {item.text}
                  <button onClick={() => handleDone(item.id)}>완료</button>
                </div>
              ))}
            </div>
          </div>
          <div className="done">
            <h4>해낸 일</h4>
            <div className="donelist">
              {doneItems.map((item) => (
                <div key={item.id} className="newitem">
                  {item.text}
                  <button onClick={() => handleDelete(item.id)}>삭제</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
