import { FaTimes } from 'react-icons/fa'
import { useState } from 'react';


const Task = ({
  name,
  description,
  hoursOfWork,
  takenByUser,
  inProgress,
  isFinished,
  _createdOn,
  _id,
  _ownerId
}) => {

  const [showDeleteUser, setShowDeleteUser] = useState(null)

  // const onDeleteClick = (userId) => {
  //   setShowDeleteUser(userId)
  // }

  return (
    <div className='task'>
      {isFinished ? <h3>{name} <FaTimes style={{ color: 'red', cursor: 'pointer' }} /> </h3> : <h3>{name}</h3>}
      <p>{description}</p>
      <p>Task is created by: {_ownerId}</p>
      {takenByUser ? <p>Task is taken by: {takenByUser}</p> : <p>This task is not taken yet!</p>}
      {inProgress && <p>Task is in progress!</p>}
      {isFinished && <p>Task is resolved for: {hoursOfWork} hours.</p>}
      {/* {showDeleteUser && <UserDelete onClose={onClose} onDelete={onDeleteHandler} />} */}
    </div>
  )
}

export default Task
