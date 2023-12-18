import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem } from "../store/Actions";
import { deleteData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;
  const item = modal[0];
  const router = useRouter();

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));

    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };


  const handleSubmit = () => {
    console.log(item);
     if (item.type === "ADD_USER") deleteUser(item);

    //     if (item.type === "ADD_SERVICE") deleteService(item);

    //     if (item.type === "DELETE_DOCTOR") deleteDoctor(item);

     dispatch({ type: "ADD_MODAL", payload: [] });
    //   }
    // }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-capitalize" id="exampleModalLabel">
              {/* {modal.length !== 0 && modal[1]} */}
            </h5>
          </div>
          <div className="modal-body">Вы действительно хотите удалить?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Да
            </button>
            <button
              type="close"
              className="btn btn-primary close"
              data-bs-dismiss="modal"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
