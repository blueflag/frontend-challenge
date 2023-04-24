import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Row,
  Col
} from 'react-bootstrap'
import Summary from "./Summary"

const LearningOverview: React.FC = () => {

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

  const completedUsers = learningRecords.reduce((map, record) => {
    const user = users.find((u) => u.id === record.user_id)
    if (user) {
      const count = map.get(user) || 0
      map.set(user, count + 1)
    }
    return map
  }, new Map<User, number>())

  const usersWithCount = Array.from(completedUsers.entries()).map(([user, count]) => ({ user, count }))
  const topUsers = usersWithCount.sort((a, b) => b.count - a.count)

  const incompleteUsers = users.filter((user) => {
    return !learningRecords.some((record) => record.user_id === user.id)
  });

  const inactiveUsers = incompleteUsers

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

  const unstartedResources = learningResources.filter((resource) => {
    const records = learningRecords.filter(
      (record) => record.learning_resource_id === resource.masterId
    );

    return records.length === 0
  });

  return (
    <Row className="mb-5">
      <Col md={6} lg={3} className="mb-3 mb-lg-0">
        <Summary count={topUsers.length} variant="success" label="Top Users" />
      </Col>
      <Col md={6} lg={3} className="mb-3 mb-lg-0">
        <Summary count={inactiveUsers.length} variant="danger" label="Inactive Users" />
      </Col>
      <Col md={6} lg={3} className="mb-3 mb-lg-0">
        <Summary count={resourceCompletionCount.length} variant="primary" label="Completed Resources" />
      </Col>
      <Col md={6} lg={3} className="mb-3 mb-lg-0">
        <Summary count={unstartedResources.length} variant="warning" label="Not Started Resources" />
      </Col>
    </Row>
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

export default LearningOverview;
