import React from 'react';

function Todo({children, todo, handleDelete, handleCheck}) {
    return(
        <>
        <li style={{textDecoration: todo.isCompleted ? 'line-through' : 'none'}}>
            <input
            type="checkbox"
            data-todo-id={todo.id}
            onClick={handleCheck}
            defaultChecked={todo.isCompleted} />

            {children}

            <button data-todo-id={todo.id} onClick={handleDelete}>&times;</button>
        </li>
        </>
    )
}

export default Todo;