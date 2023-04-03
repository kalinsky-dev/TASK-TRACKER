
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { TaskContext } from './contexts/TaskContext';
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
import NotFound from './components/NotFound';
import TaskDelete from './components/TaskDelete';
import TaskDetails from './components/TaskDetails';
import PrivateGuard from './components/common/PrivateGuard';


function App() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    taskService.getAll()
      .then(
        result => {
          setTasks(result)
        })
      .catch((error) => {
        // console.log(error.message);
        // navigate('/')
        // console.log(error);
        if (error.code === '404') {
          return;
        }
      });
  }, []);

  const onTaskClickHandler = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const onDeleteClickHandler = (taskId, e) => {
    e?.preventDefault();
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
    <AuthProvider >
      <div className="container">
        <TaskContext.Provider value={{
          tasks,
          addTaskHandler,
          editTaskHandler,
          deleteTaskHandler,
          sortTaskHandler,
          onTaskClickHandler,
          onDeleteClickHandler
        }}>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route element={<PrivateGuard />}>
                <Route path='/tasks' element={<Tasks />}></Route>
                <Route path='/logout' element={<Logout />}></Route>
                <Route path='/create-task' element={<AddTask />}></Route>
                <Route path='/tasks/:taskId' element={<TaskDetails />}></Route>
                <Route path='/tasks/:taskId/delete' element={<TaskDelete />}></Route>
                <Route path='/auth-error' element={<AuthError />}></Route>
              </Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </main>
        </TaskContext.Provider>
        <Footer />
      </div>
    </AuthProvider >
  );
};


export default App;
