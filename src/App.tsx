import { useState } from "react";
import { Header, TodoPanel, TodoList } from "./components";
import styles from "./App.module.css";

const DEFAULT_TODO_LIST = [
  { id: 1, name: "Тестовое задание", checked: false },
  { id: 2, name: "Прекрасный код", checked: false },
  { id: 3, name: "Покрытие тестами", checked: true },
];

export const App = () => {
  const [todos, setTodos] = useState(DEFAULT_TODO_LIST);

  const addTodo = ({ name }: Omit<Todo, "id" | "checked">) => {
    setTodos([
      ...todos,
      { id: todos[todos.length - 1].id + 1, name, checked: false },
    ]);
  };

  const deleteCompletedTodos = () => {
    const completedTodoIds = todos
      .filter((todo) => todo.checked)
      .map((todo) => todo.id);

    const updatedTodos = todos.filter(
      (todo) => !completedTodoIds.includes(todo.id)
    );

    setTodos(updatedTodos);
  };

  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header />
        <TodoPanel mode="add" addTodo={addTodo} />
        <TodoList
          todos={todos}
          checkTodo={checkTodo}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      </div>
    </div>
  );
};

export default App;
