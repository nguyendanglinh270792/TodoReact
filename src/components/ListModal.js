import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ListModal({ taskList, handlerEdit, handlerDelete }) {
  return (
    <div className="p-4 w-auto h-[300px] overflow-auto mr-10 flex flex-col space-y-4">
      {taskList.map((task, index) => {
        return (
          <ul>
            <li
              className="p-4 bg-slate-100 border w-[400px] flex justify-between"
              key={index}>
              <p>{task}</p>
              <span className="space-x-4 text-blue-400">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => {
                    handlerEdit(index);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => {
                    handlerDelete(index);
                  }}
                />
              </span>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
export default ListModal;
