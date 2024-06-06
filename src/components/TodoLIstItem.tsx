import React from "react";
import classnames from "classnames";
import styled from "styled-components";
import {ReactComponent as CheckActive} from "../assets/CheckActive.svg";
import {ReactComponent as CheckDisabled} from "../assets/CheckDisabled.svg";
import {ReactComponent as Modify} from "../assets/Modify.svg";
import {ReactComponent as Delete} from "../assets/Delete.svg";
import {ComButton, Typography} from "../scss/Global";
import type {Todo} from "../App";

interface ToDoListProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onchangeSelectedTodo: (todo: Todo | null) => void;
  onInsertToggle: () => void;
}

const Li = styled.li`
  display: flex;
  align-items: center;
  width: calc(100% - 12px);
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.disabled};
  &:last-child {
    border-bottom: 0px;
  }
`;
const Stack = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonDiv = styled.div`
  display: flex;
`;
const ToDoListItem: React.FC<ToDoListProps> = ({
  todo,
  onToggle,
  onDelete,
  onchangeSelectedTodo,
  onInsertToggle,
}) => {
  // console.log(todo);

  const {id, text, checked} = todo;

  return (
    <Li className="flex items-center">
      <Stack
        onClick={() => onToggle(id)}
        className={classnames(
          "checkbox",
          {checked: checked},
          "flex items-center"
        )}
      >
        {checked ? <CheckActive /> : <CheckDisabled />}
        <Typography
          style={{
            marginLeft: "8px",
            width: "100%",
            maxWidth: "230px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {text}
        </Typography>
      </Stack>
      <ButtonDiv>
        <ComButton
          className="flex-none w-auto"
          onClick={() => {
            onchangeSelectedTodo(todo);
            onInsertToggle();
          }}
        >
          <Modify />
        </ComButton>
        <ComButton className="flex-none w-auto" onClick={() => onDelete(id)}>
          <Delete />
        </ComButton>
      </ButtonDiv>
    </Li>
  );
};

export default ToDoListItem;
