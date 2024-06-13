import { ChangeEventHandler, FormEventHandler, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = (await response.json()) as Todo[];
    const slicedTodos = data.slice(0, 10);
    setTodos(slicedTodos);
  };

  const handlerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setTodos((prevTodos) => {
      const newTodo: Todo = {
        id: Math.floor(Math.random() * 1000) + 1,
        title: inputValue,
        completed: false,
        userId: 1,
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

  fetchTodos();

  return (
    <main className="flex w-full h-screen flex-col bg-green-700 p-2 gap-2">
      <h1 className="text-2xl font-semibold text-center">Luis's ToDo List</h1>
      <div className="rounded-md bg-green-500 h-screen">
        <div className="flex w-full items-center gap-4 p-2 bg-green-400 rounded-md ">
          <h2 className="text-xl font-medium whitespace-nowrap">My ToDos</h2>
          <form
            className="flex w-full items-center gap-2"
            onSubmit={handlerSubmit}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handlerInputChange}
              className="flex-grow rounded-md bg-green-300 p-1"
            />
            <button className="bg-green-700 rounded-md p-1" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="p-2 flex-grow h-full rounded-md ">
          <ul className="flex flex-col list-inside list-disc  gap-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="px-2 py-1 flex justify-between bg-green-900 rounded-md items-center "
              >
                <span>{todo.title}</span>
                <button
                  className="bg-[#e91e63] rounded-md p-1"
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
