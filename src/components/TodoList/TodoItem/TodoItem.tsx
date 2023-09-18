import { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  checkTodo: (id: Todo["id"]) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, checkTodo }) => {
  return (
    <div className={styles.todo_item_container}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              icon={<RadioButtonUncheckedIcon color="disabled" />}
              checkedIcon={<CheckCircleOutlineIcon color="success" />}
              checked={todo.checked ? true : false}
              onClick={() => checkTodo(todo.id)}
            />
          }
          label={
            <span
              style={{
                opacity: todo.checked ? 0.5 : 1,
                textDecoration: todo.checked ? "line-through" : "none",
              }}
              className={styles.todo_item_title}
            >
              {todo.name}
            </span>
          }
        />
      </div>
    </div>
  );
};
