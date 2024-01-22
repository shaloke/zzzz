export interface FILE {
  finish_time: string; // 传输结束时间
  id: number; // 文件id
  name: string; // 文件名称
  predict_time: string; // 预计完成时间
  status: string; // 状态，排队在第几号
  uni_name: string;
  url: string;
}

export interface QUERY {
  predict_time?: string;
  files: Array<FILE>;
  finish_time: string; // 预计完成时间
  id: number; // 传输id
  records_create: string; // 上传时间
  recv_user: string; // 接收人
  send_user: string; // 发送人
}

export interface STATE {
  queryList: Array<QUERY>;
  myQuery: Array<QUERY>;
  my100Query: Array<QUERY>;
}
