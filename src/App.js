import React, { useCallback, useRef, useState } from 'react';
import PokemIndex from './components/PokemIndex'
import PokemonDetailsPage from './components/PokemonDetailsPage';
import TodoList from './components/TodoList'
import UseEffect from './components/UseEffect'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoLIstItem from './components/TodoLIstItem';
import TodoEdit from './components/TodoEdit';

function App() {

  
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'example1',
      checked: true,
    },
    {
      id: 2,
      text: 'example2',
      checked: false,
    },
    {
      id: 3,
      text: 'example3',
      checked: true,
    },
  ]);

//  useRef() 
//  :  렌더링과 상관없이, 마운트된 시점부터 언마운트된 시점까지 값을 유지
// State의 변화 ➡️ 렌더링 ➡️ 컴포넌트 내부 변수들 초기화
// Ref의 변화 ➡️ No 렌더링 ➡️ 변수들의 값이 유지됨
// State의 변화 ➡️ 렌더링 ➡️ 그래도 Ref의 값은 유지됨
  
  // useCallback()
  // : 함수 재사용
  // todos에 추가하는 건데 굳이 또 새로운 todos 만드는 게 그러니 있는 걸 가져와 추가하자 라는 의미인걸가
  
  
  // const nextId = useRef(4);
  // const onInsert = useCallback(
  //   (text) => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checked: false,
  //     };
  //     setTodos으로 기존 todos에 todo 객체 넣어주기
  //     setTodos(todos.concat(todo));
  //     nextId에 1씩 더하기
  //     nextId.current++;
  //   },
  //   [todos],
  // );
  


  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos.concat(todo));
    nextId.current++;
  }, [todos]);
  
   const onRemove = 
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  
  const onToggle = useCallback(
    (id) => {
      setTodos(todos.map((todo)=>todo.id === id ? {...todo, checked: !todo.checked} : todo,))
    },[todos]
  )
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    //prevState 
    // setState로 상태 값을 여러번 변경 하려고 할때마다 즉각적으로 state 에 변경된 상태값을 적용시키지 않음.
    // 미리 변경된 상태값을 바로 땡겨와서 변경될 state에 적용시키길 원한다. = prevState
    setInsertToggle((prev) => !prev);
  };
  const onchangeSetSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  }

  return (
    // <Router>
    //   <Routes>
    //     {/* <Route path='/' element={<PokemIndex />} /> */}
    //     {/* <Route path='/' element={<UseEffect />} /> */}
    //     {/* <Route path='/pokemon/:id' element={<PokemonDetailsPage/>} /> */}
    //   </Routes>
    // </Router>
    // props는 자식컴포넌트로만 보낼 수 있음.
    // 손자컴포넌트로 보내려면 자식 컴포넌트를 거쳐 가야함
    // &&은 false를 반환
    <div>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onchangeSetSelectedTodo={onchangeSetSelectedTodo} onInsertToggle={ onInsertToggle } />
      {insertToggle && (<TodoEdit />)}
    </div>
  );
}

export default App;
