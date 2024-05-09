import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

const Dashboard = () => {
  const { todoList, user } = useSelector(
    (state) => ({
      todoList: state.main.todoList,
      user: state.main.user,
    }),
    shallowEqual,
  );

  const [orderByDateTask, setOrderByDateTask] = useState([]);

  useEffect(() => {
    const orderByDateTask = [...todoList].map((item) => {
      const inputDate = new Date(item.dueDate);
      return { ...item, date: inputDate };
    });
    const sortedDates = orderByDateTask.sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
    setOrderByDateTask(sortedDates);
  }, [todoList]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-BackgroundBlue">
      <div className="max-w-2xl mx-auto">
        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-3">
              Welcome to your TO DO list
            </h3>
            <p className="text-sm  leading-none text-gray-600 dark:text-white">
              {`Is nice to see you back :)`}
            </p>
          </div>
          {todoList?.length > 0 && (
            <p className="text-sm  leading-none text-gray-600 dark:text-white">
              {`This task needs your attention`}
            </p>
          )}
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {orderByDateTask?.length > 0 ? (
                orderByDateTask
                  .slice(0, 5)
                  .filter((i) => !i.completed)
                  .map((item) => (
                    <li key={item.id} className="py-6 sm:py-4 ">
                      <div className="flex items-center space-x-4  border-l border-gray-300">
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
              ) : (
                <a
                  className="text-sm mt-10 font-medium text-blue-600 hover:underline dark:text-blue-500 "
                  href="/todo"
                >
                  Ups nothing here yet! start adding task
                </a>
              )}
            </ul>
            {todoList?.length > 0 && (
              <a
                href="/todo"
                className="text-sm mt-10 font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
