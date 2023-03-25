import { FaTimes } from 'react-icons/fa';
// import { useState } from 'react';


const Task = ({
  name,
  description,
  owner,
  inProgress,
  takenByUser,
  hoursOfWork,
  isFinished,
  _createdOn,
  _id,
  _ownerId,
  onTaskClickHandler,
  onDeleteClickHandler
}) => {

  // const [showDeleteUser, setShowDeleteUser] = useState(null)

  // const onDeleteClick = (userId) => {
  //   setShowDeleteUser(userId)
  // }


  return (
    <div className='task' onDoubleClick={() => onTaskClickHandler(_id)}>
      {isFinished ? <h3>{name} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteClickHandler(_id)} /> </h3> : <h3>{name}</h3>}
      <h4>Description: {description}</h4>
      <p>Task is created by: {owner}</p>
      {takenByUser ? <p>Task is taken by: {takenByUser}</p> : <p>This task is not taken yet!</p>}
      {inProgress && <p>Task is in progress!</p>}
      {isFinished && <p>Task is resolved for: {hoursOfWork} hours.</p>}
      {/* {showDeleteUser && <UserDelete onClose={onClose} onDelete={onDeleteHandler} />} */}
    </div>
  );
};

export default Task;

