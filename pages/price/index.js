import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { getData, postData } from "@/utils/fetchData";
import s from "../../styles/Price.module.scss";
import { typography } from "@/utils/typography";
const Price = ({ priceProps }) => {
  const initialState = {
    title: "",
    price: "",
    serviceId: "",
  };
  const { state, dispatch } = useContext(DataContext);
  const [prices, setPrices] = useState(priceProps);
  const [servicesTitles, setServiceTitles] = useState([]);
  const [services, setServices] = useState();
  const [pricesDto, setPricesDto] = useState(initialState);
  const [selectedItems, setSelectedItems] = useState([]);
  const { auth } = state;
  const { title, price, serviceId } = pricesDto;
  const { LINK_MOREINFO_COLOR } = typography;

  useEffect(() => {
    setServiceTitles(Array.from(new Set(prices.map((price) => price.service))));
    getData("services").then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { error: res.err } });
      } else {
        setServices(res.services);
      }
    });
    prices.forEach((item) => {
      item.isChecked = false;
    });
  }, []);

  const handleCheck = (id) => {
    setPrices((prevPrices) => {
      const updatedPrices = prevPrices.map((price) => {
        if (price.id === id) {
          return {
            ...price,
            isChecked: !price.isChecked,
          };
        }
        return price;
      });
      return updatedPrices;
    });

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleSubmit = async () => {
    if (auth.user.role !== "admin") {
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "Вы не можете создать. Это привелегия администратора",
        },
      });
    } else if (!title || !price || !serviceId) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Пожалуста заполните все поля." },
      });
    } else {
      const res = await postData("price", { ...pricesDto }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      else {
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      }
    }
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setPricesDto({ ...pricesDto, [name]: value });
  };
  return (
    <div className="container">
      {auth.user &&
        auth.user.role === "admin" &&
        selectedItems.length !== 0 && (
          <div className={s.delete_btn}>
            <h3>Удалить выбранное</h3>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() =>
                dispatch({
                  type: "ADD_MODAL",
                  payload: [
                    {
                      data: selectedItems,
                      id: selectedItems.length,
                      title: ` Выбрано ${selectedItems.length} позиций для удаления`,
                      type: "ADD_PRICE",
                    },
                  ],
                })
              }
            >
              Удалить
            </button>
          </div>
        )}
      {servicesTitles.map((item, index) => (
        <div key={index}>
          <h2 style={{ textAlign: "left" }} className={s.headers}>
            {item}
          </h2>
          <table
            className={`table table-info table-responsive table-striped table-hover`}
          >
            <thead>
              <tr className="table-info">
                <th className="table-info" style={{ width: "85%" }}>
                  Название услуги
                </th>
                <th className="table-info" style={{ textAlign: "center" }}>
                  цена, руб
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-info">
                <td className="table-info" style={{ fontSize: "20px" }}>
                  Консультация
                </td>
                <td
                  className="table-info"
                  style={{ textAlign: "center", fontSize: "20px" }}
                >
                  бесплатно
                </td>
              </tr>
              {prices &&
                prices
                  .filter((price) => price.service === item)
                  .map((chunk) => (
                    <tr key={chunk.id} className={`table-info`}>
                      <td
                        className="table-info"
                        style={{
                          verticalAlign: "middle",
                          fontSize: "20px",
                          color: chunk.isChecked ? "red" : "black",
                        }}
                      >
                        {auth.user && auth.user.role === "admin" && (
                          <input
                            type="checkbox"
                            style={{
                              width: "24px",
                              height: "24px",
                              marginRight: "2%",
                            }}
                            checked={chunk.isChecked}
                            onChange={() => handleCheck(chunk.id)}
                          />
                        )}
                        {chunk.title}
                      </td>
                      <td
                        className="table-info"
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          fontSize: "20px",
                          color: chunk.isChecked ? "red" : "black",
                        }}
                      >
                        <span style={{ color: "blue", fontSize: "16px" }}>
                          от
                        </span>{" "}
                        {chunk.price}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      ))}
      {auth.user && auth.user.role === "admin" && (
        <form
          style={{
            padding: "1em",
            borderRadius: "5px",
          }}
          className={s.price_form}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputTitle1" className="form-label">
              Название услуги
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTitle1"
              aria-describedby="emailHelp"
              name="title"
              value={pricesDto.title}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice1" className="form-label">
              Цена
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPrice1"
              aria-describedby="emailHelp"
              name="price"
              value={pricesDto.price}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              value={pricesDto.serviceId}
              onChange={handleChanges}
              name="serviceId"
            >
              <option value={""}>выберите категорию</option>
              {services &&
                services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: LINK_MOREINFO_COLOR }}
          >
            Создать
          </button>
        </form>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getData("price");
  return {
    props: {
      priceProps: res.prices,
      results: res.result,
    },
  };
}
export default Price;
