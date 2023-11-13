import { useContext } from "react";
import { DataContext } from "@/store/GlobalState";
import { deleteItem } from "@/store/Actions";
const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const {modal} = state;
  const handleSubmit = () => {
    dispatch(deleteItem());
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
               {modal.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Потвердить
              </button>
              <button type="button" className="btn btn-secondary">
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
