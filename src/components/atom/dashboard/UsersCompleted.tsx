import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "../box"
import ModalButton from "../modal-button"
import List from "./List"

const UsersCompleted: React.FC = () => {

  const [users, setUsers] = useState<User[]>([])
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
  }

  useEffect(() => {
    fetchData()
  }, [])

  const completedResources = learningRecords.reduce((map, record) => {
    const user = users.find((u) => u.id === record.user_id)
    if (user) {
      const count = map.get(user) || 0
      map.set(user, count + 1)
    }
    return map
  }, new Map<User, number>())

  const usersWithCount = Array.from(completedResources.entries()).map(([user, count]) => ({ user, count }))
  const sortedUsers = usersWithCount.sort((a, b) => b.count - a.count)

  return (
    <Box clearSpacer>
      <div className="p-3 d-flex justify-content-between">
        <div>
          <h2 className="h5 mb-0">Top Users</h2>
          <div className="text-gray-600 fs-14">Users who have completed a lot of learning resources</div>
        </div>
        <ModalButton modalTitle="Top Users" btnChildren={<div className="text-primary cursor-pointer">more</div>}>
          {sortedUsers.map(({ user, count }, index ) => (
            <List key={user.id} index={index} avatar={user.avatar} givenName={user.givenName} familyName={user.familyName} endValue={`${count} resources completed`}/>
          ))}
        </ModalButton>
      </div>
      <div>
        {sortedUsers.slice(0,5).map(({ user, count }, index ) => (
          <List key={user.id} index={index} avatar={user.avatar} givenName={user.givenName} familyName={user.familyName} endValue={`${count} resources completed`}/>
        ))}
      </div>
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

export default UsersCompleted;
