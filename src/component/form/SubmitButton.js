import styles from './submitButton.module.css'

function SubmitBotton({ text }){
  return (
    <div  >
       <button className={styles.btn}>
        {text}
       </button>
    </div>
  )
}

export default SubmitBotton