import {ChangeEvent} from "react";
import "./TaskManager.css";
import { useTaskManager } from '../hooks';
import { TaskItem, TaskItemData } from './TaskItem';

export const TaskManager = () => {
  const {
    tasks,
    addTask,
    completeTask,
    handleSearch,
    updateTask,
    inputTaskProps
  } = useTaskManager();

  const handleClickDone = (task: TaskItemData) => {
    return () => completeTask(task.id!);
  }

  const handleTaskChangeValue = (task: TaskItemData) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      updateTask(task.id!, { title: e.target.value });
    }
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          {...inputTaskProps}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="container">
        {
          tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onDone={handleClickDone(task)}
              onChangeValue={handleTaskChangeValue(task)}
            />
          ))
        }
      </ul>
    </div>
  );
};
