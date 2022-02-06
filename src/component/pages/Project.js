import { parse, v4 as uuidv4} from 'uuid'
import styles from './Project.module.css' 
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

function Project() {
  const { id } = useParams()

  const [ project, setProject ] = useState([])
  const [ services, setServices ] = useState([])
  const [ showProject, setShowProject ] = useState([])
  const [ showServiceForm, setShowServiceForm ] = useState([])
  const [ message, setMessage  ] = useState()
  const [ type, setType  ] = useState()

  useEffect(() =>{
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => resp.json())
    .then((data)=>{
      setProject(data)
      setServices(data.services)
    })
    .catch((err) => console.log(err))

  }, [id])

  function editPost(project){
    setMessage('')
    if(project.budget < project.costs){
     setMessage('O orçamento não pode ser menor que o total do projeto')
     setType('error')
     return false
    }

    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) =>{
      setProject(data)
      setShowProject(false)

      setMessage('Projeto atualizado com sucesso')
      setType('success')
    })
    .catch((err) => console.log(err))

  }

  function tProjectForm() {
    setShowProject(!showProject) 
  }

  function tServiceForm() {
    setShowServiceForm(!showServiceForm) 
  }

  function createService(project) {
   // console.log(project)
    setMessage('')
    const lastService = project.services[project.services.length - 1]
    
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }

    project.costs = newCost

    fetch(`http://localhost:5000/projects/${project.id}`,{
      method: 'PATCH',
      headers:{
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) =>{
      setShowServiceForm(false)
    })
    .catch((err)=> console.log(err))
  }
  
  function removeService(id, cost){
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdate = project
   // projectUpdate.services = servicesUpdate
    //projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdate.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdate)

    }).then((resp)=> resp.json())
    .then((data) =>{
      setProject(projectUpdate)
      //setServices(servicesUpdate)
      setMessage('Serviço removido com sucesso')
    })
    .catch((err) => console.log(err))
 
  }
  
  return (
    <>
    {project.name ? (
       <div className={styles.project_details}>
         <Container customClass="column">
           {message && <Message type={type} msg={message} />}
           <div className={styles.details_container}> 
             <h1>Projeto: {project.name}</h1>
             <button className={styles.btn} onClick={tProjectForm}>
               {!showProject ? 'Editar Projeto' : 'Fechar'}
             </button>
             {!showProject ? (
              <div className={styles.project_info}>
                <p>
                  <span>Categoria:</span> {project.categorias.name}
                </p>

                <p>
                  <span>Total orçamento:</span>  R$ {project.budget}
                </p>

                <p>
                  <span>Total utilizado:</span> R$ {project.costs}
                </p>
              </div>
             ) : (
                <div className={styles.project_info}>
                  <ProjectForm  
                  handleSubmit={editPost}
                  btnText = "Concluir edição"
                  projectData={project} />

                </div>
             ) 
            }
           </div>
           <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={tServiceForm}>
               {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
             </button>
              <div className={styles.project_info}>
                  {showServiceForm && 
                    (<ServiceForm 
                        handleSubmit={createService}
                        btnText="Adicionar serviço"
                        projectData={project}
                      />
                    )
                      }
              </div>
           </div>
 
           <h2>Serviços</h2>
           <Container customClass="start">
             {services.length > 0 &&
              services.map((service) => (
                <ServiceCard
                id={service.id}
                 
                key={service.id}
        
                handleRemove={removeService}
                />
              ))
             }
             {services.length ===0 && <p>Não há serviços cadastrados</p>}
           </Container>
         </Container>
       </div>
    ): (
      <Loading />
    ) }
    </>
  )
}

export default Project