import React, { useMemo } from 'react'

const LearningResources = ({resources, records}: any) => {
  const getCompletedData = (id: string) => {
    return records.filter((item: any) => item.learning_record_verb === 'COMPLETE' && item.learning_resource_id === id).length
  }
  return (
    <div className='container'>
    {
      resources.map((user: any) => {
        const { title, masterId } = user

        
        return <div className="item">
          <div className='name'>
            {title}
          </div>
          <div>
            Completed by: {getCompletedData(masterId)} users
          </div>
        </div>
      })
    }
    
  </div>
  )
}

export default LearningResources