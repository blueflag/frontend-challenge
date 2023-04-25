import { useEffect, useState } from 'react'
import axios from 'axios'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import Modal from "@material-ui/core/Modal"
import Box from "@material-ui/core/Box"
import Select from "@material-ui/core/Select"
import MenuItem  from "@material-ui/core/MenuItem"
import FormControl  from "@material-ui/core/FormControl"
import InputLabel  from "@material-ui/core/InputLabel"
import Button  from "@material-ui/core/Button"

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#fff',
    border: '1px solid #39A2DB',
    boxShadow: 24,
    p: 4
};

const UsersTab = () => {
    const [post, setPost] = useState([])
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({id: '', givenName: '', familyName: ''})
    const [learningRecord, setLearningRecord] = useState('ATTEMPT')
    const [learningResource, setLearningResource] = useState([])

    const handleOpen = (user: any) => {
        setOpen(true)
        setCurrentUser(user)

        axios.get("/learning-resources.json").then((data) => {
            let learningResources: any = {}
            for (const item of data?.data) {
                learningResources[`lr_${item['masterId']}`] = item
            }

            axios.get("/learning-records.json").then((data) => {
                let records: any = []
                for (let item of data?.data) {
                    const key = `lr_${item['learning_resource_id']}`
                    if (item['user_id'] === user['id'] && learningResources[key] !== undefined) {
                        item['code'] = learningResources[key]['code']
                        item['title'] = learningResources[key]['title']
                        records.push(item)
                    }
                }
                setLearningResource(records)
            })
        })
    }

    const handleClose = () => {
        setOpen(false)
        setLearningResource([])
    }

    useEffect(() => {
        axios.get("/users.json").then((data) => {
            const users: any = data?.data
            axios.get("/learning-records.json").then((data) => {
                const records: any = {}
                for (const item of data?.data) {
                    const userKey = `count_${item['user_id']}`
                    if (records[userKey] === undefined){
                        records[userKey] = 0
                    }
                    if (item['learning_record_verb'] === 'COMPLETE') {
                        records[userKey]++
                    }
                }
                for (let user of users) {
                    user['completedLearningResources'] = records[`count_${user['id']}`] === undefined ? 0 : records[`count_${user['id']}`]
                }
                users.sort((a: any, b: any) => {
                    const userA = a.completedLearningResources
                    const userB = b.completedLearningResources
                    if (userA < userB) {
                        return 1
                    }
                    if (userA > userB) {
                        return -1
                    }
                    return 0
                })
                setPost(users)
            })
        })
    }, [])

    const handleChange = (event: any) => {
        setLearningRecord(event.target.value as string)
    }

    return (
        <div className='UsersTab'>
            <table>
                <tbody>
                    <tr>
                        <th>Given Name</th>
                        <th>Family Name</th>
                        <th>Job Positions</th>
                        <th>Completed Learning Resources</th>
                        <th></th>
                    </tr>
                    {post.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val['givenName']}</td>
                            <td>{val['familyName']}</td>
                            <td>{val['jobPositions']}</td>
                            <td>{val['completedLearningResources']}</td>
                            <td>
                                <Tooltip title="View Learning Records">
                                    <IconButton onClick={() => handleOpen(val)}>
                                        <MenuBookIcon />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h4>{currentUser['givenName']} {currentUser['familyName']}</h4>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel id="learning-record-verb-label">Learning Record</InputLabel>
                        <Select
                            labelId="learning-record-verb-label"
                            id="learning-record-verb-select"
                            value={learningRecord}
                            label="Learning Record"
                            onChange={handleChange}
                        >
                            <MenuItem value={'ATTEMPT'}>Attempted</MenuItem>
                            <MenuItem value={'COMPLETE'}>Completed</MenuItem>
                            <MenuItem value={'FAIL'}>Failed</MenuItem>
                            <MenuItem value={'PASS'}>Passed</MenuItem>
                            <MenuItem value={'ENROL'}>Enrolled</MenuItem>
                            <MenuItem value={'ATTEND'}>Attended</MenuItem>
                        </Select>
                        <br/>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Code</th>
                                    <th>Title</th>
                                    <th>Date and Time</th>
                                </tr>
                                {learningResource.map((val, key) => {
                                    if (val['learning_record_verb'] === learningRecord) {
                                        return (
                                            <tr key={key}>
                                                <td>{val['code']}</td>
                                                <td>{val['title']}</td>
                                                <td>{val['learning_record_timestamp']}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </FormControl>
                    <br/><br/>
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UsersTab