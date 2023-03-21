import { useState } from 'react';


const AddTask = () => {
  const [taskName, setName] = useState('');
  const [taskDescr, setDescr] = useState('');



  return (
    <form className="add-form">
      <div className="form-control">
        <label>Name of the Task</label>
        <input type="text" placeholder="Add Task" value={taskName} onChange={(e) => setName(e.target.value)} />
        <label>Description of the Task</label>
        <input type="text" placeholder="Add Description" value={taskDescr} onChange={(e) => setDescr(e.target.value)} />
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  )
}

export default AddTask
