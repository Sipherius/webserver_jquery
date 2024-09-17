import { RowDataPacket } from 'mysql2';

export interface ITodo extends RowDataPacket {
  id?: string;

  title: String;

  description: String;

  done: boolean;

  created_date: string;

  due_date?: string;

  done_date?: string;

  // constructor(id: string, title: String, description: string) {
  //   this.id = id;
  //   this.title = title;
  //   this.description = description;

  //   const dateObject = new Date();
  //   const date = (`0 ${dateObject.getDate()}`).slice(-2);
  //   const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
  //   const year = dateObject.getFullYear();
  //   const hours = dateObject.getHours();
  //   const minutes = dateObject.getMinutes();
  //   const seconds = dateObject.getSeconds();

  //   this.created_date = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  // }

  // toString() {
  //   return `${this.id} - ${this.title} - ${this.created_date}`;
  // }
}

export default ITodo;
