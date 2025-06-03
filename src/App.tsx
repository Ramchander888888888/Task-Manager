import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskLists';
import Filter from './components/Filters';
import { fetchTasks } from './feature/tasks/tasksSlice';
import { useAppDispatch, useAppSelctor } from './hooks';
type FilterProps = 'all' | 'completed' | 'pending'
function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelctor((state) =>state.tasks.status);

  const [filter, setFilter] = useState<FilterProps>('all');

  useEffect(() =>{
    dispatch(fetchTasks())
  },[dispatch]);


  return (
    <div className="app-container" style={{maxWidth: '500px', margin: 'auto', padding:'20px'}}>
   <h1>Task Manager</h1>
   <TaskInput />
<Filter filter={filter} setFilter={setFilter} />
{status === 'loading' ? (
  <p>Loading Tasks..</p>
) : (
  <TaskList filter={filter} />
)}
    </div>
  );
}

export default App;
