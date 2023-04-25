import { useEffect, useState } from 'react'
import axios from 'axios'

const LearningResourcesTab = () => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get("/learning-resources.json").then((data) => {
            let learningResources: any = data?.data
            axios.get("/learning-records.json").then((data) => {
                let learningRecords: any = {}
                for (const item of data?.data) {
                    const key = `lr_${item['learning_resource_id']}`
                    if (learningRecords[key] === undefined) {
                        learningRecords[key] = {
                            ATTEMPT: 0,
                            COMPLETE: 0,
                            FAIL: 0,
                            PASS: 0,
                            ENROL: 0,
                            ATTEND: 0,
                        }
                    }
                    learningRecords[key]['ATTEMPT'] += item['learning_record_verb'] === 'ATTEMPT' ? 1 : 0
                    learningRecords[key]['COMPLETE'] += item['learning_record_verb'] === 'COMPLETE' ? 1 : 0
                    learningRecords[key]['FAIL'] += item['learning_record_verb'] === 'FAIL' ? 1 : 0
                    learningRecords[key]['PASS'] += item['learning_record_verb'] === 'PASS' ? 1 : 0
                    learningRecords[key]['ENROL'] += item['learning_record_verb'] === 'ENROL' ? 1 : 0
                    learningRecords[key]['ATTEND'] += item['learning_record_verb'] === 'ATTEND' ? 1 : 0
                }

                for (let item of learningResources) {
                    const key = `lr_${item['masterId']}`
                    if (learningRecords[key] !== undefined) {
                        item.record = learningRecords[key]
                    }
                }

                learningResources.sort((a: any, b: any) => {
                    const recordA = a.record.COMPLETE
                    const recordB = b.record.COMPLETE
                    if (recordA < recordB) {
                        return 1
                    }
                    if (recordA > recordB) {
                        return -1
                    }
                    return 0
                })
                setPost(learningResources)
            })            
        })
    }, [])

    return (
        <div className='LearningResourcesTab'>
            <table>
                <tbody>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Attempted</th>
                        <th>Failed</th>
                        <th>Passed</th>
                        <th>Enrolled</th>
                        <th>Attended</th>
                    </tr>
                    {post.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val['code']}</td>
                            <td>{val['title']}</td>
                            <td>{val['record']['COMPLETE']}</td>
                            <td>{val['record']['ATTEMPT']}</td>
                            <td>{val['record']['FAIL']}</td>
                            <td>{val['record']['PASS']}</td>
                            <td>{val['record']['ENROL']}</td>
                            <td>{val['record']['ATTEND']}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LearningResourcesTab;