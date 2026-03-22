// import { useState } from "react";
// import styles from "./styles.module.css";
// import silver from "../../assets/silver.png";
// import { usePrivelegesPage } from "../../hooks/usePriveleges";
// import { FullscreenLoader } from "../../components/loader/loader";
// import gold from "../../assets/gold.png";
// import black from "../../assets/black.png";

// type Props = {
//   title: string;
//   desc: string;
//   value: string;
//   button: string;
//   variant?: "active" | "locked";
// };

// const Card = ({ title, desc, value, button, variant = "active" }: Props) => {
//   const [label, amount] = value.split(":");

//   function handleClick(
//     action: "route_to_calculator" | "route_to_rating_details",
//   ) {
//     const message = JSON.stringify({
//       action,
//     });

//     //@ts-ignore
//     // Android native bridge
//     window.AndroidBridge?.postMessage?.(message);

//     //@ts-ignore
//     // iOS native bridge
//     window.webkit?.messageHandlers?.nativeHandler?.postMessage(message);
//   }

//   return (
//     <div className={`${styles.card} ${styles.cardInteractive}`}>
//       <div className={styles.cardTitle}>{title}</div>
//       <div className={styles.cardDesc}>{desc}</div>

//       <div className={styles.bottomRow}>
//         <div
//           className={`${styles.value} ${
//             variant === "locked" ? styles.valueLocked : ""
//           }`}
//         >
//           <span className={styles.valueLabel}>{label}</span>
//           <strong className={styles.valueAmount}>{amount}</strong>
//         </div>

//         <button
//           onClick={() =>
//             handleClick(
//               variant === "active"
//                 ? "route_to_rating_details"
//                 : "route_to_calculator",
//             )
//           }
//           className={`${styles.btn} ${
//             variant === "active" ? styles.btnPrimary : styles.btnSecondary
//           }`}
//         >
//           {button}
//         </button>
//       </div>

//       {variant === "locked" && (
//         <div className={styles.note}>*Доступно на уровне Gold</div>
//       )}
//     </div>
//   );
// };

// export default function Privileges() {
//   const [tab, setTab] = useState<"active" | "locked">("active");

//   const { isLoading, isError, refetchAll, benefits, rating } =
//     usePrivelegesPage();

//   if (isLoading) {
//     return <FullscreenLoader />;
//   }

//   if (isError) {
//     return <FullscreenLoader isError onRetry={refetchAll} />;
//   }

//   const generateImgStatus = () => {
//     switch (rating?.level.name) {
//       case "Black":
//         return black;

//       case "Gold":
//         return gold;

//       case "Silver":
//         return silver;
//     }
//   };

//   return (
//     <section>
//       <div className={styles.statusBox}>
//         <img src={generateImgStatus()} alt="" />
//         <div className={styles.status}>
//           Ваш статус: <span data-name={rating?.level.name.toLowerCase()}></span>
//         </div>
//       </div>

//       <div className="container">
//         <h1>Привилегии уровня</h1>

//         <div className={styles.tabs}>
//           <button
//             className={`${styles.tab} ${
//               tab === "active" ? styles.activeTab : ""
//             }`}
//             onClick={() => setTab("active")}
//           >
//             Активные
//           </button>

//           <button
//             className={`${styles.tab} ${
//               tab === "locked" ? styles.activeTab : ""
//             }`}
//             onClick={() => setTab("locked")}
//           >
//             Заблокированные
//           </button>
//         </div>

//         <div key={tab} className={styles.tabContent}>
//           {tab === "active" && (
//             <>
//               <Card
//                 title="Снижение ставки по ипотеке"
//                 desc="Получите ипотеку на 0,3% ниже"
//                 value="Экономия: 720 000 ₽"
//                 button="Узнать подробнее"
//               />
//               <Card
//                 title="Личный бонус"
//                 desc="Выполните KPI на 130% и получите выплату от банка"
//                 value="Бонус: 40 000 ₽"
//                 button="Узнать подробнее"
//               />
//             </>
//           )}

//           {tab === "locked" && (
//             <>
//               <Card
//                 title="Увеличенный процент"
//                 desc="Получайте от банка +25% к выплатам за сделки"
//                 value="Доход: 100 000 ₽"
//                 button="Рассчитать новый статус"
//                 variant="locked"
//               />
//               <Card
//                 title="Увеличенный процент"
//                 desc="Получайте от банка +25% к выплатам за сделки"
//                 value="Экономия: 5 000 ₽"
//                 button="Рассчитать новый статус"
//                 variant="locked"
//               />
//               <Card
//                 title="Повышенная ставка по вкладу"
//                 desc="Оформите депозит с повышенной ставкой +2%"
//                 value="Доход: 80 000 ₽"
//                 button="Рассчитать новый статус"
//                 variant="locked"
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useMemo, useState } from "react";
import styles from "./styles.module.css";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import black from "../../assets/black.png";
import { FullscreenLoader } from "../../components/loader/loader";
import type { Benefit } from "../../api/api";
import { usePrivelegesPage } from "../../hooks/usePriveleges";

type Props = {
  title: string;
  desc: string;
  value: string;
  button: string;
  variant?: "active" | "locked";
  note?: string;
};

const Card = ({
  title,
  desc,
  value,
  button,
  variant = "active",
  note,
}: Props) => {
  function handleClick(
    action: "route_to_calculator" | "route_to_rating_details",
  ) {
    const message = JSON.stringify({ action });

    // @ts-ignore
    // Android native bridge
    window.AndroidBridge?.postMessage?.(message);

    // @ts-ignore
    // iOS native bridge
    window.webkit?.messageHandlers?.nativeHandler?.postMessage(message);
  }

  return (
    <div className={`${styles.card} ${styles.cardInteractive}`}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{desc}</div>

      <div className={styles.bottomRow}>
        <div
          className={`${styles.value} ${variant === "locked" ? styles.valueLocked : ""}`}
        >
          <span className={styles.valueLabel}>Итог</span>
          <strong className={styles.valueAmount}>{value}</strong>
        </div>

        <button
          onClick={() =>
            handleClick(
              variant === "active"
                ? "route_to_rating_details"
                : "route_to_calculator",
            )
          }
          className={`${styles.btn} ${variant === "active" ? styles.btnPrimary : styles.btnSecondary}`}
        >
          {button}
        </button>
      </div>

      {variant === "locked" && note && (
        <div className={styles.note}>{note}</div>
      )}
    </div>
  );
};

const getStatusImage = (status: string) => {
  switch (status?.toLowerCase()) {
    case "gold":
      return gold;
    case "black":
      return black;
    default:
      return silver;
  }
};

const getLevelName = (levelCode: number): string => {
  switch (levelCode) {
    case 1:
      return "Silver";
    case 2:
      return "Gold";
    case 3:
      return "Black";
    default:
      return "Silver";
  }
};

export default function Privileges() {
  const [tab, setTab] = useState<"active" | "locked">("active");
  const { isLoading, isError, refetchAll, benefits, rating } =
    usePrivelegesPage();

  const { activeBenefits, lockedBenefits } = useMemo(() => {
    if (!benefits || !rating) {
      return { activeBenefits: [], lockedBenefits: [] };
    }

    const currentLevelCode = Number(rating.level.code);
    const allBenefits = benefits;

    const active: Benefit[] = [];
    const locked: (Benefit & { levelCode: number })[] = [];

    for (const levelData of allBenefits) {
      const { level_code, benefits: levelBenefits } = levelData;
      if (level_code === currentLevelCode) {
        active.push(...levelBenefits);
      } else {
        locked.push(
          ...levelBenefits.map((b) => ({ ...b, levelCode: level_code })),
        );
      }
    }

    return { activeBenefits: active, lockedBenefits: locked };
  }, [benefits, rating]);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isError) {
    return <FullscreenLoader isError onRetry={refetchAll} />;
  }

  const userStatus = rating?.level?.name ?? "Silver";
  const statusImage = getStatusImage(userStatus);

  return (
    <section>
      <div className={styles.statusBox}>
        <img src={statusImage} alt="" />
        <div className={styles.status}>
          Ваш статус: <span data-name={userStatus.toLowerCase()}></span>
        </div>
      </div>

      <div className="container">
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

        <div key={tab} className={styles.tabContent}>
          {tab === "active" &&
            activeBenefits.map((benefit, idx) => (
              <Card
                key={`active-${idx}`}
                title={benefit.name}
                desc={benefit.description}
                value={benefit.value}
                button="Узнать подробнее"
                variant="active"
              />
            ))}

          {tab === "locked" &&
            lockedBenefits.map((benefit, idx) => (
              <Card
                key={`locked-${idx}`}
                title={benefit.name}
                desc={benefit.description}
                value={benefit.value}
                button="Рассчитать новый статус"
                variant="locked"
                note={`*Доступно на уровне ${getLevelName(benefit.levelCode)}`}
              />
            ))}

          {tab === "active" && activeBenefits.length === 0 && (
            <div className={styles.empty}>Нет активных привилегий</div>
          )}

          {tab === "locked" && lockedBenefits.length === 0 && (
            <div className={styles.empty}>Нет заблокированных привилегий</div>
          )}
        </div>
      </div>
    </section>
  );
}
