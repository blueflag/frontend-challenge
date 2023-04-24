import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "../box"
import Image from "components/molecule/image"
import List from "./List"

const ResourcesNotStarted: React.FC = () => {
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
  }, []);

  const unstartedResources = learningResources.filter((resource) => {
    const records = learningRecords.filter(
      (record) => record.learning_resource_id === resource.masterId
    );

    return records.length === 0
  });

  return (
    <Box clearSpacer height={282}>
      <div className="p-3">
        <h2 className="h5 mb-0">Not Started Learning Resources</h2>
        <div className="text-gray-600 fs-14">learning resources have not been interacted with at all yet</div>
      </div>
      {unstartedResources.length > 0 ? (
        unstartedResources.map((resource:any, index:number) => (
          <List resources={resource.title} key={resource.masterId} index={index}/>
        ))
      ) : (
        <div className="text-center py-4">
          <Image src="/img/illustration-empty.png" alt="No Data to display" width={120} height={117} />
          <div className="mt-2">No Data to display</div>
        </div>
      )}
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

export default ResourcesNotStarted;
