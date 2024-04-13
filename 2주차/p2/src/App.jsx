import { useState } from "react";
import Modal from "./components/Modal.jsx";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true); //모달 열기
  };
  const closeModal = () => {
    setIsOpen(false); //모달 닫기
  };
  return (
    <div>
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>
      <button className="open" onClick={openModal}>
        버튼 열기
      </button>
      {isOpen && <Modal closeModal={closeModal}></Modal>}
    </div>
  );
}

export default App;
