import React, { useEffect, useState } from "react"
import axios from "axios"
import Avatar from "../../molecule/avatar";

const LearningRecordsTable: React.FC = () => {

  const [users, setUsers] = useState<User[]>([])
  const [learningResources, setLearningResources] = useState<LearningResource[]>([])
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usersPerPage] = useState<number>(10)

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

  const formatDate = (userId:string) => {
    const record = learningRecords.find(record => record.user_id === userId)
    if (record) {
      const date = new Date(record.learning_record_timestamp)
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sept', 'Oct', 'Nove', 'Dec'
      ];
      const month = monthNames[date.getMonth()];
      const day = date.getDate().toString().padStart(2, '0')
      const year = date.getFullYear().toString();
      return `${month} ${day} ${year}`
    }
    return '';
  };

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  };

  return (
    <div>
      <h2 className="h5">Learning Records</h2>
      <div className="overflow-x-auto">
        <table className="w-100">
          <thead>
            <tr>
              <th>
                <div className="bg-dark text-white fs-14 px-3 py-2 rounded-3">
                  <table className="w-100">
                    <tr>
                      {false && <th>User ID</th> }
                      { false && <th>Learning Resource ID</th> }
                      <th>
                        <div data-width={160}>Name</div>
                      </th>
                      <th>
                        <div data-width={270}>Job Position</div>
                      </th>
                      <th>
                        <div data-width={100}>Status</div>
                      </th>
                      <th>
                        <div data-width={100}>Date Taken</div>
                      </th>

                      <th>
                        <div data-width={100}>Resources</div>
                      </th>
                    </tr>
                  </table>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="bg-white box-shadow-1 px-3 py-2 rounded-3 mt-2">
                    <table className="w-100">
                      <tr>
                        {false && <td>{user.id}</td> }
                        { false && <td>{learningRecords.find(record => record.user_id === user.id)?.learning_resource_id}</td> }
                        <td>
                          <div data-width={160} className="d-flex align-items-center">
                            <Avatar src={user.avatar} className="me-2"/>
                            <div>{user.givenName} {user.familyName}</div>
                          </div>
                        </td>
                        <td>
                          <div data-width={270}>{user.jobPositions}</div>
                        </td>
                        <td>
                        <div data-width={100}>
                          {learningRecords.find(record => record.user_id === user.id)?.learning_record_verb === "ATTEMPT" && (
                            <div className="text-warning">ATTEMPT</div>
                          )}
                          {learningRecords.find(record => record.user_id === user.id)?.learning_record_verb === "COMPLETE" && (
                            <div className="text-success">COMPLETE</div>
                          )}
                        </div>
                        </td>
                        <td>
                          <div data-width={100}>{formatDate(user.id)}</div>
                        </td>
                        <td>
                          <div data-width={100}>{learningResources.find(resource => resource.masterId === learningRecords.find(record => record.user_id === user.id)?.learning_resource_id)?.title}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {Array.from(Array(totalPages).keys()).map(pageNumber => (
          <button 
            key={pageNumber} 
            data-width={35}
            data-height={35}
            className={ "mt-3 me-2 rounded-3 box-shadow-1 border-none " + (currentPage === pageNumber + 1 ? 'bg-primary text-white' : 'bg-white')} 
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
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

export default LearningRecordsTable;
