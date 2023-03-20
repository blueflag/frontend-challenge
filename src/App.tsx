import React, { useState, useEffect } from 'react';
import LearningResources from './LearningResources';
import Users from './Users';
import './App.css'

export default function App(): React.ReactElement {
    const [tab, setTab] = useState(0)
    const [users, setUsers] = useState([])
    const [resources, setResources] = useState([])
    const [records, setRecords] = useState([])

    const handleTabClick = (value: number) => {
        setTab(value)
    }

    useEffect(() => {
        const requestUser = () => {
            let result: Array<any> = []
            const xhr = new XMLHttpRequest(); 
            xhr.open('GET', 'http://localhost:3000/users.json', true)
            xhr.onload = () => {
              if(xhr.status === 200) {
                const data = JSON.parse(xhr.response)
                setUsers(data)
              }
            }
            xhr.send(null)
            return result
        }

        const requestResources = () => {
            let result: Array<any> = []
            const xhr = new XMLHttpRequest(); 
            xhr.open('GET', 'http://localhost:3000/learning-resources.json', true)
            xhr.onload = () => {
              if(xhr.status === 200) {
                const data = JSON.parse(xhr.response)
                setResources(data)
              }
            }
            xhr.send(null)
            return result
        }

        const requestRecords = () => {
            let result: Array<any> = []
            const xhr = new XMLHttpRequest(); 
            xhr.open('GET', 'http://localhost:3000/learning-records.json', true)
            xhr.onload = () => {
              if(xhr.status === 200) {
                const data = JSON.parse(xhr.response)
                setRecords(data)
              }
            }
            xhr.send(null)
            return result
        }

        requestUser()
        requestResources()
        requestRecords()

    }, [])

    return <div>
        <header className="Header">
            <img src="https://blueflag.com.au/assets/logos/blueflag-logo.svg" width="130" alt="logo" />
        </header>
        <main className="Main">
            <div className='tabs'>
                <div className={`tabs-item ${tab === 0 && 'active'}`} onClick={() => handleTabClick(0)}>
                    Users
                </div>
                <div className={`tabs-item ${tab === 1 && 'active'}`} onClick={() => handleTabClick(1)}>
                    Learning Resources
                </div>
            </div>
            {
                tab === 0 && <Users users={users} records={records} resources={resources} />
            }
            {
                tab === 1 && <LearningResources resources={resources} records={records} />
            }
        </main>
    </div>;
}