import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'

function Projects(){
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)


  const location = useLocation()
  let message = ''
  
  if (location.state){
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((resp) => resp.json())
      .then((data) => {
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))
    }, 300);
    

  }, [])

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message msg={message} type="success" />}
      
      <Container customClass="start">
       {projects.length > 0 && 
          projects.map((project) => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              categorias={project.categorias.name}
            />
          ))}

          {!removeLoading && <Loading/>}

          {removeLoading && projects.length === 0 && (
            <p>Não existe projeto cadastrado</p>
          )}
      </Container>
      
    </div>
  )
}

export default Projects