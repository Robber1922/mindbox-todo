import { FC, useState } from "react";
import { TodoItem } from "./TodoItem/TodoItem";
import { Button } from "../Button/Button";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  checkTodo: (id: Todo["id"]) => void;
  deleteCompletedTodos: () => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  deleteCompletedTodos,
  checkTodo,
}) => {
  const [filter, setFilter] = useState("all"); // Добавляем состояние фильтрации

  // Функция для отображения дел в соответствии с выбранным фильтром
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed" && todo.checked) {
      return false;
    } else if (filter === "uncompleted" && !todo.checked) {
      return false;
    }
    return true;
  });

  // Подсчет задач которые осталось сделать
  const left = todos.reduce(
    (count, todo) => (todo.checked ? count : count + 1),
    0
  );

  return (
    <div>
      {filteredTodos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} checkTodo={checkTodo} />;
      })}
      <div className={styles.todo_list_container}>
        <span className={styles.todo_list_span}>{`${left}`} items left</span>
        {/* Добавляем кнопки для фильтрации */}
        <div>
          <Button onClick={() => setFilter("all")}>All</Button>
          <Button onClick={() => setFilter("completed")}>Active</Button>
          <Button onClick={() => setFilter("uncompleted")}>Completed</Button>
        </div>
        {/* Добавляем кнопку для удаления выполненных дел */}
        <Button color="red" onClick={deleteCompletedTodos}>
          Clear Completed
        </Button>
      </div>
    </div>
  );
};
