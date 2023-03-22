import { Link, useParams } from 'react-router-dom';



const TaskDelete = ({
  onDeleteHandler,
}) => {
  const { taskId } = useParams();

  return (
    <form className="add-form">
      <div className="form-control">
        <h2>Are you sure you want to delete this Task?</h2>
      </div>
      <Link to="/"><input type="submit" className="btn" value="Back" /></Link>
      <Link to="/"><input type="submit" className="btn" value="Delete" style={{ backgroundColor: 'red' }} onClick={(e) => onDeleteHandler(taskId, e)} /></Link>
    </form>
  );
};

export default TaskDelete;


