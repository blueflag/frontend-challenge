import React, { useState, useEffect, useMemo }  from 'react'
import Main from './components/atom/main'
import usersData from './data/users.json'
import learningResourcesData from './data/learning-resources.json'
import learningRecordsData from './data/learning-records.json'
import Pagination from 'components/atom/pagination'

interface User {
    id: string
    givenName: string
    familyName: string
    jobPositions: string
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

interface CombinedData {
    id: string
    name: string
    title?: string
    status: string
    position: string
    learningRecords: LearningRecord[]
}

const Home = () => {

    const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {

    const users: User[] = JSON.parse(JSON.stringify(usersData));
    const learningResources: LearningResource[] = JSON.parse(
      JSON.stringify(learningResourcesData)
    );
    const learningRecords: LearningRecord[] = JSON.parse(
      JSON.stringify(learningRecordsData)
    );

    const combinedData: CombinedData[] = users.map((user) => {
        const userLearningRecords = learningRecords.filter(
          (record) => record.user_id === user.id
        );

        const firstUserRecord = userLearningRecords.slice(0, 1);
        const restUserRecords = userLearningRecords.slice(1);
      
        const combinedUserLearningRecords = firstUserRecord.map((userRecord) => {
            const resource = learningResources.find(
              (resource) => resource.masterId === userRecord.learning_resource_id
            );
            return {
              id: user.id,
              name: user.givenName,
              title: resource?.title,
              status: userRecord?.learning_record_verb,
              position: user.jobPositions,
              learningRecords: restUserRecords
            };
          });
        return combinedUserLearningRecords;
      }).flat();

    setCombinedData(combinedData);
  }, []);

  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);

  const toggleRecord = (recordId: string) => {
    if (expandedRecords.includes(recordId)) {
      setExpandedRecords(expandedRecords.filter((id) => id !== recordId));
    } else {
      const userRecord = combinedData.find((data) => data.id === recordId);
      if (userRecord) {
        setExpandedRecords([...expandedRecords, recordId, ...userRecord.learningRecords.map(record => record.learning_resource_id)]);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return combinedData.slice(startIndex, endIndex);
  }, [combinedData, currentPage]);

    return(
        <div>
            <Main>
            <table className="w-100">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                {paginatedData.map((data) => (
                    <React.Fragment key={data.id}>
                        <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.title}</td>
                        <td>{data.status}</td>
                        <td>{data.position}</td>
                        <td>
                            {data.learningRecords.length > 0 && (
                            <button
                                onClick={() => toggleRecord(data.id)}
                                className="btn btn-secondary btn-sm"
                            >
                                {expandedRecords.includes(data.id)
                                ? "Hide additional records"
                                : `Show ${data.learningRecords.length} additional records`}
                            </button>
                            )}
                        </td>
                        </tr>
                        {expandedRecords.includes(data.id) &&
                        data.learningRecords.map((record) => (
                            <tr key={record.learning_resource_id}>
                            <td></td>
                            <td></td>
                            <td>{record.learning_resource_id}</td>
                            <td>{record.learning_record_verb}</td>
                            <td></td>
                            <td></td>
                            </tr>
                        ))}
                    </React.Fragment>
                    ))}
                </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(combinedData.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </Main>
        </div>
    )
}

export default Home