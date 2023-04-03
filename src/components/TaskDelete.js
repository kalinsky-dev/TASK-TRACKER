import { Link, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';

import * as taskService from '../services/taskService'
import { TaskContext } from '../contexts/TaskContext';


const TaskDelete = () => {
  const { taskId } = useParams();
  const { deleteTaskHandler } = useContext(TaskContext);

  const [serverError, setServerError] = useState({
    message: '',
  })

  const onDeleteHandler = (taskId, e) => {
    e?.preventDefault();

    taskService.remove(taskId)
      .then(result => {
        deleteTaskHandler(taskId);
      })
      .catch((error) => {
        setServerError(state => ({ ...state, message: error.message }));
      });
  };

  return (
    <form className="add-form">
      <div className="form-control">
        <h2>Are you sure you want to delete this Task?</h2>
      </div>
      {serverError.message &&
        <div style={{ color: 'red' }}>{serverError.message}</div>
      }
      <Link to="/tasks"><input type="submit" className="btn" value="Back" /></Link>
      <Link to="/"><input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteHandler(taskId, e)} /></Link>
    </form>
  );
};

export default TaskDelete;


