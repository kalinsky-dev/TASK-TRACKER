import Task from "./Task";


const Tasks = ({
  tasks,
  onTaskClickHandler,
  onDeleteClickHandler
}) => {

  const hasTask = tasks.length > 0;

  if (hasTask) {
    return (
      <>
        {tasks.map((task) => (
          <Task key={task._id} {...task}
            onTaskClickHandler={onTaskClickHandler}
            onDeleteClickHandler={onDeleteClickHandler}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        <h2>You haven't created a Task yet!</h2>
        <h2>Try it now...</h2>
      </>
    )
  }


};

export default Tasks;

