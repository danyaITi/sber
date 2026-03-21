import styles from "./styles.module.css";
import credit from "../../assets/credit.png";
import istorii from "../../assets/istorii.png";
import vklad from "../../assets/vklad.png";

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

    if (lastTwo >= 11 && lastTwo <= 14) {
      return "баллов";
    }

    if (lastOne === 1) {
      return "балл";
    }

    if (lastOne >= 2 && lastOne <= 4) {
      return "балла";
    }

    return "баллов";
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <ul className={styles.list}>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <img src={img} alt="" />

      <div className={styles.score}>
        <span>{score}</span>
        <span>{getBallWord(score)}</span>
      </div>
    </div>
  );
};

export default function Rating() {
  return (
    <div className={styles.container}>
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
        score={32}
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
        score={18}
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
        score={12}
        img={vklad}
      />

      <button className={styles.btn}>Смоделировать рост</button>
    </div>
  );
}
