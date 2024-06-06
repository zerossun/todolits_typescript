import React, {ChangeEvent, useEffect, useState} from "react";
import {ReactComponent as Pencil} from "../assets/Pencil.svg";
import styled from "styled-components";
import {ComButton} from "../scss/Global";
interface TodoEditProps {
  onUpdate: (id: number, text: string) => void;
  selectedTodo: {id: number; text: string};
}

const Form = styled.form`
  background: ${({theme}) => theme.colors.white};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 14px 28px,
    rgba(0, 0, 0, 0.11) 0px 10px 10px;
`;

const Input = styled.input`
  border: 0;
  color: ${({theme}) => theme.colors.color};
  width: calc(100% - 20px);
  :focus {
    outline: none;
  }
`;

const EllipsisDiv = styled.div`
  border: 0;
  color: ${({theme}) => theme.colors.color};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TodoEdit: React.FC<TodoEditProps> = ({onUpdate, selectedTodo}) => {
  const [value, setValue] = useState<string>("");

  console.log(selectedTodo);
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    onUpdate(selectedTodo.id, value);
  };
  return (
    <Form onSubmit={onsubmit}>
      <EllipsisDiv>
        <Input value={value} onChange={onchange} />
      </EllipsisDiv>
      <ComButton type="submit">
        <Pencil />
      </ComButton>
    </Form>
  );
};

export default TodoEdit;
