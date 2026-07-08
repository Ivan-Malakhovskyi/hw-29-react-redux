import { useSelector } from "react-redux";
import { Account } from "./components/Account";
import { LangSwitcher } from "./components/LangSwitcher";
import { Balance } from "./components/Balance";
import User from "./components/User";

function App() {
  const lang = useSelector((state) => state.locale.lang);
  return (
    <>
      <section>
        <h1>Title </h1>

        <User />

        <p>Current lang {lang}</p>

        <LangSwitcher />

        <Balance />

        <Account />
      </section>
    </>
  );
}

export default App;
