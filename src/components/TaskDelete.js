import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';

import * as taskService from '../services/taskService'
import { TaskContext } from '../contexts/TaskContext';


const TaskDelete = () => {
  const { taskId } = useParams();
  const { deleteTaskHandler } = useContext(TaskContext);

  const onDeleteHandler = (taskId, e) => {
    e?.preventDefault();
    console.log(taskId);

    taskService.remove(taskId)
      .then(result => {
        // console.log(result);
        deleteTaskHandler(taskId);
      })
  };

  return (
    <form className="add-form">
      <div className="form-control">
        <h2>Are you sure you want to delete this Task?</h2>
      </div>
      <Link to="/tasks"><input type="submit" className="btn" value="Back" /></Link>
      <Link to="/"><input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteHandler(taskId, e)} /></Link>
    </form>
  );
};

export default TaskDelete;


