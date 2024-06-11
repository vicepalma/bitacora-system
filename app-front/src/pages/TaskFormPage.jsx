import React, { useState, useEffect } from 'react';
import { createTask, deleteTask, updateTask, getTask } from '../services/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-hot-toast'

export default function TaskFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
         setTitle(res.data.title)
          setDescription(res.data.description)
      }
    }
    loadTask()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validación de errores
    if (!title) {
      setTitleError('Por favor, ingresa un título.');
    } else {
      setTitleError('');
    }
    if (!description) {
      setDescriptionError('Por favor, ingresa una descripción.');
    } else {
      setDescriptionError('');
    }

    // Si no hay errores, puedes realizar otras acciones con los datos del formulario
    if (title && description) {
      //enviamos la data a backend
      let data = {
        'title': title,
        'description': description
      }
      if (params.id) {
        await updateTask(params.id, data);
        toast.success('Tarea actualizada',{
          position: 'bottom-right',
          style: {
            background:'#101010',
            color:'#fff'
          }
        })
      } else {
        await createTask(data);
        toast.success('Tarea creada',{
          position: 'bottom-right',
          style: {
            background:'#101010',
            color:'#fff'
          }
        })
      }
      navigate('/tasks');
    }
  };

  const handleDelete = async () => {
    const accepted = window.confirm('estas seguro?')
    if (accepted) {
      await deleteTask(params.id);
      toast.success('Tarea eliminada',{
        position: 'bottom-right',
        style: {
          background:'#101010',
          color:'#fff'
        }
      })
      navigate('/tasks')
    }
  };

  return (
    <div className='max-w-screen-xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(''); // Limpiar el mensaje de error
            }}
            className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          />
          <div style={{ color: 'red' }}>{titleError}</div>
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError(''); // Limpiar el mensaje de error
            }}
            className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          />
          <div style={{ color: 'red' }}>{descriptionError}</div>
        </div>
        <button 
        className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
        type="submit">Guardar</button>
      </form>
      {params.id &&( 
        <div className='flex justify-end'>
        <button 
        className='bg-red-500 p-3 rounded-lg w-48 mt-3'
        onClick={() => handleDelete()}
        >Eliminar</button>
        </div>
)}
    </div>
  )
}