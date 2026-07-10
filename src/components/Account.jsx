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

      <button type="button" onClick={() => dispatch(deposit(value))}>
        Deposit
      </button>
      <button type="button" onClick={() => dispatch(withdraw(value))}>
        Withdraw
      </button>
    </div>
  );
};
