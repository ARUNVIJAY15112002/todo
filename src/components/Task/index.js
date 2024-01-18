import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Cards from '../Cards'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Task extends Component {
  state = {
    intialList: [],
    typed: '',
    type: '',
    optionStatus: '',
    isClicked: false,
  }

  getText = e => {
    this.setState({typed: e.target.value})
  }

  getTask = e => {
    this.setState({type: e.target.value})
  }

  getList = e => {
    e.preventDefault()
    const {typed, type} = this.state
    const List = {
      id: uuidv4(),
      task: typed,
      type: type.toUpperCase(),
    }
    this.setState(prevState => ({intialList: [...prevState.intialList, List]}))
    this.setState({typed: ''})
  }

  getCat = e => {
    const {isClicked} = this.state
    console.log(isClicked)
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }))
    if (isClicked) {
      this.setState({optionStatus: e})
    } else {
      this.setState({optionStatus: ''})
    }
  }

  render() {
    const getOptions = x => <option id={x.optionId}>{x.displayText}</option>
    const {typed, intialList, optionStatus} = this.state

    const printButton = x => {
      const btnStyle = optionStatus === x.optionId ? 'style-2' : 'tgs-btn'

      return (
        <li className="list-item">
          <button className={btnStyle} onClick={() => this.getCat(x.optionId)}>
            {x.displayText}
          </button>
        </li>
      )
    }

    return (
      <div className="main-card">
        <form className="card-1" onSubmit={this.getList}>
          <h1>Create a task!</h1>
          <div className="container">
            <label className="lbl" htmlFor="ip1">
              Task
            </label>
            <input
              className="ipxt"
              type="text"
              id="ip"
              value={typed}
              placeholder="Enter the task here"
              onChange={this.getText}
            />
          </div>
          <div className="container">
            <label className="lbl" htmlFor="ip1">
              Task
            </label>
            <select onChange={this.getTask}>
              {tagsList.map(x => getOptions(x))}
            </select>
          </div>
          <button type="submit" className="addTask">
            Add Task
          </button>
        </form>
        <div className="card-2">
          <h1 className="tasks">Tags</h1>
          <ul className="list-container">
            {tagsList.map(x => printButton(x))}
          </ul>
          <h1 className="tasks">Tasks</h1>
          {intialList.length === 0 && (
            <h1 className="no-task">No Tasks Added Yet</h1>
          )}
          {intialList.length !== 0 && (
            <ul>
              {intialList.map(x => (
                <Cards x={x} key={x.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Task
