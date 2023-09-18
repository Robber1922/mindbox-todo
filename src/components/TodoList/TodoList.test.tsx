import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

// Mock данных для тестов
const mockTodos = [
  { id: 1, name: "Task 1", checked: false },
  { id: 2, name: "Task 2", checked: true },
];

const mockCheckTodo = jest.fn();
const mockDeleteCompletedTodos = jest.fn();

describe("TodoList component", () => {
  it("renders the list of todos", () => {
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={mockCheckTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Проверяем, что все задачи отображаются на экране
    const task1 = screen.getByText("Task 1");
    const task2 = screen.getByText("Task 2");

    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
  });

  it("allows checking a todo", () => {
    const checkTodo = jest.fn();
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={checkTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Находим чекбокс задачи
    const checkbox = screen.getByRole("checkbox", { name: "Task 1" });

    // Симулируем клик на чекбоксе
    fireEvent.click(checkbox);

    // Проверяем, что функция checkTodo была вызвана с правильными аргументами
    expect(checkTodo).toHaveBeenCalledWith(1);
  });

  it("filters todos based on active filter option", () => {
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={mockCheckTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Находим кнопки для фильтрации
    const activeButton = screen.getByText("Active");

    // Симулируем клики на кнопках
    fireEvent.click(activeButton);

    // Проверяем, что только активные задачи отображаются
    const task1 = screen.getByText("Task 1");
    const task2 = screen.queryByText("Task 2");

    expect(task1).toBeInTheDocument();
    expect(task2).toBeNull();
  });

  it("filters completed todos based on completed filter option", () => {
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={mockCheckTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Находим кнопку "Completed" и кликаем на нее
    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    // Проверяем, что только завершенные задачи отображаются
    const completedTask = screen.getByText("Task 2");
    const activeTask = screen.queryByText("Task 1");

    expect(completedTask).toBeInTheDocument();
    expect(activeTask).toBeNull();
  });

  it("displays the count of remaining todos", () => {
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={mockCheckTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Проверяем, что количество оставшихся задач отображается правильно
    const countSpan = screen.getByText("1 items left");
    expect(countSpan).toBeInTheDocument();
  });

  it("clears completed todos when 'Clear Completed' button is clicked", () => {
    render(
      <TodoList
        todos={mockTodos}
        checkTodo={mockCheckTodo}
        deleteCompletedTodos={mockDeleteCompletedTodos}
      />
    );

    // Находим кнопку "Clear Completed" и кликаем на нее
    const clearCompletedButton = screen.getByText("Clear Completed");
    fireEvent.click(clearCompletedButton);

    // Проверяем, что функция deleteCompletedTodos была вызвана
    expect(mockDeleteCompletedTodos).toHaveBeenCalled();
  });
});
