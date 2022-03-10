import React from 'react';
import './App.scss';
import Todo from './Components/Todo-list/Todo'

function App() {
  const [todos, setTodos] = React.useState(JSON.parse(window.localStorage.getItem('todos')) || []);

  const [type, setType] = React.useState('all')
  
  const handleDelete = (e)=>{
    const todoId = Number(e.target.dataset.todoId);
    
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);

    window.localStorage.setItem('todos', JSON.stringify(filteredTodos));
    
    setTodos(filteredTodos);
  }
  
  const handleCheck = (e)=>{
    const todoId = Number(e.target.dataset.todoId);
    
    const foundTodo = todos.find((todo)=> todo.id === todoId);
    
    foundTodo.isCompleted = !foundTodo.isCompleted;

    window.localStorage.setItem('todos', JSON.stringify([...todos]));

    setTodos([...todos])
  };
  
  const getTodosByType = (_type, _todos) =>{

    if(_type === 'all'){
      return _todos;
    }

    if(_type === 'completed'){
      return _todos.filter((t) => t.isCompleted)
    }

    if(_type === 'uncompleted'){

      return _todos.filter((t) => !t.isCompleted)
    }

    else{
      return []
    }
  }

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

        window.localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));

        setTodos([...todos, newTodo])
        
        evt.target.value = "";
      }
    }} 
    />

    <ul className="todos">
    {todos.length > 0 &&
      getTodosByType(type, todos).map((todo)=>(
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
        
        <button className='btn' onClick={()=>setType('all')}>all</button>
        <button className='btn' onClick={()=>setType('completed')}>completed</button>
        <button className='btn' onClick={()=>setType('uncompleted')}>uncompleted</button>
        </div>
        </main>
        </div>
        </>
        );
      }
      
      export default App;
      