import React, { useState, FC } from 'react';
import { Table, Tag, Space, Popconfirm, Button } from 'antd';
// 在model写了export后，就可以从umi中直接导入UserState...很神奇
import { connect, Dispatch, Loading, UserState } from 'umi';
import { SingleUserType, FormValue } from './data.d';

import UserModal from './components/UserModal';

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

// FC表示是函数组件
export const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>,
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
      render: (text: string, record: SingleUserType) => (
        <span>
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            Edit
          </a>{' '}
          &nbsp;
          <Popconfirm
            title="Are you sure to delete this task?"
            // onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // const confirm = (params) => {

  // }

  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };
  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = (values: FormValue) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      console.log('edit');

      dispatch({
        // type要带上命名空间，不然找不到
        type: 'users/edit',
        // 传参
        payload: {
          id,
          values,
        },
      });
    } else {
      console.log('add');

      dispatch({
        // type要带上命名空间，不然找不到
        type: 'users/add',
        // 传参
        payload: {
          id,
          values,
        },
      });
    }

    setModalVisible(false);
  };

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={userListLoading}
      />
      <UserModal
        onFinish={onFinish}
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
      ></UserModal>
    </div>
  );
};
// 这个loading也太玄学了，都不知道是咋实现的
const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(UserListPage);
