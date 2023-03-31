import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as taskService from '../services/taskService'
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';

const TaskDetails = ({
  onDeleteClickHandler,
}) => {
  const { user } = useContext(AuthContext);
  const { editTaskHandler } = useContext(TaskContext);
  const { taskId } = useParams();

  const [currentTask, setCurrentTask] = useState({});

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    hoursOfWork: '',
  });

  const [error, setError] = useState({
    name: '',
    description: '',
    hoursOfWork: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      formValues.name &&
      formValues.description &&
      !error.name &&
      !error.description
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [formValues, error]);

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
  }, [taskId])

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  };

  const validateName = (e) => {
    const name = e.target.value;
    let errorMessage = '';
    // console.log(name);
    if (name.length === 0) {
      errorMessage = 'Please write a name of the Task.';
    }
    setError(state => ({
      ...state,
      name: errorMessage,
    }));
  };

  const validateDescription = (e) => {
    const description = e.target.value;
    let errorMessage = '';
    // console.log(description);
    if (description.length === 0) {
      errorMessage = 'Please write a description of the Task.';
    }
    setError(state => ({
      ...state,
      description: errorMessage,
    }));
  };

  const validateHoursOfWork = (e) => {
    const hoursOfWork = e.target.value;
    let errorMessage = '';
    // console.log(hoursOfWork);
    if (isNaN(hoursOfWork) || hoursOfWork <= 0) {
      errorMessage = 'Please write valid working hours.';
    }
    setError(state => ({
      ...state,
      hoursOfWork: errorMessage,
    }));
  };


  const onEditHandler = (taskId, e) => {
    e.preventDefault();
    // console.log('Edit ', taskId);

    if (isFormValid) {
      console.log('hi');

      let taskData = {
        ...currentTask,
        name: formValues.name,
        description: formValues.description
      };

      taskService.edit(taskId, taskData)
        .then(result => {
          // console.log(result);
          editTaskHandler(taskId, taskData);
        });
    } else {
      if (formValues.name === '') {
        const errorMessage = 'Please write a description of the Task.';
        setError(state => ({
          ...state,
          name: errorMessage,
        }));
      };
      if (formValues.description === '') {
        const errorMessage = 'Please write a description of the Task.';
        setError(state => ({
          ...state,
          description: errorMessage,
        }));
      };
      return;
    };
  };

  const onTakeItHandler = (taskId, e) => {
    e.preventDefault();
    // console.log('Take it ', taskId);

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
    // console.log('Finish it ', taskId);

    if (!isNaN(formValues.hoursOfWork) && formValues.hoursOfWork > 0) {

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
    } else {
      const errorMessage = 'Please write valid working hours.';
      setError(state => ({
        ...state,
        hoursOfWork: errorMessage,
      }));
      return;
    }
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
        <Link to="/tasks">Go Back</Link>
      </div>
    );
  } else if (!ifOwner && !inProgress) {
    return (
      <div className="form-control">
        <h2>You have no permission to edit this Task!</h2>
        <Link to="/tasks">Go Back</Link>
      </div>
    );
  } else if (isFinished) {
    return (
      <div className="form-control">
        <h2>This Task is already finished for {hoursOfWork} hours by {takenByUser}!</h2>
        <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />
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
                onBlur={validateName}
              />
              {error.name &&
                <div style={{ color: 'red' }}>{error.name}</div>
              }
              <label>Description of the Task:</label>
              <input type="text" placeholder="Add Description"
                name="description"
                value={formValues.description}
                onChange={onChangeHandler}
                onBlur={validateDescription}
              />
              {error.description &&
                <div style={{ color: 'red' }}>{error.description}</div>
              }
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
                onBlur={validateHoursOfWork}
              />
              {(error.hoursOfWork && error.hoursOfWork !== Number(0)) &&
                <div style={{ color: 'red' }}>{error.hoursOfWork}</div>
              }
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
