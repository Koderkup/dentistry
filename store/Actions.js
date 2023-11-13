export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_MODAL: "ADD_MODAL",
  ADD_DOCTOR: "ADD_DOCTOR",
  ADD_USER: "ADD_USER",
  ADD_SERVICE: "ADD_SERVICE",
  ADD_ARTICLE: "ADD_ARTICLE",
  ADD_REVIEW: "ADD_REVIEW",
  ADD_ACTION: "ADD_ACTION",
};
export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};

export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};