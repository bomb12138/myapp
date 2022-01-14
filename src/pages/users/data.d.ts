// 通用数据定义
export interface SingleUserType {
  id: number;
  name: string;
  email: string;
  create_time: string;
  update_time: string;
  status: number;
}
export interface FormValue {
  [name: string]: any;
}
