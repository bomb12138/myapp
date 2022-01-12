import {Reducer, Effect, Subscription} from  'umi'

interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {},
  effects: {
    getRemote: Effect;
  },
  subscriptions: {
    setup: Subscription
  }
}
const UserModel:UserModelType = {
  namespace: 'users',
  state: {},
  reducers: {
    
    // 函数  之前的状态  
    getList(state, {payload}) {
     const data = [
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                  address: 'New York No. 1 Lake Park',
                  tags: ['nice', 'developer'],
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 1 Lake Park',
                  tags: ['loser'],
                },
                {
                  key: '3',
                  name: 'Joe Black',
                  age: 32,
                  address: 'Sidney No. 1 Lake Park',
                  tags: ['cool', 'teacher'],
                },
      ];
      return data;
    }
  },
  // action=={type,payload}
  effects: {
    *getRemote(action, {put}) {
      
      // yield put({
      //   type: 'getList',
      //   payload: data
      // })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getList',
          });
        }
      })
    }
  }
};


// 全流程：在subscription中写上路径和对应的dispatch，找到save函数返回了data。然后index.tsx中因为mapStateToProps中写了users(namespace)，
// 而且index函数中也通过传参的形式将users传进来了，最后赋值给table

export default UserModel;