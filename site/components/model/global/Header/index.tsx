import Container from "components/ui/Container";
import styles from "./styles.module.css";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <div className={styles.Header}>
      <span className={styles.tradeMark}>cathie.codes</span>
    </div>
  );
}
