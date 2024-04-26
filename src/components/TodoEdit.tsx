import React, {ChangeEvent, useEffect, useState } from 'react'

interface TodoEditProps {
  onUpdate: (id: number, text: string) => void;
  selectedTodo: { id: number, text: string };
}

const TodoEdit: React.FC<TodoEditProps>=({onUpdate, selectedTodo}) => {

  const [value, setValue] = useState<string>('');

  // useEffect(() => {
  //   if (selectedTodo) {
  //     setValue(selectedTodo.text);
  //   }
  // }, [selectedTodo]);

  console.log(selectedTodo);
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  }
  
  

  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   setValue('');
  //   onUpdate(selectedTodo.id, value);
  // }
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('');
    onUpdate(selectedTodo.id, value);
}
  return (
    <form onSubmit={onsubmit}>
      <input value={value} onChange={onchange}/>
      <button type='submit'>수정</button>
    </form>
  )
}


export default TodoEdit;