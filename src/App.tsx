import { ChangeEventHandler, FormEventHandler, useState } from "react";

const DUMMY_TODOS = [
  { id: 1, title: "Attend the Reac Course" },
  { id: 2, title: "Built a ToDo List" },
  { id: 3, title: "???" },
];

function App() {
  const [todos, setTodos] = useState(DUMMY_TODOS);
  const [inputValue, setInputValue] = useState("");

  const handlerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setTodos((prevTodos) => {
      const newTodo = {
        id: Math.floor(Math.random() * 1000) + 1,
        title: inputValue,
      };
      return [...prevTodos, newTodo];
    });
  };

  const handlerInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <main>
      <h1>Luis's ToDo List</h1>
      <form onSubmit={handlerSubmit}>
        <input type="text" value={inputValue} onChange={handlerInputChange} />
        <button type="submit">Submit</button>
      </form>
      <h2>My ToDos</h2>
      <ul className="list-inside list-disc">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
