import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";
import { imageImgurUpload } from "../../utils/imagesUpload";
import s from "../../styles/CreateContent.module.scss";
import { MdClose } from "react-icons/md";

const ContentManager = () => {
  const [image, setImage] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
 
  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = image.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImage([...image, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...image];
    newArr.splice(index, 1);
    setImage(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user && auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

      if (image.length === 0)
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please add the file." },
        });
        let media = [];
        if (image.length > 0) media = await imageImgurUpload(image[0]);
        console.log(media);
// try {
//   let res;
//   res = await postData("uploads", image, auth.token);
//   if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

//   return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
// } catch (error) {
//   console.error("Error:", error);
//   return dispatch({
//     type: "NOTIFY",
//     payload: { error: "Image upload failed" },
//   });
// }
  };
  return (
    <div className={`container`}>
      <Head>
        <title>Content Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <div className="row img-up mx-auto">
            {image.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />
                <p onClick={() => deleteImage(index)}>
                  <MdClose style={{ fontSize: "32px", color: "red" }} />
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-info my-2 px-4 mx-auto"
          style={{ maxWidth: "120px", maxHeight: "40px" }}
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default ContentManager;
