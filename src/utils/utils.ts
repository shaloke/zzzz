// 格式化数字
export function formatNumber(num: number) {
  return num >= 1e3 && num < 1e4
    ? `${(num / 1e3).toFixed(1)}K`
    : num >= 1e4
    ? `${(num / 1e4).toFixed(1)}W`
    : num;
}

// TS 对象key合法检查
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * 首页母大写其他字母小写
 * @param str 字符串
 * @returns 首字母大写其他字母小写的字符串
 */
export function firstToUpper(str: string): string {
  return str.replace(/(w)(w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

/**
 * 是否是浏览器环境
 * @returns boolean
 */
export function isBrowser(): boolean {
  return typeof global === "undefined";
}

/**
 * 获取今日日期 2222-01-09
 * @returns string
 */
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = "/";
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = Number("0" + month);
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = Number("0" + strDate);
  }
  const currentDate = year + seperator1 + month + seperator1 + strDate;
  return currentDate;
}
/**
 * 判断是否是移动端
 * @returns boolean
 */
// export const testIsPhone = () => {
//   return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
// };
