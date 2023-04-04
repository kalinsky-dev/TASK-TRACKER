import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import Task from './Task';

describe('Task Test', () => {
  afterEach(cleanup);

  test('Should render the Task name', () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: false,
      takenByUser: false,
      hoursOfWork: 0,
      isFinished: false,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );
    expect(screen.getByText(tasks[0].name)).toBeInTheDocument();
  });

  test('Should render the Task Description', async () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: false,
      takenByUser: false,
      hoursOfWork: 0,
      isFinished: false,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );

    const element = await screen.findByText(`Description: ${tasks[0].description}`);
    expect(element).toBeInTheDocument();

  });

  test('Should render the Task Owner', async () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: false,
      takenByUser: false,
      hoursOfWork: 0,
      isFinished: false,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );

    const element = await screen.findByText(`Task is created by: ${tasks[0].owner}`);
    expect(element).toBeInTheDocument();

  });

  test('Should render if the Task is in Progress', async () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: true,
      takenByUser: 'abv@abv.bg',
      hoursOfWork: 0,
      isFinished: false,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );

    const element = await screen.findByText('Task is in progress!');
    expect(element).toBeInTheDocument();

  });

  test('Should render the User, who has taken the Task', async () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: true,
      takenByUser: 'abv@abv.bg',
      hoursOfWork: 0,
      isFinished: false,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );

    const element = await screen.findByText(`Task is taken by: ${tasks[0].takenByUser}`);
    expect(element).toBeInTheDocument();

  });

  test('Should render the hours needed to resolve the Task', async () => {
    const tasks = [{
      name: 'Task1',
      description: 'This is a Task1',
      owner: 'abv@abv.bg',
      inProgress: false,
      takenByUser: 'abv@abv.bg',
      hoursOfWork: 3,
      isFinished: true,
      _id: 'id',
    }]

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { email: 'abv@abv.bg' }, isAuthenticated: true }}>
          <TaskContext.Provider value={{ tasks }}>
            <Task key={tasks[0]._id} {...tasks[0]} />
          </TaskContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter >
    );

    const element = await screen.findByText(`Task is resolved for: ${tasks[0].hoursOfWork} hours.`);
    expect(element).toBeInTheDocument();

  });

});



















