import {nanoid} from "nanoid";
import {ChangeEvent, ChangeEventHandler, useMemo, useState} from "react";
import {TaskItemData} from "../components/TaskItem";

interface InputTaskProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface TaskManagerHookValue {
  tasks: TaskItemData[];
  completeTask(id: string): void;
  addTask(): void;
  inputTaskProps: InputTaskProps;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
  updateTask(id: string, newData: TaskItemData): void;
}

export const useTaskManager = (): TaskManagerHookValue => {
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tasks, setTasks] = useState<TaskItemData[]>([]);

  const completeTask = (id: string) => {
    setTasks(p => p.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: TaskItemData) => {
    const newTasks = tasks.slice();
    const index = tasks.findIndex((task) => task.id === id);
    newTasks[index] = taskUpdate;
    setTasks(newTasks);
  };

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }
    const newTask = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks: TaskItemData[] = useMemo(() => {
    return tasks.filter((task) => {
      return task.title.toLowerCase().includes(searchKeyword.toLowerCase());
    },
  )}, [tasks, searchKeyword]);

  const inputTaskProps: InputTaskProps = {
    value: title,
    onChange(ev: ChangeEvent<HTMLInputElement>){
      setTitle(ev.target.value);
    }
  }

  return {
    tasks: filteredTasks,
    completeTask,
    addTask,
    updateTask,
    handleSearch,
    inputTaskProps
  }
}