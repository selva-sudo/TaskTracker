import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmitTask = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please Add Task name!')
            return
        }

        onAdd({ name, day, reminder })

        setName('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmitTask}>
            <div className='form-control'>
                <label> Task</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label> Day & Time </label>
                <input
                    type='text'
                    placeholder='Add Day & Time'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check' >
                <label> Set Reminder </label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type='submit'
                value='Save Task'
                className='btn btn-block' />
        </form>
    )
}

export default AddTask