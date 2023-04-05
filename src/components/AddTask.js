import { useState, useContext, useEffect } from 'react';


import * as taskService from '../services/taskService'
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";


const AddTask = () => {

  const { addTaskHandler } = useContext(TaskContext)
  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })

  const [formError, setFormError] = useState({
    name: '',
    description: '',
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


  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }


  const validateName = (e) => {
    const name = e.target.value;
    let errorMessage = '';
    if (name.length === 0 || !isNaN(name)) {
      errorMessage = 'Please write a valid name.'
    }
    setFormError(state => ({
      ...state,
      name: errorMessage,
    }));
  };

  const validateDescription = (e) => {
    const description = e.target.value;
    let errorMessage = '';
    if (description.length === 0 || !isNaN(description)) {
      errorMessage = 'Please write a valid description.'
    }
    setFormError(state => ({
      ...state,
      description: errorMessage,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {

      const taskData = {
        name: '',
        description: '',
        owner: '',
        inProgress: false,
        takenByUser: false,
        hoursOfWork: 0,
        isFinished: false,
      };
      taskData.name = formValues.name;
      taskData.description = formValues.description;
      taskData.owner = user.email;
      taskService.create(taskData)
        .then(result => {
          addTaskHandler(result);
        })
        .catch((error) => {
          setServerError(state => ({ ...state, message: error.message }));
        });
    } else {
      if (formValues.name === '') {
        const errorMessage = 'Please write a valid name.';
        setFormError(state => ({
          ...state,
          name: errorMessage,
        }));
      };
      if (formValues.description === '') {
        const errorMessage = 'Please write a valid description.';
        setFormError(state => ({
          ...state,
          description: errorMessage,
        }));
      };
      return;
    }
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name of the Task</label>
        <input type="text" placeholder="Add Task" name="name"
          value={formValues.name}
          onChange={onChangeHandler}
          onBlur={validateName}
        />
        {formError.name &&
          <div style={{ color: 'red' }}>{formError.name}</div>
        }
        <label>Description of the Task</label>
        <input type="text" placeholder="Add Description" name="description"
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
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;
