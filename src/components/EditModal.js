import { useState } from "react";

function EditModal({ handlerSave, editValue }) {
  const [editValueChange, setEditValueChange] = useState();
  console.log(editValue);
  return (
    <div className="w-[500px] h-[100px] flex space-x-4 justify-center items-center mt-[100px] border rounded-lg bg-slate-200">
      <input
        value={editValue}
        onChange={(e) => {
          setEditValueChange(e.target.value);
        }}
        className="w-[300px] h-[50px] bg-slate-100 border rounded-lg"
      />
      <button
        onClick={() => {
          handlerSave(editValueChange);
        }}
        className="w-[100px] h-[30px] bg-green-500 rounded-xl hover:ring-2 ring-green-500 hover:border-2 border-slate-200">
        Save
      </button>
    </div>
  );
}

export default EditModal;
