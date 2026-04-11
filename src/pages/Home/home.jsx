import Title from "../../components/Title/Title";
import styles from './home.module.css';

const Home = () => {


  return (
    <section id="inicio" className={styles.homeSection}>
      <Title textTitle="Next" textSpan="Play"/>
    </section>
  )
}

export default Home;