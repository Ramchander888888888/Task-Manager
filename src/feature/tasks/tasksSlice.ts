import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}
interface TaskSlice {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState: TaskSlice = {
    tasks: [],
    status: 'idle',
}

export const   fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get<Task[]>('./tasks.json', {
        headers: {
            'Accept-Language' : 'en-US'
        }
    });
    return response.data;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>){
            const newTask: Task = {
                id: Date.now(),
                title: action.payload,
                completed: false,
            }
            state.tasks.push(newTask);
        },
        toggleTask(state, action: PayloadAction<number>){
            const task = state.tasks.find((t) =>t.id === action.payload);
            if(task)  task.completed = !task.completed;
        },
        deleteTask(state,action : PayloadAction<number>){
            state.tasks = state.tasks.filter((t) =>t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status  = 'idle';
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state) =>{
            state.status = 'failed';
        });
    },
});

export const  {addTask, toggleTask, deleteTask} = taskSlice.actions;

export default taskSlice.reducer;