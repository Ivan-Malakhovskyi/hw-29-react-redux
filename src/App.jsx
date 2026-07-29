import { User } from "./components/User";
import { UsersSection } from "./components/UsersSection";

export const App = () => {
  return (
    <div className="container">
      <User />
      <UsersSection />
    </div>
  );
};
