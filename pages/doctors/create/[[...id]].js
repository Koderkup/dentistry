import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imagesUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import s from "../../../styles/DoctorsManager.module.scss";
import { MdClose } from "react-icons/md";
import { typography } from "@/utils/typography";
const DoctorsManager = () => {
  const initialState = {
    sirname: "",
    fullname: "",
    proff: "",
    description: "",
  };
  const [doctor, setDoctor] = useState(initialState);
  const { sirname, fullname, proff, description } = doctor;
  const { LINK_MOREINFO_COLOR } = typography;
  const [avatar, setAvatar] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`doctors/${id}`, auth.token).then((res) => {
        if(res && res.doctor && res.doctor.length>0) {
        setDoctor(res.doctor[0]);
        setAvatar(res.doctor[0].avatar);
        }
      });
    } else {
      setOnEdit(false);
      setDoctor(initialState);
      setAvatar([]);
    }
  }, [id]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
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

    const imgCount = avatar.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setAvatar([...avatar, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...avatar];
    newArr.splice(index, 1);
    setAvatar(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!sirname || !fullname || !proff || !description || avatar.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = avatar.filter((img) => !img.url);
    const imgOldURL = avatar.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `doctors/${id}`,
        { ...doctor, avatar: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "doctors",
        { ...doctor, avatar: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div className={`${s.doctors_manager} container`}>
      <Head>
        <title>Doctors Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="sirname">Фамилия</label>
              <input
                type="text"
                name="sirname"
                id="sirname"
                value={sirname}
                placeholder="Фамилия"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="fullname">Полное имя</label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                id="fullname"
                placeholder="Полное имя"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="proff">Профессиональное направление</label>
              <input
                type="text"
                name="proff"
                value={proff}
                id="proff"
                placeholder="Профессиональное направление"
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
            style={{ backgroundColor: LINK_MOREINFO_COLOR }}
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
                data-testid="file-input"
              />
            </div>
          </div>

          <div className="row img-up mx-0">
            {avatar.map((ava, index) => (
              <div key={index} className="file_img my-1">
                <p
                  onClick={() => deleteImage(index)}
                  style={{ float: "right" }}
                >
                  <MdClose style={{ fontSize: "32px", color: "red" }} />
                </p>
                <img
                  src={ava.url ? ava.url : URL.createObjectURL(ava)}
                  alt=""
                  className="img-thumbnail rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorsManager;
