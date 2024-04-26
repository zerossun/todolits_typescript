import React, { useState } from 'react'
import classnames from 'classnames';

import { MdCheckBox, MdCheckBoxOutlineBlank, MdModeEditOutline, MdRemoveCircleOutline } from 'react-icons/md';

export default function ToDoListItem({ todo, onRemove, onToggle }) {
    
    const { id, text, checked } = todo;
    
    return (
    <li className='flex items-center'>
          <div onClick={()=>onToggle(id)} className={classnames('checkbox', { checked: checked }, "flex items-center")}>
              {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <p>{ text }</p>
        </div>
          <div className='flex-none w-auto' ><MdModeEditOutline /></div>
          <div className='flex-none w-auto' onClick={()=>onRemove(id)}>
          
              <MdRemoveCircleOutline />
          </div>
    </li>
  )
}
