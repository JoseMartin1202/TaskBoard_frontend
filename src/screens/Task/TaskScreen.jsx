import React from 'react'
import { useTimer } from '../../context/TimerContext'

const TaskScreen = () => {
    
    const { toggleTimer } = useTimer()
    
    return (
        <>
            <div>
                TaskScreen
            </div>
            <button
                onClick={toggleTimer}
            >
                Mostrar Timer
            </button>
        </>
    )
}

export default TaskScreen