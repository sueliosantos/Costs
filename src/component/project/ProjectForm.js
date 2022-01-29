import { useEffect, useState} from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handleSubmit, btnText, projectData }){
  const [categorias, SetCategorias] = useState([]);
  const [project, SetProject] = useState(projectData || {});

  useEffect(()=>{
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((resp) => resp.json())
    .then((data) =>{
      SetCategorias(data)
    })
    .catch((err => console.log(err)) )
  }, [])

  const submit = (e) =>{
    e.preventDefault()
    //console.log(project)
    handleSubmit(project)
  }

  function handleChange(e) {
    SetProject({...project, [e.target.name]: e.target.value }) 
  }

  function handleCategory(e) {
    SetProject({...project,  categorias:{
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    } })
    
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input type="text" name="name" text="Nome do projeto" placeholder="Insira o nome do projeto"
      handleOnChance={handleChange} value={project.name ? project.name : ''}/>
      
      <Input type="number" name="budget" text="Orçamento do projeto" placeholder="Insira o orçamento"
      handleOnChance={handleChange} value={project.budget ? project.budget : ''}/>

      <Select name="category_id" text="Selecione a categoria" options={categorias}
      handleOnChance={handleCategory} value={project.categorias ? project.categorias.id : ''}/> 
      
      <SubmitButton text={btnText}/>

    </form>
  )
}

export default ProjectForm