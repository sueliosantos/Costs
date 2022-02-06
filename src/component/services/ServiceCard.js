import style from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({id, name, handleRemove, cost}){
 const remove = (e) =>{
   e.preventDefaut()
   handleRemove(id, cost)
 } 

  return (
    <div className={style.project_card}>
      <h4>{id}</h4>
      <p>
        <span>Custo total:</span> R$:{cost}
      </p>
      <div className={style.project_card_actions}>
        <button>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>

  )
}

export default ServiceCard