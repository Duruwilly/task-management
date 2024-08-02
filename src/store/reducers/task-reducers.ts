import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/ApiNetwork";
import { FilterState, Task } from "../../common.type";
interface TaskState {
  tasks: Task[];
  loading: boolean;
  filter: FilterState;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  filter: FilterState.All,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await api.get("/tasks");
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title: string) => {
    const response = await api.post("/tasks", { title });
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await api.patch(`/tasks/${task._id}`, {
      completed: task.completed,
    });
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<FilterState>
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;
