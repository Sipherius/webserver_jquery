import { RowDataPacket } from 'mysql2';

export interface ITodo extends RowDataPacket {
  id?: string;

  title: String;

  description?: String;

  done: boolean;

  created_date?: string;

  updated_date?: string;

  due_date?: string | null;

  done_date?: string |null;
}

export default ITodo;
