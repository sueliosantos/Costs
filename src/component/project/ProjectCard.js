import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({id, name, budget, categorias, handleRemove}) {
  const remove =(e) =>{
    e.preventDefault()
    handleRemove(id)

  }

  return (
     <div className={styles.project_card}>
       <h4>{name}</h4>
       <p className={styles.details_container}>
         <span>Orçamento</span> R${budget}
       </p>
       <p >
         <span className={`${styles[categorias.toLowerCase()]}`}></span> {categorias}
       </p>

       <div className={styles.project_card_actions}>
         <Link to={`/project/${id}`}>
           <BsPencil /> Editar

         </Link>
        
        <button onClick={remove}>
          <BsFillTrashFill/> Excluir
        </button>

       </div>
       
     </div>
  )
}

export default ProjectCard