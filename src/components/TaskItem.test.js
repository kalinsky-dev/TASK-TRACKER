import { cleanup, render, screen } from '@testing-library/react';
// import  {toBeInTheDocument}  from '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import Task from './Task';




describe('Task', () => {
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
    // console.log({...tasks[0]});
    // console.log(screen.getByText('Task'));
    // const element = await screen.findByText(tasks[0].name)
    // expect(element).toBeInTheDocument();
    // expect(screen.queryByText('Task')).toBeInTheDocument()
    // const element = await screen.findByText(tasks[0].name)
    // expect(element).toBeInTheDocument();
    // console.log(screen.getByText('Task'));
    // const element = screen.getByText('Task')
    // console.log(screen.getByText('Task1'));
    // expect(screen.getByText('This is a Task1')).toBeInTheDocument()
    // expect(screen.getByText('Task')).toBeInTheDocument();

    // const element = screen.queryByText('This is a Task1')
    // expect(screen.getByText('Task1')).toContain('Task1');
    expect(screen.getByText('Task1')).toBeInTheDocument();
    // console.log(screen.getByText('Task1'));
  });
});




// key={tasks[0]._id}


// import { cleanup, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { BrowserRouter } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';

// import { AuthContext } from '../contexts/AuthContext';
// import { TaskContext } from '../contexts/TaskContext';
// import Task from './Task';

// describe('Task', () => {
//   // afterEach(cleanup);

//   test('Double Click', async () => {
//     const tasks = [{
//       name: 'Task',
//       description: 'This is a Task',
//       owner: 'abv@abv.bg',
//       inProgress: false,
//       takenByUser: false,
//       hoursOfWork: 0,
//       isFinished: false,
//       _id: 'id',
//     }]

//     global.window = { location: { pathname: null } };

//     render(
//       <BrowserRouter>
//         <AuthContext.Provider value={{ user: { email: 'abv@abv.bg', isAuthenticated: true } }}>
//           <TaskContext.Provider value={{ tasks }}>
//             <Task key={tasks[0]._id} {...tasks[0]} />
//           </TaskContext.Provider>
//         </AuthContext.Provider>
//       </BrowserRouter >
//     );
//     // console.log({...tasks[0]});
//     // console.log(screen.getByText('Task'));
//     await userEvent.click(screen.queryByText('Description'));

//     expect(global.window.location.pathname).toContain(`/tasks/${tasks[0]._id}`);
//   });
// });

















// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';

// import { AuthContext } from '../contexts/AuthContext';
// import { TaskContext } from '../contexts/TaskContext';
// import Tasks from './Tasks';

// describe('Task', () => {
//   it('Should render the Task name', () => {

//     const tasks = [{
//       name: 'Task',
//       description: 'This is Task1',
//       owner: 'abv@abv.bg',
//       inProgress: false,
//       takenByUser: false,
//       hoursOfWork: 0,
//       isFinished: false,
//       _id: 'id',
//     }]

//     render(
//       <BrowserRouter>
//         <AuthContext.Provider value={{ user: { email: 'abv@abv.bg', isAuthenticated: true } }}>
//           <TaskContext.Provider value={{ tasks }}>
//             <Tasks />
//           </TaskContext.Provider>
//         </AuthContext.Provider>
//       </BrowserRouter>
//     );

//     expect(screen.getByText('Task')).toBeInTheDocument();
//   });
// });
