import { useState } from 'react';


const AddTask = ({ addTaskHandler }) => {
  // const [taskName, setName] = useState('');
  // const [taskDescr, setDescr] = useState('');

  const [formValues, setFormValues] = useState({
    taskName: '',
    taskDescr: '',
  })


  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);

    addTaskHandler(formValues)
  }


  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name of the Task</label>
        <input type="text" placeholder="Add Task" name="taskName" value={formValues.taskName} onChange={onChangeHandler} />
        <label>Description of the Task</label>
        <input type="text" placeholder="Add Description" name="taskDescr" value={formValues.taskDescr} onChange={onChangeHandler} />
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;
