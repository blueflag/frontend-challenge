import Main from './components/atom/main'
import LearningOverview from 'components/atom/dashboard/LearningOverview'
import ResourcesUsersOverview from 'components/atom/dashboard/ResourcesUsersOverview'
import LearningRecordsTable from 'components/atom/dashboard/LearningRecordsTable'
import Greetings from 'components/atom/dashboard/Greetings'

const App = () => {

    return(
        <div>
          <Main>
            <Greetings />
            <LearningOverview />
            <ResourcesUsersOverview />
            <LearningRecordsTable />
          </Main>
        </div>
    )
}

export default App