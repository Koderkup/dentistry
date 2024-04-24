import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem, deleteItems, updateItem } from "../store/Actions";
import { deleteData, deleteDataArray, patchData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;
  const router = useRouter();
  const { id } = router.query;

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteDoctor = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`doctors/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteService = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`services/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteWidget = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`widgets/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteAction = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`actions/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteArticle = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`articles/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };
  const deleteSubService = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`subservices/${item.id}`, auth.token).then((res) => {
      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }
      router.push("/services");
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteReview = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`reviews/${item.id}`, auth.token).then((res) => {
      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteSubServiceDirection = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`subservice-direction/subdirection/${item.id}`, auth.token).then((res) => {
      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }
      router.back();
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deletePrices = (item) => {
    dispatch(deleteItems(item.data, item.type));
    deleteDataArray(`price/`, item.data, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteReviews = (item) => {
    dispatch(deleteItems(item.data, item.type));
    deleteDataArray(`reviews/`, item.data, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const publicReview = (item) => {
    dispatch(updateItem([item], item.id, item.data, item.type));
   patchData(`reviews/${item.id}`, item.data, auth.token).then((res) =>{
    if(res.err)
    return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    console.log(res)
  return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   })
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "ADD_USER") deleteUser(item);
        if (item.type === "ADD_SERVICE") deleteService(item);
        if (item.type === "ADD_SUBSERVICE") deleteSubService(item);
        if (item.type === "ADD_DOCTOR") deleteDoctor(item);
        if (item.type === "ADD_PRICE") deletePrices(item);
        if (item.type === "ADD_ACTION") deleteAction(item);
        if (item.type === "ADD_ARTICLE") deleteArticle(item);
        if (item.type === "ADD_SUBSERVICE_DIRECTION") deleteSubServiceDirection(item);
        if (item.type === "ADD_WIDGET") deleteWidget(item);
        if (item.type === "DELETE_REVIEW") deleteReview(item);
        if (item.type === "ADD_REVIEW") publicReview(item);
        if (item.type === "DELETE_REVIEWS") deleteReviews(item);
      }
      dispatch({ type: "ADD_MODAL", payload: [] });
    }
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
              {Array.isArray(modal) && modal.length !== 0 ? modal[0].title : ""}
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
