import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imagesUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import s from "../../../styles/DoctorsManager.module.scss";
import { MdClose } from "react-icons/md";
import { typography } from "@/utils/typography";
const ServicesManager = () => {
  const initialState = {
    title: "",
    intro: "",
    description: "",
  };
  const [service, setService] = useState(initialState);
  const { title, intro, description } = service;
 const { LINK_MOREINFO_COLOR} = typography;
  const [image, setImage] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`services/${id}`, auth.token).then((res) => {
        setService(res.service[0]);
        setImage(res.service[0].image);
      });
    } else {
      setOnEdit(false);
      setService(initialState);
      setImage([]);
    }
  }, [id]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

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
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!title || !intro || !description || image.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = image.filter((img) => !img.url);
    const imgOldURL = image.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `services/${id}`,
        { ...service, image: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "services",
        { ...service, image: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  return (
    <div className={`container`}>
      <Head>
        <title>Services Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="title">Название</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Название"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="intro">Краткое описание</label>
              <input
                type="text"
                name="intro"
                value={intro}
                id="intro"
                placeholder="Краткое описание"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <label htmlFor="description">Описание</label>
          <textarea
            name="description"
            id="description"
            cols="50"
            rows="6"
            placeholder="Описание"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />
          <button
            type="submit"
            className="btn my-2 px-4"
            style={{ backgroundColor : LINK_MOREINFO_COLOR }}
          >
            {onEdit ? "Обновить" : "Создать"}
          </button>
        </div>

        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
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

          <div className="row img-up mx-0">
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
      </form>
    </div>
  );
};

export default ServicesManager;
