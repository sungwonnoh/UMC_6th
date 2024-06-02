import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { complete, remove } from "../redux/todoSlice";
import s from "./Todolist.module.css";

export default function Todolist() {
  const todolist = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const trash = <FontAwesomeIcon icon={faTrashCan} />;
  console.log(todolist);
  const todolistView = todolist.map((todo, idx) => (
    <li className={s.list} key={todolist[idx].id}>
      <input
        className={s.checkbox}
        type="checko=box"
        onChange={() => dispatch(complete(todolist[idx].id))}
      />
      <div className={s.todolist}>
        {todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}
      </div>
      <button
        className={s.deleteBtn}
        type="button"
        onClick={() => dispatch(remove(todolist[idx].id))}
      >
        {trash}
      </button>
    </li>
  ));
  return (
    <>
      <ul>{todolistView}</ul>
    </>
  );
}
