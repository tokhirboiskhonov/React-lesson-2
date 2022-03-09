import React from 'react';
import './App.scss';
import Todo from './Components/Todo-list/Todo'

function App() {
  const [todos, setTodos] = React.useState([]);
  
  const handleDelete = (e)=>{
    const todoId = Number(e.target.dataset.todoId);
    
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    
    setTodos(filteredTodos);
  }
  
  const handleCheck = (e)=>{
    const todoId = Number(e.target.dataset.todoId);
    
    const foundTodo = todos.find((todo)=> todo.id === todoId);
    
    foundTodo.isCompleted = !foundTodo.isCompleted;
    
    setTodos([...todos])
  };
  
  return (
    <>
    <div className="container">
    
    <main className="main">
    <h1 className='todos__title'>todos</h1>
    <input 
    className='todo__input'
    type="text"
    onKeyUp={(evt)=>{
      if(evt.code === 'Enter'){
        const newTodo = {
          id: todos[todos.length - 1]?.id + 1 || 0,
          title: evt.target.value.trim(),
          isCompleted: false
        };
        
        setTodos([...todos, newTodo])
        
        evt.target.value = "";
      }
    }} 
    />
    
    <ul className="todos">
    {todos.length > 0 && 
      todos.map((todo)=>(
        <Todo 
        key={todo.id}
        todo={todo} 
        handleDelete={handleDelete}
        handleCheck={handleCheck}>
        {todo.title}
        </Todo>
        ))}
        </ul>
        <div className="box">
        <h3 className='items__heading'>0 items left</h3>
        
        
        <button className='btn'>All</button>
        <button className='btn'>Active</button>
        <button className='btn'>Completed</button>
        </div>
        </main>
        </div>
        </>
        );
      }
      
      export default App;
      