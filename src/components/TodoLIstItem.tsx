// import React from 'react'
// import classNames from 'classnames';
// import { MdCheckBox, MdCheckBoxOutlineBlank, MdModeEditOutline, MdRemoveCircleOutline} from 'react-icons/md';

// export default function TodoLIstItem({todo, onToggle, onDelete, onchangeSelectedTodo, onInsertToggle}) {
//   const { id, text, checked } = todo;
//   console.log(text);
//   return (
//       <div className='flex items-center'>
//           <div onClick={()=>onToggle(id)} className={classNames('checkbox', {checked: checked},'flex items-end')}>
//           {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
//         <p>{text}</p>
//           </div>
//       <button onClick={() => {
//         onchangeSelectedTodo(todo);
//         onInsertToggle(todo);
//       }}>
//         <MdModeEditOutline />
//       </button>
//       <button onClick={()=>onDelete(id)}><MdRemoveCircleOutline /></button>
//     </div>
//   )
// }


import React from 'react'
import classnames from 'classnames';

import { MdCheckBox, MdCheckBoxOutlineBlank, MdModeEditOutline, MdRemoveCircleOutline } from 'react-icons/md';
import type {Todo} from '../App'

interface ToDoListProps {
  
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onchangeSelectedTodo: (todo: Todo | null) => void;
  onInsertToggle: () => void;
}

const ToDoListItem: React.FC<ToDoListProps>=({ todo, onToggle, onDelete, onchangeSelectedTodo, onInsertToggle }) => {
  
  console.log(todo);
  
  const { id, text, checked } = todo;
  
    return (
    <li className='flex items-center'>
          <div onClick={()=>onToggle(id)} className={classnames('checkbox', { checked: checked }, "flex items-center")}>
              {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <p>{ text }</p>
        </div>
        <button className='flex-none w-auto'
          onClick={() =>
            { onchangeSelectedTodo(todo);
              onInsertToggle();
            }
             }
        ><MdModeEditOutline /></button>
          <button className='flex-none w-auto' onClick={()=>onDelete(id)}>
              <MdRemoveCircleOutline />
          </button>
    </li>
  )
}

export default ToDoListItem;