import styles from './Navbar.module.css';
import Title from "../Title/Title";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>

      <div className={styles.container}>

        {/* Logo / Nombre de la App */}
        <div className={styles.logo}>
          <a href="#inicio">
            <Title textTitle="Next" textSpan="Play" />
          </a>
        </div>

        {/* Links de navegación */}
        <ul className={styles.navLinks}>
            <li>
                <a href="#inicio" className={styles.link}>Inicio</a>
            </li>

            {/* Links a listado */}
            <li>
                <a href="#listado" className={styles.link}>Mi Listado</a>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
