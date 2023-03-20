import { useState } from 'react'
import './index.css'

const Users = ({users, resources, records}: any) => {
  const [activeUser, setActiveUser] = useState('9d486996-370f-4e82-8b4e-00d28b289182')
  const [currentResources, setCurrentResources] = useState<any>([])
  const getResourceName = (id: string) => {
    return resources.find((item: any) => id === item.masterId)
  }


  console.log('users', users)

  const handleClick = (id: string, data: any) => {
    setActiveUser(id)
    setCurrentResources(data)
  }

  return (
    <div className='container'>
      {
        users.map((user: any, index: number) => {
          const { givenName, familyName, jobPositions, id } = user
          const getRecords = records.filter(((item: any) => {
            return item.user_id === id && item.learning_record_verb === 'COMPLETE'
          }))

          return <div className="item" onClick={() => handleClick(id, getRecords)} key={index}>
            <div className='name'>
              {`${givenName} ${familyName}`}
            </div>
            <div className="position">
              Position: {jobPositions}
            </div>
            <div>
              Resources Learned: {getRecords.length}
            </div>

          </div>
        })
      }
      
      {
        currentResources.length > 0 && <div className='item-resources'>
          <div className="title">Current Resources Progress</div>
          {
            currentResources.map((item: any) => {
              return (
                <div>
                  <div>{getResourceName(item.learning_resource_id).title}</div>
                </div>
              )
            })
          }
          <div className="close" onClick={() => handleClick('', [])}>Close</div>
        </div>
      }
    </div>
  )
}

export default Users