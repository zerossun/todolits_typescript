import React, {useEffect, useRef, useState} from "react";

import "./App.css";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoEdit from "./components/TodoEdit";
// import useSpeechRecognition from "./hooks/useSpeechRecognition";
// import TodoInsert

export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}
function App() {
  // const {
  //   text,
  //   startListening,
  //   stopListening,
  //   isListening,
  //   hasRecognitionSupport,
  // } = useSpeechRecognition();

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

  const onInsert = (text: string) => {
    const todo: Todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos(todos.concat(todo))
    setTodos((prevTodos) => [...prevTodos, todo]);

    nextId.current++;
  };

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
    <div>
      <TodoInsert onInsert={onInsert} />
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
      {/* <div>
        {hasRecognitionSupport ? (
          <>
            <div>
              <button onClick={startListening}>start Listening</button>
            </div>
            <div>
              <button onClick={stopListening}>stop Lisetening</button>
            </div>
            {isListening ? (
              <div>Your browser is currently listening</div>
            ) : null}
            {text}
          </>
        ) : (
          <h1>Your browser has no speech recognition support</h1>
        )}
      </div> */}
    </div>
  );
}

export default App;
