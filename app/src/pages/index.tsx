import type { NextPage } from "next";

import { Form } from "../components/Form";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export default Home;
