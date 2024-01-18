import { ElMessage, ElMessageBox } from 'element-plus';

export function warn(msg: string) {
  ElMessage({
    message: msg,
    type: 'warning',
    duration: 2000,
  });
}

export function yes(msg: string) {
  ElMessage({
    message: msg,
    type: 'success',
    duration: 2000,
  });
}

export function no(msg: string) {
  ElMessage({
    message: msg,
    type: 'error',
    duration: 2000,
  });
}
export function callMe() {
  ElMessageBox.alert(
    '<el-text class="mx-1">请检查网络并多次尝试后，联系信息化中心</el-text><br/><br/><el-text class="mx-1">红绿黄&nbsp;&nbsp;<a href="tel:+13922758757" class="text-cyan-500">13922758757</a></el-text>',
    '请求错误',
    {
      dangerouslyUseHTMLString: true,
    }
  );
}
