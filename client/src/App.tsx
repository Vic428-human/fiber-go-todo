import { useState } from 'react'
import reactLogo from './assets/react.svg'
import TodoForm from "./components/TodoForm"
import './App.css'


function App() {

  return (
    <>
      <div className='Container'>
        <TodoForm />
      </div>
    </>
  )
}

export default App
