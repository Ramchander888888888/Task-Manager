import React, {useState} from 'react'
import { useAppDispatch } from '../hooks';
import { addTask } from '../feature/tasks/tasksSlice';

const TaskInput: React.FC = () => {

const [title, setTitle] = useState('');
const dispatch = useAppDispatch();

const handleAdd =()=>{
if(title.trim() !== ''){
dispatch(addTask(title))
setTitle('')
}
}
return (
 <div className='task-input'>
<input
type="text"
placeholder ="Add New Tasks"
value={title}
onChange={(e) => setTitle(e.target.value)}
onKeyDown={(e) => {if (e.key === 'Enter') handleAdd()}}
/>
<button onClick={handleAdd}>Add</button>
 </div>
);
};

export default TaskInput;