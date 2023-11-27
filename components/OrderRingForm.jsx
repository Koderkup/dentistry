import { useState, useContext } from "react";
import { postData } from "@/utils/fetchData";
import { DataContext } from "@/store/GlobalState";

const OrderRingForm = () => {
const initialState = { name: "", phone: "" };
const [userData, setUserData] = useState(initialState);
const { name, phone } = userData;
 const { state, dispatch } = useContext(DataContext);


const handleChangeInput = (e) => {
  const { name, value } = e.target;
  setUserData({ ...userData, [name]: value });
  dispatch({ type: "NOTIFY", payload: {} });
};
  const emailHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("/send-email", userData, 'email');
    if (res.error)
      return dispatch({ type: "NOTIFY", payload: { error: res.error } });
    return dispatch({ type: "NOTIFY", payload: { success: res.message } });
  };

    return (
      <div
        className="modal fade"
        id="orderRingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Оставьте свой телефон и мы Вам перезвоним!
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Имя:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="ordering"
                    name="name"
                    value={name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPhone" className="form-label">
                    Телефон:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    name="phone"
                    value={phone}
                    onChange={handleChangeInput}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={emailHandler}
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
export default OrderRingForm;
