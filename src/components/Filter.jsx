import { useDispatch, useSelector } from "react-redux";
import { getFIlter } from "@/redux/selectors";
import { changeValueFilter } from "@/redux/filtersSlice";
import styles from "./Form.module.css";
import filter from "./Filter.module.css";

export const Filter = () => {
  const filterValue = useSelector(getFIlter);
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(changeValueFilter(e.target.value));
  const handleRest = () => dispatch(changeValueFilter(""));

  return (
    <div>
      <h2 className={styles.title}>Filter</h2>

      <form className={filter.form}>
        <input
          className={styles.input}
          value={filterValue}
          onChange={handleChange}
          type="text"
          name="filter"
        />
        <button
          type="button"
          onClick={handleRest}
          className={filter.btnReset}
          disabled={!filterValue}
        >
          Reset filters
        </button>
      </form>
    </div>
  );
};
