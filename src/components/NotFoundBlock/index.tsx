import styles from "./NotFoundBlock.module.scss";
const NotFoundBlock: React.FC = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <br />
        Ничего не найдено
      </h1>

      <p className={styles.description}>
        К сожалению, данная страница отсутствует
      </p>
    </div>
  );
};
export default NotFoundBlock;
