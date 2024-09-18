import mysql, {
  ConnectionOptions, Pool, QueryError, ResultSetHeader,
} from 'mysql2';
import ITodos from '../models/todos';

import ITodo from '../models/todo';

const dbOptions: ConnectionOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '0', 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

let globalPool: Pool;

class Store {
  pool: Pool;

  constructor() {
    if (!globalPool) {
      globalPool = mysql.createPool(dbOptions);
    }
    this.pool = globalPool;

    this.pool.getConnection((_err, con) => {
      try {
        if (con) {
          con.release();
        }
      } catch (err) {
        throw new Error(`MySQL error. ${err}`);
      }
    });
  }

  getTodos(): Promise<ITodos | Error> {
    return new Promise((resolve, reject) => {
      this.pool.query<ITodos>('SELECT * FROM a_todos;', (_err: QueryError, rows: ITodos) => {
        if (_err) {
          return reject(_err);
        }
        return resolve(rows);
      });
    });
  }

  getTodo(id: string): Promise<ITodo | Error> {
    return new Promise((resolve, reject) => {
      this.pool.query<ITodos>(`SELECT * FROM a_todos WHERE id = '${id}';`, (_err: QueryError, rows: ITodos) => {
        if (_err) {
          return reject(_err);
        }
        if (rows.length !== 1) {
          return reject(new Error('Error retrieving todo.'));
        }
        return resolve(rows[0]);
      });
    });
  }

  addTodo(todo: ITodo): Promise<ITodo | Error> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO a_todos 
                  (id, title, description, done, created_date, updated_date, due_date, done_date) 
                  VALUES (
                  '${todo.id}', 
                  '${todo.title}', 
                  '${todo.description}', 
                  '${todo.done}', 
                  '${todo.created_date}', 
                  '${todo.updated_date}', 
                  ${todo.due_date ? `'${todo.due_date}'` : 'NULL'}, 
                  ${todo.done_date ? `'${todo.done_date}'` : 'NULL'}
                  )`;

      this.pool.query<ITodos>(sql, (_err: QueryError, result: ResultSetHeader) => {
        if (_err) {
          return reject(_err);
        }
        if (!result.affectedRows) {
          return reject(new Error('Todo could not be inserted.'));
        }
        return resolve(todo);
      });
    });
  }

  updateTodo(todo: ITodo): Promise<ITodo | Error> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE a_todos 
                  SET 
                  title = '${todo.title}', 
                  description = '${todo.description}', 
                  updated_date = '${todo.updated_date}' 
                  WHERE 
                  id = '${todo.id}'`;

      this.pool.query<ITodos>(sql, (_err: QueryError, result: ResultSetHeader) => {
        if (_err) {
          return reject(_err);
        }
        if (!result.affectedRows) {
          return reject(new Error('Todo could not be updated.'));
        }
        return resolve(todo);
      });
    });
  }

  deleteTodo(id: string): Promise<void | Error> {
    return new Promise((resolve, reject) => {
      this.pool.query<ITodos>(`DELETE FROM a_todos WHERE id = '${id}';`, (_err: QueryError, result: ResultSetHeader) => {
        if (_err) {
          return reject(_err);
        }
        if (!result.affectedRows) {
          return reject(new Error('Todo could not be deleted.'));
        }
        return resolve();
      });
    });
  }
}

export default Store;
