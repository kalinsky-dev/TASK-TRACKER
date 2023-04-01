import { FaTimes } from 'react-icons/fa';
import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from "../contexts/TaskContext";

const Task = ({
  name,
  description,
  owner,
  inProgress,
  takenByUser,
  hoursOfWork,
  isFinished,
  _id,
}) => {

  const { user } = useContext(AuthContext);
  const { onTaskClickHandler, onDeleteClickHandler } = useContext(TaskContext);

  const ifOwner = user.email === owner;

  return (
    <div className='task' onDoubleClick={() => onTaskClickHandler(_id)}>
      {(isFinished && ifOwner) ? <h3>{name} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteClickHandler(_id)} /> </h3> : <h3>{name}</h3>}
      <h4>Description: {description}</h4>
      <p>Task is created by: {owner}</p>
      {takenByUser ? <p>Task is taken by: {takenByUser}</p> : <p>This task is not taken yet!</p>}
      {inProgress && <p>Task is in progress!</p>}
      {isFinished && <p>Task is resolved for: {hoursOfWork} hours.</p>}
    </div>
  );
};

export default Task;

