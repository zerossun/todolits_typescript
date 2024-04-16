import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const api = () => {
    const myPromise = new Promise((resolve, reject) => {
        resolve();
    });

    myPromise.then(data => { return 'working...' }).then(data => {
        console.log(data);
    }).catch(err => {console.log(err)})
  return (
    <div>
      
    </div>
  )
}

export default api