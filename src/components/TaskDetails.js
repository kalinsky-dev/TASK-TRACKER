import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as taskService from '../services/taskService'
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';

const TaskDetails = () => {
  const { user } = useContext(AuthContext);
  const { editTaskHandler, onDeleteClickHandler } = useContext(TaskContext);
  const { taskId } = useParams();

  const [currentTask, setCurrentTask] = useState({});

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    hoursOfWork: '',
  });

  const [formError, setFormError] = useState({
    name: '',
    description: '',
    hoursOfWork: '',
  });

  const [serverError, setServerError] = useState({
    message: '',
  })

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      formValues.name &&
      formValues.description &&
      !formError.name &&
      !formError.description
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [formValues, formError]);

  useEffect(() => {
    taskService.getOne(taskId)
      .then(taskData => {
        setCurrentTask(taskData)
        setFormValues(state => ({ ...state, name: taskData.name, description: taskData.description }));
      })
      .catch((error) => {
        setServerError(state => ({ ...state, message: error.message }));
      });
  }, [taskId])

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  };

  const validateName = (e) => {
    const name = e.target.value;
    let errorMessage = '';
    if (name.length === 0) {
      errorMessage = 'Please write a name of the Task.';
    }
    if (!isNaN(name)) {
      errorMessage = 'Please write a valid name.';
    }
    setFormError(state => ({
      ...state,
      name: errorMessage,
    }));
  };

  const validateDescription = (e) => {
    const description = e.target.value;
    let errorMessage = '';
    if (description.length === 0) {
      errorMessage = 'Please write a description of the Task.';
    }
    if (!isNaN(description)) {
      errorMessage = 'Please write a valid description.';
    }
    setFormError(state => ({
      ...state,
      description: errorMessage,
    }));
  };

  const validateHoursOfWork = (e) => {
    const hoursOfWork = e.target.value;
    let errorMessage = '';
    if (isNaN(hoursOfWork) || hoursOfWork <= 0) {
      errorMessage = 'Please write valid working hours.';
    }
    setFormError(state => ({
      ...state,
      hoursOfWork: errorMessage,
    }));
  };


  const onEditHandler = (taskId, e) => {
    e.preventDefault();

    if (isFormValid) {

      let taskData = {
        ...currentTask,
        name: formValues.name,
        description: formValues.description
      };

      taskService.edit(taskId, taskData)
        .then(result => {
          editTaskHandler(taskId, taskData);
        })
        .catch((error) => {
          setServerError(state => ({ ...state, message: error.message }));
        });
    } else {
      if (formValues.name === '') {
        const errorMessage = 'Please write a description of the Task.';
        setFormError(state => ({
          ...state,
          name: errorMessage,
        }));
      };
      if (formValues.description === '') {
        const errorMessage = 'Please write a description of the Task.';
        setFormError(state => ({
          ...state,
          description: errorMessage,
        }));
      };
      return;
    };
  };

  const onTakeItHandler = (taskId, e) => {
    e.preventDefault();

    let taskData = {
      ...currentTask,
      inProgress: true,
      takenByUser: user.email
    }

    taskService.edit(taskId, taskData)
      .then(result => {
        editTaskHandler(taskId, taskData);
      })
      .catch((error) => {
        setServerError(state => ({ ...state, message: error.message }));
      });
  }

  const onFinishHandler = (taskId, e) => {
    e.preventDefault();

    if (!isNaN(formValues.hoursOfWork) && formValues.hoursOfWork > 0) {

      let taskData = {
        ...currentTask,
        inProgress: false,
        isFinished: true,
        hoursOfWork: Number(formValues.hoursOfWork)
      }

      taskService.edit(taskId, taskData)
        .then(result => {
          editTaskHandler(taskId, taskData);
        })
        .catch((error) => {
          setServerError(state => ({ ...state, message: error.message }));
        });
    } else {
      const errorMessage = 'Please write valid working hours.';
      setFormError(state => ({
        ...state,
        hoursOfWork: errorMessage,
      }));
      return;
    }
  }

  const ifOwner = user.email === currentTask.owner;

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
              {formError.name &&
                <div style={{ color: 'red' }}>{formError.name}</div>
              }
              <label>Description of the Task:</label>
              <input type="text" placeholder="Add Description"
                name="description"
                value={formValues.description}
                onChange={onChangeHandler}
                onBlur={validateDescription}
              />
              {formError.description &&
                <div style={{ color: 'red' }}>{formError.description}</div>
              }
              {serverError.message &&
                <div style={{ color: 'red' }}>{serverError.message}</div>
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
              {(formError.hoursOfWork && formError.hoursOfWork !== Number(0)) &&
                <div style={{ color: 'red' }}>{formError.hoursOfWork}</div>
              }
              {serverError.message &&
                <div style={{ color: 'red' }}>{serverError.message}</div>
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
