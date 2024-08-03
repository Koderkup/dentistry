import Image from "next/image";
import { useContext } from "react";
import { typography } from "@/utils/typography";
import { DataContext } from "@/store/GlobalState";
const RemoveSelected = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { ADD_CONTENT_STYLE, DELETE_IMAGE } = typography;
  return (
    <>
      <div
        className="mb-3 d-flex justify-content-between"
        style={ADD_CONTENT_STYLE}
      >
        <div className="form-check">
          <input
            data-testid="selectAll"
            type="checkbox"
            className="form-check-input mx-1"
            id="exampleCheck1"
            onChange={props.handleSelectionAll}
            checked={props.checked}
            style={{ width: "25px", height: "25px" }}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Выбрать все
          </label>
        </div>
        <button
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-testid="btn"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: props.selectedReviewsForRemove,
                  id: props.selectedReviewsForRemove.length,
                  title: `Выбрано для удаления ${props.selectedReviewsForRemove.length} отзывов`,
                  type: "DELETE_REVIEWS",
                },
              ],
            })
          }
        >
          <Image src={DELETE_IMAGE} width={30} height={30} alt="trash" />
          <span>{props.selectedReviewsForRemove.length}</span>
        </button>
      </div>
    </>
  );
};

export default RemoveSelected;
