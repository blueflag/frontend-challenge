import React, { useEffect, useState } from "react";
import axios from "axios"
import Box from "../box"
import List from "./List"

const UsersNotCompleted: React.FC = () => {

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
      ]);
      setUsers(userData.data)
      setLearningResources(resourceData.data)
      setLearningRecords(recordData.data)
    } catch (error) {
      setErrorMessage('Error fetching data')
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const incompleteUsers = users.filter((user) => {
    return !learningRecords.some((record) => record.user_id === user.id)
  });

  const currentUsers = incompleteUsers

  return (
    <Box clearSpacer height={311}>
      <div className="p-3">
        <h2 className="h5 mb-0">Users with no learning activity</h2>
        <div className="text-gray-600 fs-14">Users who have not completed any learning resources</div>
      </div>
        {currentUsers.slice(0,5).map( (user, index:number) => (
          <List key={user.id} index={index} avatar={user.avatar} givenName={user.givenName} familyName={user.familyName} endValue={user.jobPositions}/>
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

export default UsersNotCompleted;
