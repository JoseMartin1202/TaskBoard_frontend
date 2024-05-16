import React from 'react'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <>
      <div>HomeScreen</div>
      <Link to="/perfil">
        Ir a perfil
      </Link>
    </>
  )
}

export default HomeScreen