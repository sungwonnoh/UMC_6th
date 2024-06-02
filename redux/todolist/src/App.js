import "./App.css";
import InputTodo from "./components/InputTodo";
import Todolist from "./components/Todolist";

function App() {
  return (
    <div className="App">
      <InputTodo />
      <Todolist />;
    </div>
  );
}

export default App;
