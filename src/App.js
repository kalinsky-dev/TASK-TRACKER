
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { TaskContext } from './contexts/TaskContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import * as taskService from './services/taskService';

import About from './components/About';
import AddTask from './components/AddTask';
import AuthError from './components/AuthError';
import Footer from './components/Footer';
import Header from "./components/Header";
import Home from "./components/Home"
import Tasks from "./components/Tasks";
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import ServerError from './components/ServerError';
import TaskDelete from './components/TaskDelete';
import TaskDetails from './components/TaskDetails';


function App() {
  const [tasks, setTasks] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});
  const navigate = useNavigate();

  useEffect(() => {
    taskService.getAll()
      .then(
        result => {
          // console.log(auth.email);
          // console.log(typeof result.code);
          // if (auth.email === undefined) {
          //   navigate('/')
          // } else if (result.code === Number(404) && auth.email !== undefined) {
          //   navigate('/create-task')
          // } else {
          // console.log(result);
          // console.log(result);
          // console.log(result.code);

          if (result.code !== Number(404)) {
            setTasks(result);
          }
          // }
        });
  }, []);


  // const [tasks, setTasks] = useState([
  //   {
  //     name: 'Bug_1',
  //     description: 'Bug when we start the module',
  //     hoursOfWork: null,
  //     takenByUser: null,
  //     inProgress: false,
  //     isFinished: false,
  //     _createdOn: '01.01.2022',
  //     _id: '1',
  //     _ownerId: 'Kalin'
  //   },
  //   {
  //     name: 'Bug_2',
  //     description: 'Bug with the onboarding emails',
  //     hoursOfWork: 2,
  //     takenByUser: 'Ivancho',
  //     inProgress: false,
  //     isFinished: true,
  //     _createdOn: '02.01.2022',
  //     _id: '2',
  //     _ownerId: 'Kalin'
  //   },
  //   {
  //     name: 'Bug_3',
  //     description: 'Bug with the Contact Us Page',
  //     hoursOfWork: null,
  //     takenByUser: null,
  //     inProgress: false,
  //     isFinished: false,
  //     _createdOn: '03.01.2022',
  //     _id: '3',
  //     _ownerId: 'Ivancho'
  //   },
  // ]);


  const userLoginHandler = (authData) => {
    setAuth(authData)
  }

  const userLogoutHandler = (authData) => {
    setAuth({})
  }

  const onTaskClickHandler = (taskId) => {
    console.log(taskId);
    navigate(`/tasks/${taskId}`);
  };


  // const onTakeItHandler = (taskId, e) => {
  //   e.preventDefault();
  //   console.log('TakeIt ', taskId);
  //   // navigate(`/`);
  // };

  // const onFinishHandler = (taskId, e) => {
  //   e.preventDefault();
  //   console.log('Finish ', taskId);
  //   // navigate(`/`);
  // };



  const onDeleteClickHandler = (taskId, e) => {
    e?.preventDefault();
    console.log(taskId);
    navigate(`/tasks/${taskId}/delete`);
  };



  const addTaskHandler = (taskData) => {
    setTasks(state => [...state, taskData]);
    navigate('/tasks');
  };

  const editTaskHandler = (taskId, taskData) => {
    setTasks(state => state.map(x => x._id === taskId ? taskData : x));
    navigate('/tasks');
  }

  const deleteTaskHandler = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    navigate('/tasks');
  }

  const sortTaskHandler = (sortedData) => {
    setTasks(sortedData);
    navigate('/tasks');
  };



  return (
    <AuthContext.Provider value={{ user: auth, userLoginHandler, userLogoutHandler }}>
      <div className="container">
        <TaskContext.Provider value={{ tasks, addTaskHandler, editTaskHandler, deleteTaskHandler, sortTaskHandler }}>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/tasks' element={<Tasks
                tasks={tasks}
                onTaskClickHandler={onTaskClickHandler}
                onDeleteClickHandler={onDeleteClickHandler} />}>
              </Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/logout' element={<Logout />}></Route>
              <Route path='/create-task' element={<AddTask />}></Route>
              <Route path='/tasks/:taskId' element={<TaskDetails
                tasks={tasks}
                // onTakeItHandler={onTakeItHandler}
                // onFinishHandler={onFinishHandler}
                onDeleteClickHandler={onDeleteClickHandler} />}>
              </Route>
              <Route path='/tasks/:taskId/delete' element={<TaskDelete />}>
              </Route>
              <Route path='/auth-error' element={<AuthError />}></Route>
              <Route path='/404' element={<ServerError />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Routes>
          </main>
        </TaskContext.Provider>
        <Footer />
      </div>
    </AuthContext.Provider >
  );
};


export default App;
