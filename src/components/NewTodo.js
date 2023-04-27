import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
library.add(fas);

function NewTodo() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTakList] = useState([]);
  const [selectedID, setSelectedID] = useState(-1);
  const [newValue, setNewValue] = useState([]);
  const [isEdit, setIsEdit] = useState(true);

  const handleAddTask = () => {
    if (taskName !== "") {
      setTakList([...taskList, taskName]);
      setTaskName("");
    } else {
      alert("価値入力　して下さい");
    }
  };
  const handlerDeleteTask = (index) => {
    const newtastlist = [...taskList];
    newtastlist.splice(index, 1);
    setTakList(newtastlist);
  };
  const handleEdit = (index) => {
    setNewValue(taskList[index]);
    setSelectedID(index);
    setIsEdit(!isEdit);
  };
  const handleSave = () => {
    if (selectedID !== -1) {
      taskList[selectedID] = newValue;
      setSelectedID(-1);
      setIsEdit(!isEdit);
    }
  };
  return (
    <div className="bg-slate-800 w-screen h-screen pt-20">
      <div className="bg-slate-300 w-[400px] h-[500px] shadow-lg mx-auto rounded-lg">
        {isEdit && (
          <span className=" mx-auto w-full h-full">
            <h2 className="text-[40px] font-bold text-center p-8">Todo List</h2>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="w-[250px] h-[35px] rounded-t-xl rounded-b-sm m-5 focus:ring-4 ring-pink-500"></input>
            <button
              onClick={handleAddTask}
              className="border bg-yellow-400 rounded-xl w-20 h-9 hover:opacity-80 focus:ring-4 ring-yellow-400 focus:border-2 border-white">
              Add
            </button>
          </span>
        )}
        {isEdit ? (
          <>
            {taskList.map((task, index) => {
              return (
                <div
                  className="border p-2 shadow-inner bg-orange-200 flex justify-between rounded-lg"
                  key={index}>
                  {task}
                  <div className="flex gap-x-4">
                    <FontAwesomeIcon
                      onClick={() => handlerDeleteTask(index)}
                      icon="fa-solid fa-trash"
                      className="w-5 h-5 cursor-pointer hover:opacity-70 text-blue-600"
                    />
                    <FontAwesomeIcon
                      onClick={() => handleEdit(index)}
                      icon={faPenToSquare}
                      className="w-5 h-5 cursor-pointer hover:opacity-70 text-blue-600"
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="p-4 m-2 space-x-4 flex  justify-center items-center flex-col space-y-5">
              <h2 className="text-[40px] font-bold text-center p-8">
                Edit Task
              </h2>
              <input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-[70%] h-[35px]"
              />
              <button
                onClick={() => handleSave()}
                className="border bg-yellow-400 rounded-xl w-20 h-9 hover:opacity-80 focus:ring-4 ring-yellow-400 focus:border-2 border-white">
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NewTodo;
