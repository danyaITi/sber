import { useState } from "react";
import styles from "./styles.module.css";

type Props = Record<string, string>;

const Card = ({ title, desc, value, button, variant = "active" }: Props) => {
  return (
    <div
      className={`${styles.card} ${variant === "locked" ? styles.locked : ""}`}
    >
      <div>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDesc}>{desc}</div>

        <div className={styles.bottomRow}>
          <div className={styles.value}>{value}</div>

          <button
            className={
              variant === "active" ? styles.primaryBtn : styles.secondaryBtn
            }
          >
            {button}
          </button>
        </div>

        {variant === "locked" && (
          <div className={styles.note}>*Откроется при Gold</div>
        )}
      </div>
    </div>
  );
};

export default function Privileges() {
  const [tab, setTab] = useState("active");

  return (
    <div className={styles.container}>
      <h1>Привилегии уровня</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "active" ? styles.activeTab : ""}`}
          onClick={() => setTab("active")}
        >
          Активные
        </button>
        <button
          className={`${styles.tab} ${tab === "locked" ? styles.activeTab : ""}`}
          onClick={() => setTab("locked")}
        >
          Заблокированные
        </button>
      </div>

      {tab === "active" && (
        <>
          <Card
            title="Снижение ставки по ипотеке"
            desc="Получите ипотеку на 0,3% ниже"
            value="Экономия: 720 000 ₽"
            button="Узнать подробнее"
          />

          <Card
            title="Личный бонус"
            desc="Выполните KPI на 130% и получите выплату от банка"
            value="Бонус: 40 000 ₽"
            button="Узнать подробнее"
          />
        </>
      )}

      {tab === "locked" && (
        <>
          <h2 className={styles.sectionTitle}>Заблокированные</h2>

          <Card
            title="Увеличенный процент"
            desc="Получайте от банка +25% к выплатам за сделки"
            value="Доход: 100 000 ₽"
            button="Рассчитать новый статус"
            variant="locked"
          />

          <Card
            title="Увеличенный процент"
            desc="Получайте от банка +25% к выплатам за сделки"
            value="Экономия: 5 000 ₽"
            button="Рассчитать новый статус"
            variant="locked"
          />

          <Card
            title="Повышенная ставка по вкладу"
            desc="Оформите депозит с повышенной ставкой +2%"
            value="Доход: 80 000 ₽"
            button="Рассчитать новый статус"
            variant="locked"
          />
        </>
      )}
    </div>
  );
}
