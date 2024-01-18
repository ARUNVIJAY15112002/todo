import './index.css'

const Cards = props => {
  const {x} = props
  const {task, type} = x
  return (
    <div className="task-card">
      <h1 className="task">{task}</h1>
      <h1 className="Task-type">{type}</h1>
    </div>
  )
}

export default Cards
