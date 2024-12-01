import React from 'react';
import { Layout } from 'antd';
import Dashboard from './Dashboard';

const { Header, Content, Footer } = Layout;

export default function App(): React.ReactElement {
    return (
        <Layout data-testid='app-layout-component'>
            <Header className='flex align-middle'>
                <img src='https://blueflag.com.au/assets/logos/blueflag-logo.svg' width='130' alt='logo' />
            </Header>
            <Content className='px-8'>
                <div className='min-h-screen bg-white mt-8 p-4 rounded'>
                    <Dashboard />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Blue Flag Frontend Coding Exercise | Submission by Rupert Señga
            </Footer>
        </Layout>
    );
}
