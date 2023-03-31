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

  const [error, setError] = useState({
    name: '',
    description: '',
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
  }, [setIsFormValid, formValues, error]);


  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }


  const validateName = (e) => {
    const name = e.target.value;
    let errorMessage = '';
    // console.log(name);
    if (name.length === 0) {
      errorMessage = 'Please write a valid name.'
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
      errorMessage = 'Please write a valid description.'
    }
    setError(state => ({
      ...state,
      description: errorMessage,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log(isFormValid);

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
    } else {
      if (formValues.name === '') {
        const errorMessage = 'Please write a valid name.';
        setError(state => ({
          ...state,
          name: errorMessage,
        }));
      };
      if (formValues.description === '') {
        const errorMessage = 'Please write a valid description.';
        setError(state => ({
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
        {error.name &&
          <div style={{ color: 'red' }}>{error.name}</div>
        }
        <label>Description of the Task</label>
        <input type="text" placeholder="Add Description" name="description"
          value={formValues.description}
          onChange={onChangeHandler}
          onBlur={validateDescription}
        />
        {error.description &&
          <div style={{ color: 'red' }}>{error.description}</div>
        }
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;
