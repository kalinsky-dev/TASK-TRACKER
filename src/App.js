
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import { AuthContext } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import * as taskService from './services/taskService';

import About from './components/About';
import AddTask from './components/AddTask';
import AuthError from './components/AuthError';
import Footer from './components/Footer';
import Header from "./components/Header";
import Home from "./components/Home";
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
    navigate(`/${taskId}`);
  };

  const onDeleteClickHandler = (taskId, e) => {
    e?.preventDefault();
    console.log(taskId);
    navigate(`/${taskId}/delete`);
  };

  const onDeleteHandler = (taskId, e) => {
    e?.preventDefault();
    console.log(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
    navigate('/');
  };

  const addTaskHandler = (gameData) => {
    setTasks(state => [
      ...state,
      {
        ...gameData,
        _id: uniqid(),
      },
    ]);

    navigate('/');
  };

  useEffect(() => {
    taskService.getAll()
      .then(
        result => {
          // console.log(auth.email);
          // console.log(typeof result.code);
          if (auth.email === undefined) {
            navigate('/register')
          } else if (result.code === Number(404) && auth.email !== undefined) {
            navigate('/create-task')
          } else {
            console.log(result);
            setTasks(result);
          }
        });
  }, []);

  return (
    <AuthContext.Provider value={{ user: auth, userLoginHandler, userLogoutHandler }}>
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home
              tasks={tasks}
              onTaskClickHandler={onTaskClickHandler}
              onDeleteClickHandler={onDeleteClickHandler} />}>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/create-task' element={<AddTask addTaskHandler={addTaskHandler} />}></Route>
            <Route path='/:taskId' element={<TaskDetails
              tasks={tasks}
              onDeleteClickHandler={onDeleteClickHandler} />}></Route>
            <Route path='/:taskId/delete' element={<TaskDelete
              onDeleteHandler={onDeleteHandler} />}>
            </Route>
            <Route path='/auth-error' element={<AuthError />}></Route>
            <Route path='/404' element={<ServerError />}></Route>
            <Route path='/about' element={<About />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};


export default App;
