/*
 * @Author: xutianxiang
 * @Date: 2021-12-27 18:30:51
 * @LastEditors: xutianxiang
 * @LastEditTime: 2022-01-12 16:12:10
 * @Description: file content
 * @FilePath: \umiapp\src\pages\users\service.ts
 */
import {request} from 'umi'

export const getRemoteList = async params => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
    methods: 'get',
  }).then(function (response) {
    console.log(response);
    return response;
    
  }).catch(function (error) {
      console.log(error);
      
  });
  // const data = [
  //               {
  //                 key: '1',
  //                 name: 'John Brown',
  //                 age: 32,
  //                 address: 'New York No. 1 Lake Park',
  //                 tags: ['nice', 'developer'],
  //               },
  //               {
  //                 key: '2',
  //                 name: 'Jim Green',
  //                 age: 42,
  //                 address: 'London No. 1 Lake Park',
  //                 tags: ['loser'],
  //               },
  //               {
  //                 key: '3',
  //                 name: 'Joe Black',
  //                 age: 32,
  //                 address: 'Sidney No. 1 Lake Park',
  //                 tags: ['cool', 'teacher'],
  //               },
  // ];
}