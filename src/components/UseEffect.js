import React, {useEffect, useState} from 'react'

export default function UseEffect() {

    const [btn, setBtn] = useState(0);
    const btnChange = () => {
        setBtn(btn + 1)
    }

    const [two, setTwo] = useState(0);    
    const towChange = () => {
        setTwo(two + 1)
    }

    const [count, setCount] = useState(1000);
    const upCount = () => {
        setCount(count + 1000)
    }


    const [idValue, setId] = useState('');
    const idChange = (e) => {
        setId(e.target.value);
        console.log(e.target.value);
    }
    


    const onsub = (e) => {
        e.preventDefault();
        console.log(idValue);
    }

    useEffect(() => {
        
        const h1 = document.getElementById('h1');
        h1.innerText = '바뀐 후'
      
    
    },[count])

    

  return (
    <div>
        <h3 id="h1">바뀌기 전</h3>
        <p>{ btn }</p>
        <button onClick={btnChange}>change</button>
        <p>{two}</p>
        <button onClick={towChange}>two</button>

        <p>{count}</p>
        <button onClick={upCount}>click</button>

          <form onSubmit={onsub}>
            <h2>!!</h2>
                <input type='text' onChange={idChange} text={ idValue } />
                <input type='submit' value="btn" ></input>
        </form>  
        
    </div>
  )
}
