import { Suspense } from "react";
import { RiReactjsFill } from "react-icons/ri";
import { Link, Outlet } from "react-router";
import { Spinner } from "../shared/Spinner";
import styles from "./Layout.module.css";
import { Navigation } from "../Naviagtion";

export const Layout = () => {
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <RiReactjsFill size={40} />
        </Link>
        <Navigation />
      </header>

      <Suspense fallback={<Spinner width={20} height={20} />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
