import React from "react";
import TodoLIstItem from "./TodoLIstItem";
import {Todo} from "../App";

interface TodoLIstProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onchangeSelectedTodo: (todo: Todo | null) => void;
  // 특정 항목에 대한 토글 버튼 이므로 딱히 뭘 받을 필요가 없음
  onInsertToggle: () => void;
}
const TodoList: React.FC<TodoLIstProps> = ({
  todos,
  onToggle,
  onDelete,
  onchangeSelectedTodo,
  onInsertToggle,
}) => {
  return (
    <ul>
      {/* odoLIstItem todo={todo}는 TodoLIstItem에서 type을 지정했음.  */}
      {todos.map((todo) => (
        <TodoLIstItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onchangeSelectedTodo={onchangeSelectedTodo}
          onInsertToggle={onInsertToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;
