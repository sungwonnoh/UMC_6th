function Modal({ closeModal }) {
  return (
    <div className="open-wrapper">
      <div className="modal">
        <h1>안녕하세요</h1>
        <p>모달 내용은 어쩌고 저쩌고...</p>
        <div className="close-wrapper">
          <button className="close" onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
