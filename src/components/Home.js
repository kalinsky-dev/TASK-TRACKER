import Task from "./Task"


const Home = ({
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
  )
}

export default Home

