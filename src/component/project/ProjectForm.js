function ProjectForm(){
  return (
    <form>
      <div>
        <input type="text" placeholder='Insira no nome do projeto'/>
      </div>
      <div>
        <input type="number" placeholder='Insira o orçamento total' />
      </div>
      <div>
      <select name="categoria_id">
        <option disabled>
          Selecione a categoria
        </option>
      </select>
      </div>
      <input type="submit" value="Criar projeto"/>

    </form>
  )
}

export default ProjectForm