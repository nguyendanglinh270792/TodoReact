import { useReducer, useRef, useState } from "react";
import EditModal from "./EditModal";
import ListModal from "./ListModal";

const initState = {
  taskName: "",
  taskList: [],
};

// action
const setTaskName = (value) => {
  return {
    type: "set-task",
    value,
  };
};
const addTask = (addNewTask) => {
  return {
    type: "add-task",
    addNewTask,
  };
};
const deleteTask = (index) => {
  return {
    type: "delete-task",
    index,
  };
};
const reducer = (state, action) => {
  switch (action.type) {
    case "set-task":
      return {
        ...state,
        taskName: action.value,
      };
    case "add-task":
      return {
        ...state,
        taskList: [...state.taskList, action.addNewTask],
      };
    case "delete-task":
      const newlisttask = [...state.taskList];
      newlisttask.splice(action.index, 1);
      return {
        ...state,
        taskList: newlisttask,
      };

    default:
      throw new Error("Invalid action");
  }
};
function TodoReact() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { taskName, taskList } = state;
  const taskRef = useRef();
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [editValueSend, setEditValueSend] = useState(-1);
  const [isVisibleEditModal, setisVisibleEditModal] = useState(false);
  const handlerAddTask = () => {
    if (taskName !== "") {
      dispatch(addTask(taskName));
      dispatch(setTaskName(""));
    } else {
      alert("Task name is empty!");
    }
  };
  const handlerDelete = (index) => {
    dispatch(deleteTask(index));
  };
  const handlerEdit = (index) => {
    setisVisibleEditModal(true);
    setEditValueSend(taskList[selectedIndex]);
    setselectedIndex(index);
    console.log(taskList[selectedIndex]);
  };
  const handlerSave = (editValueChange) => {
    if (selectedIndex !== -1) {
      taskList[selectedIndex] = editValueChange;
      setselectedIndex(-1);
      setisVisibleEditModal(false);
    } else {
      throw new Error("Something occored while save !");
    }
  };
  return (
    <div className="w-[700px] h-[500px]  rounded-xl shadow-lg mx-auto mt-20 border-t-4 border-green-200 flex flex-col items-center overflow-auto font-mono">
      {!isVisibleEditModal ? (
        <>
          <span className="font-medium pt-10 italic text-[30px]">
            To do with react
          </span>
          <span className=" mt-10">
            <input
              ref={taskRef}
              value={taskName}
              onChange={(e) => dispatch(setTaskName(e.target.value))}
              className="w-[300px] h-[50px] border border-slate-200 cursor-pointer rounded-lg p-3"
            />
            <button
              onClick={() => handlerAddTask()}
              className="p-3 m-3 border-2 w-[100px] border-yellow-50 rounded-lg bg-green-400 hover:ring-2 ring-green-400">
              Add
            </button>
          </span>
          <span>
            <ListModal
              taskList={taskList}
              handlerDelete={handlerDelete}
              handlerEdit={handlerEdit}
            />
          </span>
        </>
      ) : (
        <>
          <EditModal handlerSave={handlerSave} editvalue={editValueSend} />
        </>
      )}
    </div>
  );
}

export default TodoReact;
