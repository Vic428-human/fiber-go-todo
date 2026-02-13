import { useState } from 'react'
import reactLogo from './assets/react.svg'
import TodoForm from "./components/TodoForm";
import './App.css'

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

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
