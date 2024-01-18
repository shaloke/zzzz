export interface RECEIVERS {
  dept_full_name: string;
  dept_id: number;
  dept_name: string;
  factory: string;
  user_id: string;
  user_name: string;
  label?: string;
}
export interface STATE {
  recv_user: Array<RECEIVERS>;
  freq_user: Array<RECEIVERS>;
  receivers: Array<RECEIVERS>;
  search_result: Array<RECEIVERS>;
  tree_data: Array<RECEIVERS>;
}
