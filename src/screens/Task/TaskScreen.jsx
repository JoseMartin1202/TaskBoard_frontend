import React, { useEffect, useState } from 'react'
import { useTimer } from '../../context/TimerContext'

const fakeTasks = [
    {
        "idTarea": 1,
        "descripcion": "Implementar API REST",
        "estado": "EN_PROCESO",
        "fechaRegistro": "2024-05-01T08:00:00Z",
        "fechaLimite": "2024-05-31T17:00:00Z",
        "proyecto": {
            "idProyecto": 101,
            "nombre": "Desarrollo de Software"
        },
        "categoria": {
            "idCategoria": 5,
            "nombre": "Desarrollo"
        }
    },
    {
        "idTarea": 2,
        "descripcion": "Diseñar base de datos",
        "estado": "CREADA",
        "fechaRegistro": "2024-05-02T09:30:00Z",
        "fechaLimite": "2024-06-15T17:00:00Z",
        "proyecto": {
            "idProyecto": 102,
            "nombre": "Sistema de Gestión"
        },
        "categoria": {
            "idCategoria": 7,
            "nombre": "Base de Datos"
        }
    },
    {
        "idTarea": 3,
        "descripcion": "Pruebas unitarias",
        "estado": "FINALIZADA",
        "fechaRegistro": "2024-04-28T10:00:00Z",
        "fechaLimite": "2024-05-20T17:00:00Z",
        "proyecto": {
            "idProyecto": 103,
            "nombre": "Automatización"
        },
        "categoria": {
            "idCategoria": 3,
            "nombre": "Testing"
        }
    },
    {
        "idTarea": 4,
        "descripcion": "Documentar código",
        "estado": "CREADA",
        "fechaRegistro": "2024-05-05T11:00:00Z",
        "fechaLimite": "2024-06-30T17:00:00Z",
        "proyecto": {
            "idProyecto": 104,
            "nombre": "Documentación"
        },
        "categoria": {
            "idCategoria": 8,
            "nombre": "Documentación"
        }

    }
]

const fakeSubTasks = [
    {
        idSubTarea: 1,
        descripcion: "Implementar GET",
        estado: "EN_PROCESO",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 1,
            nombre: "Juan Perez"
        },
        fechaLimite: "2024-05-15T17:00:00Z"
    },
    {
        idSubTarea: 2,
        descripcion: "Implementar POST",
        estado: "CREADA",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 2,
            nombre: "Ana Lopez"
        },
        fechaLimite: "2024-05-20T17:00:00Z"
    },
    {
        idSubTarea: 3,
        descripcion: "Implementar DELETE",
        estado: "FINALIZADA",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 3,
            nombre: "Pedro Ramirez"
        },
        fechaLimite: "2024-05-25T17:00:00Z"
    },
    {
        idSubTarea: 4,
        descripcion: "Implementar PUT",
        estado: "CREADA",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 5,
            nombre: "Carlos Soto"
        },
        fechaLimite: "2024-05-30T17:00:00Z"
    },
    {
        idSubTarea: 5,
        descripcion: "Implementar PATCH",
        estado: "CREADA",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 5,
            nombre: "Carlos Soto"
        },
        fechaLimite: "2024-06-05T17:00:00Z"
    },
    {
        idSubTarea: 6,
        descripcion: "Implementar OPTIONS",
        estado: "CREADA",
        tarea: {
            idTarea: 1,
            descripcion: "Implementar API REST"
        },
        usuarioAsignado: {
            idUsuario: 5,
            nombre: "Carlos Soto"
        },
        fechaLimite: "2024-06-10T17:00:00Z"
    }
]

const TaskScreen = () => {

    const [tasks, setTasks] = useState(fakeTasks)

    const [showSubTasks, setShowSubTasks] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    const handleShowSubTasks = () => setShowSubTasks(true)
    const handleCloseSubTask = () => setShowSubTasks(false)

    const { toggleTimer } = useTimer()

    const startSubTask = (subTask) => {
        console.log(subTask)
    }


    const columns = [
        { estado: 'CREADA', label: 'Pendientes' },
        { estado: 'EN_PROCESO', label: 'En progreso' },
        { estado: 'FINALIZADA', label: 'Completadas' }
    ]

    const getTasksByColumn = (estado) => {
        return tasks.filter(task => task.estado === estado)
    }

    return (
        <>
            {showSubTasks &&
                <ModalSubTask
                    onClose={handleCloseSubTask}
                    selectedTask={selectedTask}
                    startSubTask={startSubTask}
                />}
            <div className='flex flex-col h-screen w-full relative bg-neutral-200'>
                <div className='flex w-full justify-between h-20 bg-white shadow-md items-center px-10'>
                    <div className='font-bold text-3xl'>
                        TaskScreen
                    </div>
                    <button onClick={toggleTimer}>
                        Mostrar Timer
                    </button>
                </div>
                <div className='flex w-full h-full '>
                    {columns.map((col, i) => <div key={`col_${i}`} className='flex-1 p-2 gap-2 flex flex-col'>
                        <div className='font-normal text-lg'>{col.label}</div>
                        {getTasksByColumn(col.estado)?.map((task, j) =>
                            <TaskCard
                                key={`task_${i}_${j}`}
                                task={task}
                                handleShowSubTasks={handleShowSubTasks}
                                setSelectedTask={setSelectedTask}
                            />)}

                    </div>)}
                </div>
            </div>
        </>
    )
}

const TaskCard = ({ task, setSelectedTask, handleShowSubTasks }) => {

    const handleSelectTask = () => {
        setSelectedTask(task.idTarea)
        handleShowSubTasks()
    }

    return (
        <button
            onClick={handleSelectTask}
            type="button" className='bg-white p-2 shadow-md'>
            {task.descripcion}
        </button>
    )
}

const ModalSubTask = ({ onClose, selectedTask, startSubTask }) => {

    const [subTasks, setSubTasks] = useState(() => {
        let filtered = fakeSubTasks.filter(subTask => subTask.tarea.idTarea === selectedTask)

        console.log(selectedTask)

        return filtered
    })


    return (
        <div className='z-10 absolute right-0 top-0 h-screen w-1/2 bg-white/80'>
            <div className='flex'>
                <button type="button"
                    onClick={onClose}
                >X</button>
            </div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Subtarea</th>
                        <th>Estado</th>
                        <th>Usuario asignado</th>
                        <th>Fecha límite</th>
                    </tr>
                </thead>
                <tbody>
                    {subTasks.map(subTask => <tr key={subTask.idSubTarea} className='h-10'>
                        <td>{subTask.descripcion}</td>
                        <td>{subTask.estado}</td>
                        <td>{subTask.usuarioAsignado.nombre}</td>
                        <td>{subTask.fechaLimite}</td>
                        <td>
                            <button
                                type="button"
                                onClick={() => startSubTask(subTask)}
                            >Start</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default TaskScreen