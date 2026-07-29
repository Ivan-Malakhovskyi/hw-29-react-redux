import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "@/redux/users/selectors";
import { changeValueFilter } from "@/redux/users/filtersSlice";
import baseFormStyles from "../styles/Form.module.css";
import filterStyles from "./Filter.module.css";

export const Filter = () => {
  const filterValue = useSelector(selectFilters);
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(changeValueFilter(e.target.value));
  const handleRest = () => dispatch(changeValueFilter(""));

  return (
    <>
      <h2 className={baseFormStyles.title}>Filter</h2>

      <form className={filterStyles.form}>
        <input
          className={filterStyles.input}
          value={filterValue}
          onChange={handleChange}
          type="text"
          name="filter"
        />
        <button
          className={filterStyles.button}
          type="button"
          onClick={handleRest}
          disabled={!filterValue}
        >
          Reset filters
        </button>
      </form>
    </>
  );
};
