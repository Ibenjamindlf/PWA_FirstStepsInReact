import styles from './Title.module.css'
export const Title = ({textTitle, textSpan}) => {

  return (
    <h1 className={styles.title}>{textTitle}<span className={styles.span}>{textSpan}</span></h1>
  )
}

export default Title;