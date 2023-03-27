import Task from "./Task";


const Tasks = ({
  tasks,
  onTaskClickHandler,
  onDeleteClickHandler
}) => {

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
};

export default Tasks;

