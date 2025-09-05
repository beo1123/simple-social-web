import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className="text-3xl text-red-500 font-bold underline">
        Hello world!
      </h1>
    </div>
  );
}
