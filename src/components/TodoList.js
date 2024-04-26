/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TodoLIstItem from './TodoLIstItem';

const TodoList = ({todos, onRemove, onToggle, onchangeSetSelectedTodo, onInsertToggle}) => {

// const [name, setName] = useState('');
// const [text, setText] = useState('');

//     const onName = (e) => {
//         setName(e.target.value)
//         console.log(e.target.value);
//     }
    
//     const local = (e) => {
//         e.preventDefault();
//         setText(name);
//         console.log(name)
//         return false;
//     }

   
  return (
    <div>
        {/* <form onSubmit={local}>
            <input type='text' value={name} onChange={onName} placeholder='이름'></input>
              <input type='submit' value='btn'></input>
          </form>
          <ul>
              <li>
                  <p>{text}</p>        
                  <button>reset</button>
              </li>
          </ul>
           */}
          
          <ul>
              {todos.map((todo) => (
                  <TodoLIstItem onRemove={onRemove} onToggle={onToggle}  todo={todo} key={todo.id} onchangeSetSelectedTodo={onchangeSetSelectedTodo} onInsertToggle={ onInsertToggle }/>
              ))}
              
          </ul>
    </div>
  )
}

export default TodoList
