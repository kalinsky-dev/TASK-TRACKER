import Task from "./Task";



const Home = ({ tasks }) => {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task._id} {...task} />
      ))}
    </>
  );
};

export default Home;

