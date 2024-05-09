"use client";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const API_URL =
  "https://dev-api.contender-logistics.draketechdev.ca/api/auth/login";

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  category: string;
  dueDate: string;
}


export interface User {
  token: string;
  isLoggedIn: boolean;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface State {
  todoList: TodoTask[];
  user: User;
  status: string;
  isFiltering: boolean;
  filterCopy: TodoTask[];
}

const initialState: State = {
  todoList: [],
  user: {
    token: "",
    isLoggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  },
  status: "",
  isFiltering: false,
  filterCopy: [],
};

export const fetchUser = createAsyncThunk(
  "todos/fetchUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    if (response.status === 200) {
      const { email, firstName, lastName, role } = response.data.user;

      const responseObject = {
        token: response.data.toke,
        isLoggedIn: true,
        email: email,
        firstName,
        lastName,
        role,
      };

      sessionStorage.setItem("auth", JSON.stringify(responseObject));
      return responseObject as User;
    }
  },
);

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { description, title, category, dueDate } = action.payload;

      state.todoList.push({
        id: Math.random().toString(20).substring(1),
        title,
        completed: false,
        description,
        category,
        dueDate,
      });
      sessionStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    removeTask: (state, action) => {
      state.todoList = state.todoList.filter(
        (task) => task.id !== action.payload,
      );
      sessionStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    completeTask: (state, action) => {
      state.todoList = state.todoList.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      });
      sessionStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    loadSessionStorageAndUser: (state, action) => {
      state.todoList = action.payload.todoList;
      state.user = action.payload.user;
    },
    filterByCategoryAction: (state, action) => {
      if (action.payload.isFiltering) state.filterCopy = state.todoList;
      state.todoList = action.payload.isFiltering
        ? state.todoList.filter(
            (task) => task.category === action.payload.category,
          )
        : state.filterCopy;
      state.isFiltering = action.payload.isFiltering;
    },
    resetFilter: (state) => {
      state.filterCopy = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.status = "fulfilled";
      });
  },
});

export const {
  addTask,
  removeTask,
  completeTask,
  loadSessionStorageAndUser,
  filterByCategoryAction,
  resetFilter,
} = todoSlice.actions;

const store = configureStore({
  reducer: {
    main: todoSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;
