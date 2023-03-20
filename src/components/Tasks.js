import Task from "./Task"



const Tasks = ({ tasks }) => {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task._id} {...task} />
      ))}
    </>
  )
}

export default Tasks

