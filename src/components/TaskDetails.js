import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import * as taskService from '../services/taskService'

const TaskDetails = ({
  onEditHandler,
  onTakeItHandler,
  onFinishHandler,
  onDeleteClickHandler,
}) => {
  const [currentTask, setCurrentTask] = useState({});
  const { user } = useContext(AuthContext);
  const { taskId } = useParams();
  const navigate = useNavigate();


  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    // console.log(formValues);
    // taskService.create(formValues)
    //   .then(authData => {
    //     if (authData.code === 403) {
    //       navigate('/auth-error')
    //     } else {
    //       console.log(authData);
    //       userLoginHandler(authData);
    //       navigate('/');
    //     }
    //   })
    //   .catch(() => {
    //     navigate('/404')
    //   })
  };

  useEffect(() => {
    taskService.getOne(taskId)
      .then(taskData => {
        // console.log(taskData);
        setCurrentTask(taskData)
        if (taskData) {
          // console.log(taskData)
          setFormValues(state => ({ ...state, name: taskData.name, description: taskData.description }))
        }
      })
  }, [])


  const ifOwner = user.email === currentTask.owner;
  const inProgress = currentTask.inProgress;
  const isFinished = currentTask.isFinished;
  const hoursOfWork = currentTask.hoursOfWork;
  const takenByUser = currentTask.takenByUser;

  if (!ifOwner && inProgress) {
    return (
      <div className="form-control">
        <h2>This Task is in Progress!</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  } else if (!ifOwner && !inProgress) {
    return (
      <div className="form-control">
        <h2>You have no permission to edit this Task!</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  } else if (isFinished) {
    return (
      <div className="form-control">
        <h2>This Task is already finished for {hoursOfWork} hours by {takenByUser}!</h2>
      </div>
    );
  } else if (ifOwner) {
    return (
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Name of the Task</label>
          {(ifOwner && !inProgress) ?
            (<input type="text" placeholder="Add Task"
              name="name"
              value={formValues.name}
              onChange={onChangeHandler}
            />)
            : (<input type="text" placeholder="Add Task"
              name="name"
              disabled={true}
              value={formValues.name}
            />)}
          <label>Description of the Task</label>
          {(ifOwner && !inProgress) ?
            (<input type="text" placeholder="Add Description"
              name="description"
              value={formValues.description}
              onChange={onChangeHandler}
            />)
            : (<input type="text" placeholder="Add Description"
              name="description"
              disabled={true}
              value={formValues.description}
            />)}
        </div>
        {!inProgress && <input type="submit" className="btn" value="Take it" onClick={(e) => onTakeItHandler(taskId, e)}/>}
        {(inProgress && ifOwner) && <input type="submit" className="btn" value="Finish" onClick={(e) => onFinishHandler(taskId, e)} />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Edit" onClick={(e) => onEditHandler(taskId, e)} />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />}
      </form>
    );
  };
};

export default TaskDetails;
