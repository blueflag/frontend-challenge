import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "../box"
import ModalButton from "../modal-button"
import List from "./List"

const ResourcesCompleted: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([])
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchData = async () => {
    try {
      const [userData, resourceData, recordData] = await Promise.all([
        axios.get('http://localhost:3000/users.json'),
        axios.get('http://localhost:3000/learning-resources.json'),
        axios.get('http://localhost:3000/learning-records.json')
      ])
      setUsers(userData.data)
      setLearningResources(resourceData.data)
      setLearningRecords(recordData.data)
    } catch (error) {
      setErrorMessage('Error fetching data')
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const completedResources = learningRecords.reduce((resources:any, record) => {
    const resourceId = record.learning_resource_id
    resources[resourceId] = (resources[resourceId] || 0) + 1
    return resources
  }, {})

  const resourceCompletionCount = Object.keys(completedResources).map((resourceId) => {
    const resource = learningResources.find((resource) => resource.masterId === resourceId)
    return {
      id: resourceId,
      title: resource ? resource.title : "",
      count: completedResources[resourceId],
    };
  })

  return (
    <Box clearSpacer>
      <div className="p-3 d-flex justify-content-between">
      < div>
          <h2 className="h5 mb-0">Most Completed Resources</h2>
          <div className="text-gray-600 fs-14">learning resources have been completed the most</div>
        </div>
        <ModalButton modalTitle="Most Completed Resources" btnChildren={<div className="text-primary cursor-pointer">more</div>}>
          {resourceCompletionCount.map((resource:any, index:number) => (
            <List resources={resource.title} key={resource.id} index={index} endValue={`${resource.count} users completed`}/>
          ))}
        </ModalButton>
      </div>
        {resourceCompletionCount.slice(0,5).map((resource:any, index:number) => (
          <List resources={resource.title} key={resource.id} index={index} endValue={`${resource.count} users completed`}/>
        ))}
    </Box>
  );
};

interface User {
  id: string
  givenName: string
  familyName: string
  jobPositions: string
  avatar: string
}

interface LearningResource {
  masterId: string
  code: string
  title: string
}

interface LearningRecord {
  learning_record_verb: string
  user_id: string
  learning_resource_id: string
  learning_record_timestamp: string
}

export default ResourcesCompleted;
