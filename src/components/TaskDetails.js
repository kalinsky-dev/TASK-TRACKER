import { useState } from 'react';


const TaskDetails = () => {
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
      <input type="submit" className="btn" value="Take it" />
      <input type="submit" className="btn" value="Edit" />
      <input type="submit" className="btn" value="Delete" />
    </form>
  );
};

export default TaskDetails;
