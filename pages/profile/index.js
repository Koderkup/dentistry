import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import Image from "next/image";
import s from "../../styles/Profile.module.scss";
import { FaCamera } from "react-icons/fa";
import valid from "@/utils/valid";
import { patchData, deleteData } from "@/utils/fetchData";
import { imageUpload } from "../../utils/imagesUpload";

const Profile = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialSate);
  const { avatar, name, password, cf_password } = data;
  const [preview, setPreview] = useState(null);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      });

    setData({ ...data, avatar: file });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    if (auth.user) {
      deleteData("user", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch({
            type: "AUTH",
            payload: {},
          });
          return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }
    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) {
      media = await imageUpload([avatar]);
    }
    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0] : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  useEffect(() => {
    if (auth.user)
      setData({ ...data, name: auth.user.name, avatar: auth.user.avatar.url });
  }, [auth.user]);

  const removeAvatar = () => {
    setData({ ...data, avatar: null });
    setPreview(process.env.DEFAULT_USER_IMAGE);
  };

  if (!auth.user) return null;
  return (
    <div className="container">
      <section className="row text-secondary my-3">
        <div className="col-md-4">
          <h3 className="text-uppercase">
            {auth.user && auth.user.role === "user"
              ? "Профиль пользователя"
              : "Профиль администратора"}
          </h3>
          <div className="avatar">
            <Image
              src={
                preview
                  ? preview
                  : auth.user
                  ? auth.user.avatar.url
                  : process.env.DEFAULT_USER_IMAGE
              }
              width={150}
              height={150}
              alt="user_photo"
              style={{ borderRadius: "50%" }}
              priority={true}
            />
            <span>
              <label
                htmlFor="file_up"
                style={{
                  marginLeft: "-5.25rem",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                <FaCamera className={s.camera_icon} />
                {!preview && (
                  <i
                    style={{
                      color: "red",
                      textDecoration: "underline",
                      marginLeft: "1.5rem",
                    }}
                  >
                    Изменить
                  </i>
                )}
                {preview === process.env.DEFAULT_USER_IMAGE && (
                  <i
                    style={{
                      color: "red",
                      textDecoration: "underline",
                      marginLeft: "1.5rem",
                    }}
                  >
                    Загрузить
                  </i>
                )}
              </label>
              {preview && preview !== process.env.DEFAULT_USER_IMAGE && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={removeAvatar}
                  style={{ marginLeft: "10px" }}
                >
                  Удалить фото
                </button>
              )}
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
                style={{ opacity: 0 }}
              />
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="ваше имя"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={auth.user && auth.user.email}
              className="form-control"
              placeholder="ваш email"
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Новый пароль:</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Ваш новый пароль"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cf_password">Подтвердите Ваш новый пароль:</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              className="form-control"
              placeholder="подтвердите Ваш новый пароль"
              onChange={handleChange}
            />
          </div>
          <p></p>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between",
            }}
          >
            <button
              className="btn btn-info"
              disabled={notify.loading}
              onClick={handleUpdateProfile}
            >
              Обновить
            </button>
            <button
              className="btn btn-danger"
              disabled={notify.loading}
              onClick={handleDeleteProfile}
            >
              Удалить
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
