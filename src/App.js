import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTask'

function App() {

  const [isAddTaskShown, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data);
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    console.log(data);
    return data;
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE',
      })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onToggleTask = async (id) => {
    const taskToUpdate = await fetchTask(id)

    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder }

    const update = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await update.json()

    setTasks(tasks.map(
      (task) => task.id === id ?
        { ...task, reminder: data.reminder }
        : task)
    )
  }

  const onAddTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const newTask = await res.json();

    setTasks([...tasks, newTask])
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className='container'>
        <Header
          title='Task Tracker'
          onAdd={() => setShowAddTask(!isAddTaskShown)}
          isAdd={isAddTaskShown}
        />
        <Route path='/'
          exact
          render={(props) => (
            <>
              {isAddTaskShown && <AddTasks onAdd={onAddTask} />}
              {
                tasks.length > 0
                  ? <Tasks tasks={tasks} onDelete={deleteTask} onReminder={onToggleTask} />
                  : 'No Tasks to show'
              }
            </>
          )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
