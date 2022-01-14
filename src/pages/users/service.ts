/*
 * @Author: xutianxiang
 * @Date: 2021-12-27 18:30:51
 * @LastEditors: xutianxiang
 * @LastEditTime: 2022-01-12 16:12:10
 * @Description: file content
 * @FilePath: \umiapp\src\pages\users\service.ts
 */

import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValue } from './data';

const errorHandler = function (error: any) {
  const codeMap = {
    '021': 'an error has occurred',
    '022': 'its a big mistake',
  };
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    message.error('network error');
  }
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  // extendRequest对request进行了扩展，使其可以有一些其他的功能
  return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
    methods: 'get',
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValue;
}) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    methods: 'put',
    data: values,
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
export const addRecord = async ({ values }: { values: FormValue }) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users`, {
    methods: 'post',
    data: values,
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
