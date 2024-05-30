import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imagesUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import s from "../../../styles/DoctorsManager.module.scss";
import { MdClose } from "react-icons/md";
import { typography } from "@/utils/typography";
const SubDirectionManager = () => {
  const initialState = {
    dirtitle: "",
    dirarticle: "",
    subserviceId: "",
  };
  const [subDirection, setSubDirection] = useState(initialState);
  const { dirtitle, dirarticle, subserviceId } = subDirection;
  const [dirimage, setDirImage] = useState([]);
  const [subServiceTitles, setSubServiceTitles] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  const { LINK_MOREINFO_COLOR } = typography;
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`subservice-direction/subdirection/${id}`, auth.token).then(
        (res) => {
          setSubDirection(res.subServiceDirection[0]);
          setDirImage(res.subServiceDirection[0].dirimage);
        }
      );
    } else {
      setOnEdit(false);
      setSubDirection(initialState);
      setDirImage([]);
    }
    getData(`subservices`, auth.token).then((res) => {
      setSubServiceTitles(res.subServices);
    });
  }, [id]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSubDirection({ ...subDirection, [name]: value });
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

    const imgCount = dirimage.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setDirImage([...dirimage, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...dirimage];
    newArr.splice(index, 1);
    setDirImage(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user && auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!dirtitle || !dirarticle || !subserviceId || dirimage.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = dirimage.filter((img) => !img.url);
    const imgOldURL = dirimage.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `subservice-direction/subdirection/${id}`,
        { ...subDirection, dirimage: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "subservice-direction/subdirection",
        { ...subDirection, dirimage: [...imgOldURL, ...media] },
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
        <title>Subservices Direction Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="subDiraction">Название подуслуги</label>
              <select
                id="subDiraction"
                className="form-select"
                aria-label="Default select example"
                value={subDirection.subserviceId}
                onChange={handleChangeInput}
                name="subserviceId"
              >
                <option value={""}>выберите подуслугу</option>
                {subServiceTitles &&
                  subServiceTitles.map((subServiceTitle) => (
                    <option key={subServiceTitle.id} value={subServiceTitle.id}>
                      {subServiceTitle.subtitle}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="dirtitle">Название</label>
              <input
                type="text"
                name="dirtitle"
                id="dirtitle"
                value={dirtitle}
                placeholder="Название"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <label htmlFor="article">Статья</label>
          <textarea
            name="dirarticle"
            id="dirarticle"
            cols="50"
            rows="6"
            placeholder="Статья"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={dirarticle}
          />
          <button type="submit" className="btn my-2 px-4" style={{backgroundColor: LINK_MOREINFO_COLOR}}>
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
            {dirimage &&
              dirimage.map((img, index) => (
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

export default SubDirectionManager;
