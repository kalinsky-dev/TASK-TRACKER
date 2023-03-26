

// const Test = () => {
//   return (
//     <div className="form-control">
//       {(ifOwner && !inProgress) &&
//         (<>
//           <label>Name of the Task:</label>
//           <input type="text" placeholder="Add Task"
//             name="name"
//             value={formValues.name}
//             onChange={onChangeHandler}
//           />
//           <label>Description of the Task:</label>
//           <input type="text" placeholder="Add Description"
//             name="description"
//             value={formValues.description}
//             onChange={onChangeHandler}
//           />
//         </>)
//       }
//       {(ifOwner && inProgress) &&
//         (<>
//           <label>Name of the Task:</label>
//           <input type="text" placeholder="Add Task"
//             name="name"
//             value={formValues.name}
//             onChange={onChangeHandler}
//             disabled={true}
//           />
//           <label>Description of the Task:</label>
//           <input type="text" placeholder="Add Description"
//             name="description"
//             value={formValues.description}
//             onChange={onChangeHandler}
//             disabled={true}
//           />
//           <label>Working hours for the Task:</label>
//           <input type="text" placeholder="Add Description"
//             name="hoursOfWork"
//             value={formValues.hoursOfWork}
//             onChange={onChangeHandler}
//           />
//         </>)
//       }
//     </div>
//   )
// }

// export default Test





{/* <div className="form-control">
<label>Name of the Task</label>
{(ifOwner && !inProgress) ?
  (<input type="text" placeholder="Add Task"
    name="name"
    value={formValues.name}
    onChange={onChangeHandler}
  />)
  : (<input type="text" placeholder="Add Task"
    name="name"
    disabled={true}
    value={formValues.name}
  />)
  }
<label>Description of the Task</label>
{(ifOwner && !inProgress) ?
  (<input type="text" placeholder="Add Description"
    name="description"
    value={formValues.description}
    onChange={onChangeHandler}
  />)
  : (<input type="text" placeholder="Add Description"
    name="description"
    disabled={true}
    value={formValues.description}
  />)}
</div> */}