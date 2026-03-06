import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './store/counterSlice'
import Navigation from './components/Navigation'

function App() {
  const count=useSelector((state)=>state.counter.value);
  const dispatch=useDispatch();
  function handleIncrementClick(){
    dispatch(increment());
  }
  function handleDecrementClick(){
    dispatch(decrement());
  }
  function handleReset(){
    dispatch(reset());
  }

  return (
    // <>
    //   <button onClick={handleIncrementClick}>+</button>
    //   <p>Count:{count}</p>
    //   <button onClick={handleDecrementClick}>-</button>
    //   <button onClick={handleReset}>reset</button>
    // </>
    <Navigation/>
  )
}

export default App
