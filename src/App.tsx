/** @format */

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
type Todo = {
  id: string;
  title: string;
  date : string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const storedTodos = JSON.parse(
      window.localStorage.getItem("todos") || "[]"
    );
    setTodos(storedTodos);
  }, []);

  function handleAddTodo(title: string) {
    const newTodo = {
      id: Math.random().toString(),
      title: title,
      date: new Date().toLocaleString(),
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }
  function handleDeleteTodo(todoId: string) {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const router = createBrowserRouter([
    {
      index: true,
      element: <NewTodo onAddTodo={handleAddTodo} />,
    },
    {
      path: "/todos",
      element: <TodoList items={todos} onDeleteTodo={handleDeleteTodo} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
