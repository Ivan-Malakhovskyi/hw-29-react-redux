import { useState } from "react";
import { useDispatch } from "react-redux";
import { deposit, withdraw } from "@/redux/accountSlice";
import { Balance } from "./Balance";

export const Account = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(Number(0));

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <Balance />

      <button
        type="button"
        onClick={() => {
          const action = deposit(value);
          //GA.send(dispatch(action))

          dispatch(action);
        }}
      >
        Deposit
      </button>
      <button
        type="button"
        onClick={() => {
          const action = withdraw(value);
          //GA.send(dispatch(action))
          dispatch(action);
        }}
      >
        Withdraw
      </button>
    </div>
  );
};
