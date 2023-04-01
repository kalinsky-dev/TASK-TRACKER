import { useContext } from 'react'

import { TaskContext } from "../contexts/TaskContext";

import Task from "./Task";


const Tasks = () => {
  const { tasks } = useContext(TaskContext)
  const hasTask = tasks.length > 0;

  if (hasTask) {
    return (
      <>
        {tasks.map((task) => (
          <Task key={task._id} {...task} />
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

