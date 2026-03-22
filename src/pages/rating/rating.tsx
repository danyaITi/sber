import styles from "./styles.module.css";
import credit from "../../assets/credit.png";
import istorii from "../../assets/istorii.png";
import vklad from "../../assets/vklad.png";
import gold from "../../assets/gold.png";
import silver from "../../assets/silver.png";
import black from "../../assets/black.png";
import { useRatingPage } from "../../hooks/useRatingPage";
import { FullscreenLoader } from "../../components/loader/loader";

type Props = {
  title: string;
  description: string;
  tips: string[];
  score: number;
  img: string;
};

const Card = ({ title, description, tips, score, img }: Props) => {
  function getBallWord(count: number) {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) return "баллов";
    if (lastOne === 1) return "балл";
    if (lastOne >= 2 && lastOne <= 4) return "балла";
    return "баллов";
  }

  return (
    <div className={`${styles.card} ${styles.cardInteractive}`}>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <ul className={styles.list}>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <img src={img} alt="" className={styles.cardImage} />

      <div className={styles.score}>
        <span className={styles.scoreNumber}>{score}</span>
        <span className={styles.scoreText}>{getBallWord(score)}</span>
      </div>
    </div>
  );
};

export default function Rating() {
  const { isLoading, isError, refetchAll, details, rating } = useRatingPage();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isError) {
    return <FullscreenLoader isError onRetry={refetchAll} />;
  }

  function handleClick() {
    const message = JSON.stringify({
      action: "route_to_calculator",
    });

    //@ts-ignore
    // Android native bridge
    window.AndroidBridge?.postMessage?.(message);

    //@ts-ignore
    // iOS native bridge
    window.webkit?.messageHandlers?.nativeHandler?.postMessage(message);
  }

  const generateImgStatus = () => {
    switch (rating?.level.name) {
      case "Black":
        return black;

      case "Gold":
        return gold;

      case "Silver":
        return silver;
    }
  };

  return (
    <section>
      <div className={styles.ratingHeader}>
        <div className={styles.ratingCard}>
          <div className={styles.ratingLeft}>
            <span className={styles.ratingLabel}>Ваш текущий рейтинг</span>
            <span className={styles.ratingNumber}>
              {rating?.rating.total_points}
            </span>
          </div>
          <div className={styles.ratingLevel}>
            <img src={generateImgStatus()} alt="" />
            <span
              className={styles.levelText}
              data-name={rating?.level.name.toLowerCase()}
            >
              Ваш уровень
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <h1>Детализация рейтинга</h1>
        <div className={styles.subtitle}>
          Ваш рейтинг зависит от: объёма продаж, количества сделок и доли
          продуктов банка.
        </div>

        <Card
          title="Объём продаж"
          description="Баллы начисляются за каждый 1 млн ₽ оформленного объёма."
          tips={[
            "увеличить количество крупных сделок",
            "работать с клиентами с высоким чеком",
            "предлагать дополнительные кредитные продукты",
          ]}
          score={details?.volume_of_sales ?? 0}
          img={credit}
        />

        <Card
          title="Сделки"
          description="Количество успешно завершённых сделок."
          tips={[
            "ускорить обработку заявок",
            "работать с повторными клиентами",
            "увеличивать конверсию заявок",
          ]}
          score={details?.count_of_deals ?? 0}
          img={istorii}
        />

        <Card
          title="Доля банка"
          description="Баллы начисляются в зависимости от доли банковских продуктов в общем объёме."
          tips={[
            "предлагать клиентам банковские программы",
            "увеличивать долю ипотечных продуктов",
            "активнее использовать банковские предложения",
          ]}
          score={details?.bank_portion_of_deals ?? 0}
          img={vklad}
        />

        <button className={styles.btn} onClick={handleClick}>
          Смоделировать рост
        </button>
      </div>
    </section>
  );
}
