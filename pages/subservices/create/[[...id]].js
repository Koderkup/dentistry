import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { imageUpload } from "../../../utils/imagesUpload";
import { postData, getData, putData } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import s from "../../../styles/DoctorsManager.module.scss";
import { MdClose } from "react-icons/md";

const SubservicesManager = () => {
  const initialState = {
    subtitle: "",
    article: "",
    serviceId: "",
  };
  const [subservice, setSubservice] = useState(initialState);
  const { subtitle, article, serviceId } = subservice;
  const [subimage, setSubimage] = useState([]);
  const [serviceTitles, setServiceTitles] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`subservices/${id}`, auth.token).then((res) => {
        setSubservice(res.subservice[0]);
        setSubimage(res.subservice[0].subimage);
      });
    } else {
      setOnEdit(false);
      setSubservice(initialState);
      setSubimage([]);
    }
    getData(`services`, auth.token).then((res) => {
      setServiceTitles(res.services);
    });
  }, [id]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSubservice({ ...subservice, [name]: value });
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

    const imgCount = subimage.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setSubimage([...subimage, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...subimage];
    newArr.splice(index, 1);
    setSubimage(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (!subtitle || !article || !serviceId || subimage.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = subimage.filter((img) => !img.url);
    const imgOldURL = subimage.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `subservices/${id}`,
        { ...subservice, subimage: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "subservices",
        { ...subservice, subimage: [...imgOldURL, ...media] },
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
        <title>Subservices Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="subservice">Название</label>
              <select
                id="subservice"
                className="form-select"
                aria-label="Default select example"
                value={subservice.serviceId}
                onChange={handleChangeInput}
                name="serviceId"
              >
                <option value={""}>выберите подуслугу</option>
                {serviceTitles.map((serviceTitle) => (
                  <option key={serviceTitle.id} value={serviceTitle.id}>
                    {serviceTitle.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subtitle">Название</label>
              <input
                type="text"
                name="subtitle"
                id="subtitle"
                value={subtitle}
                placeholder="Название"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <label htmlFor="article">Статья</label>
          <textarea
            name="article"
            id="article"
            cols="50"
            rows="6"
            placeholder="Статья"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={article}
          />
          <button type="submit" className="btn btn-info my-2 px-4">
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
            {subimage.map((img, index) => (
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

export default SubservicesManager;
