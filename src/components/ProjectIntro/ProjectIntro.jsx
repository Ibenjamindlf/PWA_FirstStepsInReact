import styles from './ProjectIntro.module.css';

const developers = [
  {
    name: 'Benjamin De La Fuente',
    role: 'Project Manager',
    img: 'https://avatars.githubusercontent.com/u/206235917?v=4', // Reemplaza con la URL de la imagen real
  },
  {
    name: 'Alejo Lopez',
    role: 'Developer responsable del estilo de la aplicación y la implementación de CSS',
    img: 'https://avatars.githubusercontent.com/u/217831763?v=4', // Reemplaza con la URL de la imagen real
  },
  {
    name: 'Facundo Ledesma',
    role: 'Developer reponsable de las funcionalidades de la aplicación',
    img: 'https://avatars.githubusercontent.com/u/150484970?v=4', // Reemplaza con la URL de la imagen real
  }
];


const ProjectIntro = () => {
    return (
        <section id="inicio" className={styles.projectIntro}>
            <div className={styles.projectIntro__description}>
                <h2>Tu cine, <span>ordenado</span></h2>
                <p>
                    Gestioná tu biblioteca de películas y series con una interfaz moderna y dinámica. 
                    Organizá lo que querés ver, marcá lo que ya viste y disfrutá de una experiencia fluida.
                </p>
            </div>
            <div className={styles.projectIntro__developers}>
                {developers.map((dev, index) => (
                    <div key={index} className={styles.developers__card}>
                        <img src={dev.img} alt={`${dev.name}'s profile`} className={styles.card__img} />
                        <h3>{dev.name}</h3>
                        <p>{dev.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default ProjectIntro;