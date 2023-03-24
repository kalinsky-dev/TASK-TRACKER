import { useState, useContext } from 'react';


import * as taskService from '../services/taskService'
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";


const AddTask = () => {
  // const [taskName, setName] = useState('');
  // const [taskDescr, setDescr] = useState('');
  const { addTaskHandler } = useContext(TaskContext)
  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })


  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  let taskData = {
    name: '',
    description: '',
    owner: '',
    inProgress: false,
    takenByUser: false,
    hoursOfWork: 0,
    isFinished: false,
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(formValues);

    taskData.name = formValues.name;
    taskData.description = formValues.description;
    taskData.owner = user.email;

    // console.log(taskData);


    taskService.create(taskData)
      .then(result => {
        // console.log(result);
        addTaskHandler(result);
      })

    // addTaskHandler(formValues);
  }


  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name of the Task</label>
        <input type="text" placeholder="Add Task" name="name" value={formValues.name} onChange={onChangeHandler} />
        <label>Description of the Task</label>
        <input type="text" placeholder="Add Description" name="description" value={formValues.description} onChange={onChangeHandler} />
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;
