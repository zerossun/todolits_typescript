import React, { useCallback, useState } from 'react'
import { MdAdd } from 'react-icons/md';



export default function TodoInsert({onInsert}) {
    const [name, setName] = useState('');
    const onName = useCallback(e => {
        setName(e.target.value);
        
    },[])

    // 이렇게 해도 됨
    // const sub = (e) => {
    //     e.preventDefault();
    //     onInsert(name);
    //     setName('');
    // }
    
    // usecallback으로도 됨. 근데 왜 usecallback을 쓰는거지
    const sub = useCallback(e => {
        e.preventDefault();
        onInsert(name);
        setName('');
    }, [onInsert, name])
    
  return (
    <div>
     <form onSubmit={sub}>
              <input type='text' value={name} onChange={onName} placeholder='이름'/>
              <button type='submit'>
                  <MdAdd/>
              </button>
          </form>
    </div>
  )
}
