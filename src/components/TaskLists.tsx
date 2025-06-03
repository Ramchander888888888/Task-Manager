import React,{useState} from "react";
import { toggleTask,deleteTask,Task } from "../feature/tasks/tasksSlice";
import { useAppDispatch, useAppSelctor } from "../hooks";

interface TaskListProps {
    filter: 'all' | 'completed' | 'pending'
}

const TaskList: React.FC<TaskListProps> = ({filter}) =>{
    const tasks = useAppSelctor((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();

const filteredTasks = tasks.filter((task) =>{
    if(filter === 'all') return true;
    if(filter === 'completed') return task.completed;
    if(filter === 'pending') return !task.completed;
    return true;
})
if(filteredTasks.length === 0 ) return <p>No tasks to show</p>
    return(
        <ul>
            {filteredTasks.map((task) =>(

<li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
<input 
type="checkbox"
checked={task.completed}
onChange={() =>dispatch(toggleTask(task.id))}
/>
{task.title}
<button onClick={() => dispatch(deleteTask(task.id))} style={{marginLeft: '10px'}}>
    Delete
</button>
</li>
            ))}

        </ul>
    )
};

export default TaskList;