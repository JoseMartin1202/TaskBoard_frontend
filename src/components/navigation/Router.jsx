import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from '../../screens/Home/HomeScreen'
import ProfileScreen from '../../screens/Profile/ProfileScreen'
import TaskScreen from '../../screens/Task/TaskScreen'


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/task" element={<TaskScreen />} />
                <Route path="/perfil" element={<ProfileScreen />} />
                <Route path="/" element={<HomeScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router