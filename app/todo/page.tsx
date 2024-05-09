"use client";
import React, { useEffect, useState } from "react";
import Form from "../../components/form/index";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "@/components/ProtectedRouting";
import {
  completeTask,
  filterByCategoryAction,
  removeTask,
} from "@/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { todoList, isFiltering } = useSelector(
    (state) => ({
      todoList: state.main.todoList,
      isFiltering: state.main.isFiltering,
    }),
    shallowEqual,
  );
  const [addNewTask, setAddNewTask] = useState(false);
  const [pastListTask, setPastListTask] = useState([]);

  useEffect(() => {
    const pastTask = [...todoList].reduce((accumulator, currentItem) => {
      const inputDate = new Date(currentItem.dueDate);
      accumulator[currentItem.id] = inputDate.getTime() < Date.now();
      return accumulator;
    }, {});

    setPastListTask(pastTask);
  }, [todoList]);

  const cancelButtonForm = () => {
    setAddNewTask((prev) => !prev);
  };

  function deleteTask(id: string) {
    dispatch(removeTask(id));
    toast("Successfully removed!");
  }

  const completeTaskAction = ({
    id,
    completed,
  }: {
    id: string;
    completed: string;
  }) => {
    dispatch(completeTask(id));
    completed
      ? toast("np, keep trying!")
      : toast("Congrats, you are doing really good!");
  };

  function filterByCategory(category: any): void {
    dispatch(filterByCategoryAction({ category, isFiltering: !isFiltering }));
  }

  return (
    <ProtectedRoute>
      {addNewTask && <Form cancelButtonForm={cancelButtonForm} />}
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col w-56 border-r border-gray-300">
          <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-green-300">
            <span className="font-medium">Completed Task</span>
          </div>

          <div className="flex flex-col flex-grow p-4 overflow-auto">
            {todoList?.length > 0 &&
              todoList
                .filter((items) => items.completed)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border-l rounded-lg drop-shadow-2xl  border-gray-300 my-5"
                  >
                    <p className="flex flex-col justify-left items-left flex-shrink-0 p-3 px-2 text-sm font-medium rounded hover:bg-green-300">
                      <span className="leading-none mb-4">{item.title}</span>
                      <span className="leading-none italic">
                        {item.description.slice(0, 20)}
                      </span>
                    </p>
                  </div>
                ))}
          </div>
          <button
            className="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setAddNewTask(true)}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="ml-2 leading-none">New Task</span>
          </button>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between flex-shrink-0 h-16 px-8 border-b border-gray-300">
            <h1 className="text-lg font-medium">Filter by category</h1>
            {todoList?.length > 0 &&
              todoList.map((item) => (
                <button
                  onClick={() => filterByCategory(item.category)}
                  className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                >
                  {item.category}
                </button>
              ))}

            <Link
              href="/"
              className="text-blue-500 p-2 flex items-center justify-between"
            >
              <Image
                height={32}
                width={32}
                alt="go home"
                src="/images/homeIcon.svg"
              />
            </Link>
          </div>
          <div className="flex-grow p-6 overflow-auto bg-gray-200">
            <div className="flex flex-row space-y-4 flex-wrap">
              {todoList?.length > 0 &&
                todoList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      minWidth: "10vw",
                      minHeight: "10vh",
                      backgroundColor: pastListTask[item.id]
                        ? "#FFF9D0"
                        : "white",
                    }}
                    className="p-3 bg-white border  border-gray-300 mx-5"
                  >
                    <h1 className="text-pretty text-xl">{item.title}</h1>
                    <p className="text-pretty text-lg italic ">
                      {item.description}
                    </p>
                    <p className="text-pretty text-sm">{item.dueDate}</p>
                    <p className="text-pretty text-sm text-emerald-400">
                      {item.category}
                    </p>

                    <div className="flex flex-row">
                      <button
                        className="flex justify-center items-center w-full text-red-950 px-4 py-3 rounded-md focus:outline-none"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                        onClick={() =>
                          completeTaskAction({
                            id: item.id,
                            completed: item.completed,
                          })
                        }
                      >
                        {item.completed ? "Uncomplete" : "Complete"}
                      </button>
                    </div>
                    {pastListTask[item.id] && (
                      <p className="text-pretty text-sm text-center text-gray-400">
                        {"This task expired"}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </ProtectedRoute>
  );
};

export default Dashboard;
