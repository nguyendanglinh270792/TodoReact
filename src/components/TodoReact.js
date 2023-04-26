import { useReducer, useRef } from "react";

const initState = { jobName: "", noteContent: "", jobList: [] };
const reducer = (state, actions) => {
  switch (actions.type) {
    case "set-value":
      return {
        ...state,
        jobName: actions.value,
      };
    case "set-content":
      return {
        ...state,
        noteContent: actions.value,
      };
    case "add-job":
      return {
        ...state,
        jobList: [...state.jobList, actions.newJob],
      };
    case "delete-job":
      const newJobList = [...state.jobList];
      newJobList.splice(actions.id, 1);
      return {
        ...state,
        jobList: newJobList,
      };
    default:
      throw new Error("invalid Ation");
  }
};
// action definition

const setJob = (value) => {
  return {
    type: "set-value",
    value,
  };
};
const setNoteContent = (value) => {
  return {
    type: "set-content",
    value,
  };
};
const addValue = (newJob) => {
  return { type: "add-job", newJob };
};
const deleteJob = (id) => {
  return {
    type: "delete-job",
    id,
  };
};

function TodoReact() {
  const refJob = useRef();
  const [state, dispatch] = useReducer(reducer, initState);
    const { jobName, noteContent, jobList } = state;
    
  const handlerSubmit = () => {
    if (jobName !== "" && noteContent !== "") {
      const newJob = { jobName, noteContent };
      dispatch(addValue(newJob));
      dispatch(setJob(""));
      dispatch(setNoteContent(""));
      refJob.current.focus();
    } else {
      alert("価値　入力　して下さい");
    }
  };
  const handlerDelete = (id) => {
    dispatch(deleteJob(id));
  };
    
  return (
    <div className="p-10 font-mono flex gap-20 ">
      <span className="flex flex-col">
        <h1 className="text-[100px]  font-bold text-orange-400">Todo</h1>
        Job :
        <input
          ref={refJob}
          value={jobName}
          onChange={(e) => dispatch(setJob(e.target.value))}
          placeholder="enter your Job"
          className="border-2 border-orange-200 w-[200px] h-[25px] rounded-t-xl"
        />
        Note :
        <textarea
          value={noteContent}
          onChange={(e) => dispatch(setNoteContent(e.target.value))}
          placeholder="enter your Note"
          className="border-2 border-orange-200 w-[200px] h-[100px] rounded-t-xl"
        />
        <button
          className=" border-2 rounded-2xl w-[100px] h-[50px] mt-10 ml-5 bg-gradient-to-bl from-orange-100 via-pink-100 to-purple-300 hover:ring-4 ring-blue-100 animate-bounce"
          onClick={handlerSubmit}>
          Submit
        </button>
      </span>
      <span className="mx-auto mt-10">
        <h2 className="text-[20px] p-3">List Jobs</h2>
        <ul className="w-[400px] h-[400px] overflow-auto border-2 bg-slate-300">
          {jobList.map((job, index) => {
            return (
              <li key={index} className="border m-2">
                <div>
                  <p className="p-2">Name of Job:</p>
                  {job.jobName}
                  <p className="p-2">note content:</p>
                  {job.noteContent}
                </div>
                <button
                  onClick={()=>handlerDelete(index)}
                  className="border rounded-xl bg-yellow-300 p-2">
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </span>
    </div>
  );
}
export default TodoReact;
