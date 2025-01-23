import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const Educator = (props: Props) => {
  return (
    <div>
      <h1>Educator</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Educator