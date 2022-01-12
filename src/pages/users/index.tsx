import React, {useState} from 'react'
import { Table, Tag, Space } from 'antd';
import { connect } from 'umi';

import UserModal from './components/UserModal';

export const index = ({users}) => {
const [modalVisible, setModalVisible] = useState(false)
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Create-Time',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={visibleHandle}>Edit</a> &nbsp;
        <a>Delete</a>
      </span>
    ),
  },
];

  const visibleHandle = () => {
    setModalVisible(true);
}


  return (
    <div className='list-table'>
      <Table columns={columns} dataSource={users.data} />
      <UserModal visible={modalVisible}></UserModal>
    </div>
  )
}


const mapStateToProps = ({ users }) => {
  return {
    users
  }
}
export default connect(mapStateToProps)(index);



