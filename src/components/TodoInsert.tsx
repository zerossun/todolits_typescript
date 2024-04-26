import React, { ChangeEvent, useState } from 'react'
import { MdAdd } from 'react-icons/md';

interface TodoInsertProps {
  onInsert: (memo: string) => void;
}

export default function TodoInsert({ onInsert }:TodoInsertProps) {

  const [memo, setMemo] = useState('');

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
    console.log(memo);
  }
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMemo('');
    onInsert(memo);
   }
  return (
    <form onSubmit={submit}>
      <input value={memo} onChange={onchange} placeholder='일정 적기' />  
      <button type='submit'><MdAdd/></button>
    </form>
  );
}
