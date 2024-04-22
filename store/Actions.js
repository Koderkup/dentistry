export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_MODAL: "ADD_MODAL",
  ADD_DOCTOR: "ADD_DOCTOR",
  ADD_USER: "ADD_USER",
  ADD_SERVICE: "ADD_SERVICE",
  ADD_SUBSERVICE: "ADD_SUBSERVICE",
  ADD_SUBSERVICE_DIRECTION: "ADD_SUBSERVICE_DIRECTION",
  ADD_ARTICLE: "ADD_ARTICLE",
  ADD_REVIEW: "ADD_REVIEW",
  ADD_REVIEW: "ADD_REVIEWS",
  ADD_ACTION: "ADD_ACTION",
  ADD_WIDGET: "ADD_WIDGET",
  ADD_PRICE: "ADD_PRICE",
};
export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item.id !== id);
  return { type, payload: newData };
};

export const deleteItems = (ids, type) => {
  const newData = ids.filter((id) => {
    if (!ids.includes(id)) {
      return id;
    }
  });
  return { type, payload: newData };
};
export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item.id === id ? post : item));
  return { type, payload: newData };
};
