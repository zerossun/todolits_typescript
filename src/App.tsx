import React, {useCallback, useEffect, useRef, useState} from "react";

import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoEdit from "./components/TodoEdit";
import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import theme from "./scss/theme";
import "./App.css";
export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const Back = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 32px;
  background: ${({theme}) => theme.colors.main};
`;

const Box = styled.div`
  position: relative;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  width: auto;
  min-height: 480px;
  max-width: 360px;
}
`;

const Notice = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  border-radius: 16px 16px 0 0;
  padding: 16px;
  box-sizing: border-box;
  color: ${({theme}) => theme.colors.white};
  background: ${({theme}) => theme.colors.sub2};
`;
function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "example1",
      checked: true,
    },
    {
      id: 2,
      text: "example2",
      checked: false,
    },
    {
      id: 3,
      text: "example3",
      checked: true,
    },
  ]);

  useEffect(() => {
    window.localStorage.setItem("todoItem", JSON.stringify(todos));
  }, [todos]);

  //any 쓰기 싫은데 any외에는 다 오류가 먹어서 안됨....
  const nextId = useRef<number>(4);

  const onInsert = useCallback((text: string) => {
    const todo: Todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos(todos.concat(todo))
    setTodos((prevTodos) => [...prevTodos, todo]);
    nextId.current++;
  }, []);

  const onToggle = (id: number) => {
    // setTodos(todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      )
    );
  };

  const onDelete = (id: Number) => {
    // setTodos(todos.filter((todo) => todo.id !== id))
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
    localStorage.removeItem("todoItem");
  };

  //텍스트
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // 수정버튼
  const [insertToggle, setInsertToggle] = useState<
    boolean | ((prevToggle: boolean) => boolean)
  >(false);

  //수정 버튼 토글

  const onInsertToggle = () => {
    if (selectedTodo !== null) {
      setSelectedTodo(null);
    }
    setInsertToggle((prevToggle: any) => !prevToggle);
  };

  // 텍스트 수정 변환
  // const onchangeSelectedTodo = (todo: React.SetStateAction<null>) => {
  //   setSelectedTodo(todo);
  // };

  const onUpdate = (id: number, text: string) => {
    onInsertToggle();
    // setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id === id ? {...todo, text} : todo))
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Back>
        <Box>
          <Notice>
            <span style={{color: "red"}}>Rec</span>. TODOLIST
          </Notice>
          <TodoInsert onInsert={onInsert} todos={todos} />
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDelete={onDelete}
            onchangeSelectedTodo={setSelectedTodo}
            onInsertToggle={onInsertToggle}
          />
          {insertToggle && selectedTodo && (
            <TodoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
          )}
        </Box>
      </Back>
    </ThemeProvider>
  );
}

export default App;
