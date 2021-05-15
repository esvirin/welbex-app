import React from 'react';
import 'antd/dist/antd.css';
import {Breadcrumb, Layout, Pagination, Table, Tag, Space, Row, Col} from 'antd';
import HeaderBar from "./components/Header/HeaderBar";
import TableOut from "./components/Table/TableOut";


const {Header, Content, Footer} = Layout;


class App extends React.Component {
    render() {
        return (
            <Layout style={{height: '100vh'}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>

                    <HeaderBar/>

                </Header>

                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>


                    <TableOut/>

                </Content>
                <Footer style={{textAlign: 'center'}}>Created by <a href="mailto:esvirin@mail.com">esvirin@mail.com</a>
                </Footer>
            </Layout>
        );
    }
}

export default App;