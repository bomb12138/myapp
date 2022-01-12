import { Reducer, Effect, Subscription } from 'umi'
import {getRemoteList} from './service'

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
     
      return payload;
    }
  },
  // action=={type,payload}
  effects: {
    *getRemote(action, {put, call}) {
      const data = yield call(getRemoteList)
      console.log();
      
      yield put({
        type: 'getList',
        // 这个地方如果报Table.js:101 Uncaught TypeError: rawData.some is not a function 那么可能data外面需要添加或删除一对括号
        payload:  data 
        
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      })
    }
  }
};


// 全流程：在subscription中写上路径和对应的dispatch，找到save函数返回了data。然后index.tsx中因为mapStateToProps中写了users(namespace)，
// 而且index函数中也通过传参的形式将users传进来了，最后赋值给table

export default UserModel;