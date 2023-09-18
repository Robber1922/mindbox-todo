import { FC, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./TodoPanel.module.css";

const DEFAULT_TODO = { name: "" };

interface AddTodoPanelProps {
  mode: "add";
  addTodo: ({ name }: Omit<Todo, "id" | "checked">) => void;
}

interface EditTodoPanelProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
  changeTodo: ({ name }: Omit<Todo, "id" | "checked">) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === "edit";
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onClick = () => {
    if (isEdit) {
      return props.changeTodo(todo);
    }
    props.addTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick(); // Вызываем функцию добавления задачи при нажатии Enter
    }
  };

  return (
    <>
      <div className={styles.todo_panel_container}>
        <div className={styles.field_container}>
          <label>
            <KeyboardArrowDownIcon color="disabled" />
            <input
              autoComplete="off"
              id="name"
              value={todo.name}
              onChange={onChange}
              onKeyDown={onKeyDown}
              name="name"
              placeholder="What needs to be done?"
            />
          </label>
        </div>
      </div>
    </>
  );
};
