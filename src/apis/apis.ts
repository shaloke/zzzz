import request from '@/request';

/**
 *
 * @returns 用户登录的信息
 */
export async function getUserInfo() {
  return request({
    url: 'https://www.gzcdgd.com/trans/v2/trans/user/v2/info',
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @returns 绑定用户
 */

export async function bindUserInfo(params: {
  phone?: string;
  factory?: string;
}) {
  return request({
    url: 'https://www.gzcdgd.com/trans/v2/trans/user/v2/info',
    method: 'GET',
    data: params,
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @returns 更新用户的信息
 */
export async function updateUserInfo(data: {
  phone?: string;
  factory?: string;
}) {
  return request({
    url: 'https://www.gzcdgd.com/trans/v2/trans/user/v2/info',
    method: 'POST',
    data: data,
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @returns 获取分厂信息
 */
export async function getFactorys() {
  return request({
    url: 'https://www.gzcdgd.com/trans/v2/trans/factorys',
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @param params 条目数
 * @returns
 */
export async function getuploadList(params: string | number) {
  return request({
    url: `https://www.gzcdgd.com/trans/v2/trans/uploadlist?size=${params}`,
    method: 'GET',
    headers:{
      'Authorization':''
    }
  }).catch((err) => {
    throw new Error(err);
  });
}
export async function getuploadListByType(params: string | number) {
  return request({
    url: `https://www.gzcdgd.com/trans/v2/trans/v2/uploadlist?size=${params}`,
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}
/**
 *
 * @returns 最近使用过的接收人
 */

export async function getCloselyReceiver() {
  return request({
    url: `https://www.gzcdgd.com/trans/v2/trans/v2/ref_user`,
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @param params 搜索关键字
 * @returns
 */
export async function searchReceivers(params: string) {
  return request({
    url: `search_user?search=${params}`,
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *
 * @param params
 * @returns
 */
interface QUERYPARAMS {
  size: string | number;
  type?: string;
  uploadtime?: string;
}
export async function getQueryList(params: QUERYPARAMS) {
  let url: string = '';
  if (params.hasOwnProperty('uploadtime')) {
    url += `uploadlist?uploadtime=${params.uploadtime}&size=${params.size}&type=${params.type}`;
  } else {
    url += `uploadlist?size=${params.size}&type=${params.type}`;
  }
  return request({
    url,
    method: 'GET',
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 *  上传文件
 * @param params
 * @returns
 */
export async function uploadFiles(params) {
  return request({
    url: `uploadFiles`,
    method: 'POST',
    data: params,
  }).catch((err) => {
    throw new Error(err);
  });
}
