/*
 * @Author: xutianxiang
 * @Date: 2021-12-27 18:30:28
 * @LastEditors: xutianxiang
 * @LastEditTime: 2022-01-12 21:04:35
 * @Description: file content
 * @FilePath: \umiapp\src\pages\users\components\UserModal.tsx
 */
import { Modal, Button } from 'antd';
export default (props) => {
  return (
    <div>
      <Modal title="Basic Modal" visible={props.visible}></Modal>
    </div>
  )
}
