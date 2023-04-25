import { useState } from 'react'
import MenuBookIcon from "@material-ui/icons/MenuBook"
import PersonIcon from "@material-ui/icons/Person";
import UsersTab from './users.tab'
import LearningResourcesTab from './learning-resources.tab'

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1')

    const handleTab1 = () => {
        setActiveTab('tab1')
    }

    const handleTab2 = () => {
        setActiveTab('tab2')
    }

    const switchTab = (param: string) => {
        switch(param) {
            case 'tab1':
                return <UsersTab />
            default:
                return <LearningResourcesTab />
        }
    }

    return (
        <div className='Tabs'>
            <ul className='nav'>
                <li className={activeTab === 'tab1' ? 'active': ''} onClick={handleTab1}><PersonIcon/><br/>Users</li>
                <li className={activeTab === 'tab2' ? 'active': ''} onClick={handleTab2}><MenuBookIcon/><br/>Learning Resources</li>
            </ul>
            <div className='outlet'>
                {switchTab(activeTab)}
            </div>
        </div>
    )
}

export default Tabs