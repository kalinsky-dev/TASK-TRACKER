import { useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import * as taskService from '../services/taskService'

const TaskDetails = ({
  name,
  description,
  owner,
  inProgress,
  takenByUser,
  hoursOfWork,
  isFinished,
  _createdOn,
  _id,
  _ownerId,
  onTaskClickHandler,
  onDeleteClickHandler
}) => {
  const { user } = useContext(AuthContext);
  const { taskId } = useParams();
  const navigate = useNavigate();
  // const [taskName, setName] = useState('');
  // const [taskDescr, setDescr] = useState('');
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
    //       // userLoginHandler(authData);
    //       navigate('/');
    //     }
    //   })
    //   .catch(() => {
    //     navigate('/404')
    //   })
  };

 
  
  // const ifOwner = user.email === owner;
  const ifOwner = true;

  inProgress = false;
  isFinished = false;

  hoursOfWork = 5;
  takenByUser = 'george@abv.bg';





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
        {!inProgress && <input type="submit" className="btn" value="Take it" />}
        {(inProgress && ifOwner) && <input type="submit" className="btn" value="Finish" />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Edit" />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />}
      </form>
    );
  };
};

export default TaskDetails;
