import { useDispatch, useSelector } from "react-redux";
import { filterByName } from "@/redux/filtersSlice";
import { getFIlter } from "@/redux/selectors";
import styles from "./Form.module.css";
import filter from "./Filter.module.css";

export const Filter = () => {
  const filterValue = useSelector(getFIlter);
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(filterByName(e.target.value));
  const handleRest = () => dispatch(filterByName(""));

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
