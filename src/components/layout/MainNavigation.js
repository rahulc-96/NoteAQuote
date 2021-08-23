import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Great Quotes</h2>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/quotes">
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/new_quote">
              Add a quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
