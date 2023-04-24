import{
  Row,
  Col
} from 'react-bootstrap'
import UsersCompleted from "./UsersCompleted"
import UsersNotCompleted from './UsersNotCompleted'
import ResourcesCompleted from './ResourcesCompleted'
import ResourcesNotStarted from './ResourcesNotStarted'

const ResourcesUsersOverview = () => {
  return(
    <Row className="mb-3">
      <Col xl={6} className="mb-3">
        <UsersCompleted />
      </Col>
      <Col xl={6} className="mb-3">
        <UsersNotCompleted />
      </Col>
      <Col xl={6} className="mb-3">
        <ResourcesCompleted />
      </Col>
      <Col xl={6} className="mb-3">
        <ResourcesNotStarted />
      </Col>
    </Row>
  )
}

export default ResourcesUsersOverview