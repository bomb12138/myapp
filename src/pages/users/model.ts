import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, editRecord, addRecord } from './service';
import { message } from 'antd';
import { SingleUserType, FormValue } from './data.d';

export interface UserState {
  data: [];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const UserModel: UserModelType = {
  namespace: 'users',
  // 初始化
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    // 函数  之前的状态
    getList(state, { payload }) {
      return payload;
    },
  },
  // action=={type,payload}
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getRemoteList);
      if (data) {
        yield put({
          type: 'getList',
          // 这个地方如果报Table.js:101 Uncaught TypeError: rawData.some is not a function 那么可能data外面需要添加或删除一对括号
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        message.success('edit success');
        // 刷新列表
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('edit failed');
      }
    },
    *add({ payload: { id, values } }, { put, call }) {
      const data = yield call(addRecord, { id, values });
      if (data) {
        message.success('edit success');
        // 刷新列表
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('add failed');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

// 全流程：在subscription中写上路径和对应的dispatch，找到save函数返回了data。然后index.tsx中因为mapStateToProps中写了users(namespace)，
// 而且index函数中也通过传参的形式将users传进来了，最后赋值给table

export default UserModel;
