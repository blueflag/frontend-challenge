import React from 'react'
import { Icon } from '@iconify/react'

const Navigation = () => {
  return(
    <React.Fragment>
      <div className="bg-dark-900 px-3 py-2 rounded-3 mb-2 d-flex align-items-center text-white">
        <Icon icon="lucide:home" className="fs-18 me-2" />
        <div className="fs-14">Dashboard</div>
      </div>
      <div className="px-3 py-2 mb-2 d-flex align-items-center text-white">
        <Icon icon="lucide:book" className="fs-18 me-2" />
        <div className="fs-14">Courses</div>
      </div>
      <div className="px-3 py-2 mb-2 d-flex align-items-center text-white">
        <Icon icon="lucide:user" className="fs-18 me-2" />
        <div className="fs-14">Users</div>
      </div>
      <div className="mt-auto px-3 py-2 d-flex align-items-center text-white">
        <Icon icon="lucide:settings" className="fs-18 me-2" />
        <div className="fs-14">Settings</div>
      </div>
    </React.Fragment>
  )
}

export default Navigation