import { useState } from "react";
import styles from "./styles.module.css";
import silver from "../../assets/silver.png";

type Props = {
  title: string;
  desc: string;
  value: string;
  button: string;
  variant?: "active" | "locked";
};

const Card = ({ title, desc, value, button, variant = "active" }: Props) => {
  const [label, amount] = value.split(":");

  function handleClick(
    action: "route_to_calculator" | "route_to_rating_details",
  ) {
    const message = JSON.stringify({
      action: "route_to_calculator",
    });

    //@ts-ignore
    // Android native bridge
    window.AndroidBridge?.postMessage?.(message);

    //@ts-ignore
    // iOS native bridge
    window.webkit?.messageHandlers?.nativeHandler?.postMessage({
      action,
    });
  }

  return (
    <div className={`${styles.card} ${styles.cardInteractive}`}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{desc}</div>

      <div className={styles.bottomRow}>
        <div
          className={`${styles.value} ${
            variant === "locked" ? styles.valueLocked : ""
          }`}
        >
          <span className={styles.valueLabel}>{label}</span>
          <strong className={styles.valueAmount}>{amount}</strong>
        </div>

        <button
          onClick={() =>
            handleClick(
              variant === "active"
                ? "route_to_rating_details"
                : "route_to_calculator",
            )
          }
          className={`${styles.btn} ${
            variant === "active" ? styles.btnPrimary : styles.btnSecondary
          }`}
        >
          {button}
        </button>
      </div>

      {variant === "locked" && (
        <div className={styles.note}>Доступно на уровне Gold</div>
      )}
    </div>
  );
};

export default function Privileges() {
  const [tab, setTab] = useState<"active" | "locked">("active");

  // const { isLoading, isError, refetchAll } = usePrivelegesPage();

  // if (isLoading) {
  //   return <FullscreenLoader />;
  // }

  // if (isError) {
  //   return <FullscreenLoader isError onRetry={refetchAll} />;
  // }

  return (
    <section>
      <div className={styles.statusBox}>
        <img src={silver} alt="" />
        <div className={styles.status}>
          Ваш статус: <span data-name="silver"></span>
        </div>
      </div>

      <div className="container">
        <h1>Привилегии уровня</h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              tab === "active" ? styles.activeTab : ""
            }`}
            onClick={() => setTab("active")}
          >
            Активные
          </button>

          <button
            className={`${styles.tab} ${
              tab === "locked" ? styles.activeTab : ""
            }`}
            onClick={() => setTab("locked")}
          >
            Заблокированные
          </button>
        </div>

        <div key={tab} className={styles.tabContent}>
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
      </div>
    </section>
  );
}
