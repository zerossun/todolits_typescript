import React from "react";
import TodoLIstItem from "./TodoLIstItem";
import {Todo} from "../App";
import styled from "styled-components";

interface TodoLIstProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onchangeSelectedTodo: (todo: Todo | null) => void;
  // 특정 항목에 대한 토글 버튼 이므로 딱히 뭘 받을 필요가 없음
  onInsertToggle: () => void;
}

const Div = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 14px 28px,
    rgba(0, 0, 0, 0.11) 0px 10px 10px;
  border-radius: 0 0 16px 16px;
  padding: 16px;
  color: ${({theme}) => theme.colors.color};
  background: ${({theme}) => theme.colors.white};
  height: auto;
  min-height: 240px;
  margin: 0 auto;
  margin-top: 8px;
`;

const Ul = styled.ul`
  height: 220px;
  overflow-y: scroll;
`;
const TodoList: React.FC<TodoLIstProps> = ({
  todos,
  onToggle,
  onDelete,
  onchangeSelectedTodo,
  onInsertToggle,
}) => {
  return (
    <Div>
      <Ul>
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
      </Ul>
    </Div>
  );
};

export default TodoList;
