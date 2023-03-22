import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';


const TaskDetails = ({
  name,
  description,
  hoursOfWork,
  takenByUser,
  inProgress,
  isFinished,
  _createdOn,
  _id,
  _ownerId,
  onTaskClickHandler,
  onDeleteClickHandler
}) => {
  const [taskName, setName] = useState('');
  const [taskDescr, setDescr] = useState('');

  const { taskId } = useParams();
  // const ifOwner = userId === _ownerId;
  // const ifUserWhoTakesTheTask = userId === takenByUser;
  const ifOwner = true;
  const UserWhoTakesTheTask = false;
  inProgress = true;
  isFinished = false;

  if (inProgress && !UserWhoTakesTheTask) {
    return (
      <div className="form-control">
        <h2>This Task is in Progress!</h2>
        <Link to="/">Go Back</Link>
      </div>
    )
  } else if (isFinished) {
    return (
      <form className="add-form">
        <div className="form-control">
          <h2>This Task is already Finished!</h2>
          <label>Name of the Task</label>
          <input type="text" placeholder="Add Task" disabled={true} value={taskName} />
          <label>Description of the Task</label>
          <input type="text" placeholder="Add Description" disabled={true} value={taskDescr} />
        </div>
        <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />
      </form>
    )
  } else {
    return (
      <form className="add-form">
        <div className="form-control">
          <label>Name of the Task</label>
          {(ifOwner && !inProgress) ?
            (<input type="text" placeholder="Add Task" value={taskName} onChange={(e) => setName(e.target.value)} />)
            : (<input type="text" placeholder="Add Task" disabled={true} value={taskName} />)}
          <label>Description of the Task</label>
          {(ifOwner && !inProgress) ?
            (<input type="text" placeholder="Add Description" value={taskDescr} onChange={(e) => setDescr(e.target.value)} />)
            : (<input type="text" placeholder="Add Description" disabled={true} value={taskDescr} />)}
        </div>
        {!inProgress && <input type="submit" className="btn" value="Take it" />}
        {(inProgress && UserWhoTakesTheTask) && <input type="submit" className="btn" value="Finish" />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Edit" />}
        {(ifOwner && !inProgress) && <input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteClickHandler(taskId, e)} />}
      </form>
    )
  }


}

export default TaskDetails
