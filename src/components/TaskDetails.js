import { useState, useEffect } from 'react';
import { useParams, useLocation, useNative, Navigate, useNavigate } from 'react-router-dom'
import Button from './Button'

const TaskDetails = () => {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect( () => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:4000/tasks/${params.id}`)
            const data = await res.json()

            if (res.status === 404 ) {
               navigate('/')
            }
            setTask(data)
            setLoading(false)
        }
        fetchTask()
    })


  return  loading ? (
    <h3>Loading ... </h3>
  ) : (
     <div>
         <p>{pathname}</p>
         <h3>{task.text}</h3>
         <p>{task.day}</p>
         <Button text='Go Back' onClick={() => {navigate(-1)}}/>
     </div> 
  )
}

export default TaskDetails