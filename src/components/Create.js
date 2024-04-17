/* eslint-disable no-use-before-define */
import React, { useState } from 'react'

const Create = () => {

const [name, setName] = useState('');
const [text, setText] = useState('');

    const onName = (e) => {
        setName(e.target.value)
        console.log(e.target.value);
    }
    
    const local = (e) => {
        e.preventDefault();
        setText(name);
        console.log(name)
        return false;
    }

  return (
    <div>
        <form onSubmit={local}>
            <input type='text' value={name} onChange={onName} placeholder='이름'></input>
              <input type='submit' value='btn'></input>
          </form>
          <ul>
              <li>
                  <p>{text}</p>        
                  <button >reset</button>
              </li>
          </ul>
          
    </div>
  )
}

export default Create
