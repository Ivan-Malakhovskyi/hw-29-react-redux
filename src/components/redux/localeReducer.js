export const localeReducer = (state = { lang: "uk" }, action) => {
  console.log("🚀 ~ localeReducer ~ action:", action);
  switch (action.type) {
    case "locale/changeLang":
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};

export const changeLang = (value) => {
  return {
    type: "locale/changeLang",
    payload: value,
  };
};
