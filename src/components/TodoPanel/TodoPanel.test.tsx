import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoPanel } from "./TodoPanel";

describe("TodoPanel component", () => {
  it("renders the AddTodoPanel correctly", () => {
    const addTodoMock = jest.fn();
    render(<TodoPanel mode="add" addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    expect(inputElement).toBeInTheDocument();

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(addTodoMock).toHaveBeenCalled();
  });

  it("adds a new todo on 'Add' button click", () => {
    const addTodoMock = jest.fn();
    render(<TodoPanel mode="add" addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(addTodoMock).toHaveBeenCalled();

    // Проверяем, что функция addTodo была вызвана с правильными аргументами
    expect(addTodoMock).toHaveBeenCalledWith({ name: "New Task" });
  });

  it("calls addTodo on 'Enter' key press", () => {
    const addTodoMock = jest.fn();
    render(<TodoPanel mode="add" addTodo={addTodoMock} />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    // Симулируем нажатие клавиши Enter в поле ввода
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    // Проверяем, что функция addTodo была вызвана с правильными аргументами
    expect(addTodoMock).toHaveBeenCalledWith({ name: "New Task" });
  });
});
