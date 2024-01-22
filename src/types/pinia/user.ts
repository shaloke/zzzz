export interface USERINFO {
  avatar: string;
  dept_full_name: string;
  dept_id: number;
  dept_name: string;
  factory: string;
  name: string;
  phone: string;
  uploadUser: string;
  user_id: string;
}

export interface STATE {
  userInfo: USERINFO;
}
