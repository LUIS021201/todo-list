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
    setInputValue("");
  };

  const handlerInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  const handlerDelete = (idDeleted: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== idDeleted);
    });
  };

  return (
    <main className="flex w-full h-screen flex-col bg-green-500 p-2 gap-2">
      <h1 className="text-2xl font-semibold text-center">Luis's ToDo List</h1>
      <div className="rounded-md bg-green-700 h-screen">
        <div className="flex w-full items-center gap-4 p-2">
          <h2 className="text-xl font-medium whitespace-nowrap">My ToDos</h2>
          <form
            className="flex w-full items-center gap-2"
            onSubmit={handlerSubmit}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handlerInputChange}
              className="flex-grow"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="p-2 flex-grow h-full rounded-md">
          <ul className="list-inside list-disc">
            {todos.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
                <button
                  className="bg-[#e91e63]"
                  onClick={() => {
                    handlerDelete(todo.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
