import {ChangeEventHandler, FC, MouseEventHandler} from 'react';

export interface TaskItemData {
  id?: string;
  title: string;
}

export interface TaskItemProps {
  task: TaskItemData;
  onChangeValue: ChangeEventHandler<HTMLInputElement>;
  onDone: MouseEventHandler<HTMLButtonElement>;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onDone, onChangeValue }) => {
  return (
    <li key={task.id} className="task">
      <div className="task">
        <input
          type="text"
          placeholder="Add new task"
          value={task.title}
          onChange={onChangeValue}
        />
        <button onClick={onDone}>
          Done
        </button>
      </div>
    </li>
  );
}