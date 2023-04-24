import React from 'react'
import Avatar from '../../molecule/avatar'

const List:React.FC<Props> = ({ key, index, avatar, givenName, familyName, endValue, resources }:Props) => {
  return(
    <div key={key} className={`d-flex justify-content-between px-3  py-2 border-bottom-1-solid-gray-200 ${index % 2 === 1 ? "bg-gray-100" : ""}`}>
      <div className="d-flex align-items-center">
        { avatar ? 
          <Avatar src={avatar} className="me-2" />
        : <div className="me-2">{index+1}.</div> }
        { resources ? resources : <div>{givenName} {familyName}</div> }
      </div>
      <div>{endValue}</div>
    </div>
  )
}

interface Props {
  key: string
  index: number
  avatar?: string
  givenName?: string
  familyName?: string
  endValue?: string
  resources?: string
}

export default List