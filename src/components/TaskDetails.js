import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as taskService from '../services/taskService'
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';

const TaskDetails = ({
  onDeleteClickHandler,
}) => {
  const [currentTask, setCurrentTask] = useState({});
  const { user } = useContext(AuthContext);
  const { editTaskHandler } = useContext(TaskContext);
  const { taskId } = useParams();


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


  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    hoursOfWork: 0
  })

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e);

  //   // console.log(formValues);
  //   // taskService.create(formValues)
  //   //   .then(authData => {
  //   //     if (authData.code === 403) {
  //   //       navigate('/auth-error')
  //   //     } else {
  //   //       console.log(authData);
  //   //       userLoginHandler(authData);
  //   //       navigate('/');
  //   //     }
  //   //   })
  //   //   .catch(() => {
  //   //     navigate('/404')
  //   //   })
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(formValues);

  //   taskData.name = formValues.name;
  //   taskData.description = formValues.description;
  //   taskData.owner = user.email;

  //   console.log(taskData);


  //   taskService.create(taskData)
  //     .then(result => {
  //       console.log(result);
  //       addTaskHandler(result);
  //     })

  //   addTaskHandler(formValues);
  // }

  const onEditHandler = (taskId, e) => {
    e.preventDefault();

    console.log('Edit ', taskId);

    let taskData = {
      ...currentTask,
      name: formValues.name,
      description: formValues.description
    }

    taskService.edit(taskId, taskData)
      .then(result => {
        // console.log(result);
        editTaskHandler(taskId, taskData);
      })
  }

  const onTakeItHandler = (taskId, e) => {
    e.preventDefault();

    console.log('Take it ', taskId);

    let taskData = {
      ...currentTask,
      inProgress: true,
      takenByUser: user.email
    }

    taskService.edit(taskId, taskData)
      .then(result => {
        // console.log(result);
        editTaskHandler(taskId, taskData);
      })
  }

  const onFinishHandler = (taskId, e) => {
    e.preventDefault();

    console.log('Finish it ', taskId);

    let taskData = {
      ...currentTask,
      inProgress: false,
      isFinished: true,
      hoursOfWork: Number(formValues.hoursOfWork)
    }

    taskService.edit(taskId, taskData)
      .then(result => {
        // console.log(result);
        editTaskHandler(taskId, taskData);
      })
  }


  const ifOwner = user.email === currentTask.owner;
  // console.log(user.email);
  // console.log(currentTask.owner);

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
      <form className="add-form" >
        <div className="form-control">
          {(ifOwner && !inProgress) &&
            (<>
              <label>Name of the Task:</label>
              <input type="text" placeholder="Add Task"
                name="name"
                value={formValues.name}
                onChange={onChangeHandler}
              />
              <label>Description of the Task:</label>
              <input type="text" placeholder="Add Description"
                name="description"
                value={formValues.description}
                onChange={onChangeHandler}
              />
            </>)
          }
          {(ifOwner && inProgress) &&
            (<>
              <label>Name of the Task:</label>
              <input type="text" placeholder="Add Task"
                name="name"
                value={formValues.name}
                onChange={onChangeHandler}
                disabled={true}
              />
              <label>Description of the Task:</label>
              <input type="text" placeholder="Add Description"
                name="description"
                value={formValues.description}
                onChange={onChangeHandler}
                disabled={true}
              />
              <label>Working hours for the Task:</label>
              <input type="text" placeholder="Add hours"
                name="hoursOfWork"
                value={formValues.hoursOfWork}
                onChange={onChangeHandler}
              />
            </>)
          }
        </div>
        {!inProgress && <input type="submit" className="btn" value="Take it" onClick={(e) => onTakeItHandler(taskId, e)} />}
        {(inProgress && ifOwner) && <input type="submit" className="btn" value="Finish" onClick={(e) => onFinishHandler(taskId, e)} />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Edit" onClick={(e) => onEditHandler(taskId, e)} />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />}
      </form>
    );
  };
};

export default TaskDetails;
