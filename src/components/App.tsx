import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default function App(): React.ReactElement {
    return (
        <Layout>
            <Header className='flex align-middle'>
                <img src='https://blueflag.com.au/assets/logos/blueflag-logo.svg' width='130' alt='logo' />
            </Header>
            <Content className='px-8'>
                <div className='min-h-screen bg-white mt-8 p-4 rounded'>
                    Hello World!
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Blue Flag Frontend Coding Exercise | Submission by Rupert Señga
            </Footer>
        </Layout>
    );
}
