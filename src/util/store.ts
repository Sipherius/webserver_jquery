import mysql, { ConnectionOptions, Pool, QueryError } from 'mysql2';
import ITodos from '../models/todos';

// import Todo from '../models/todo';

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

  getTodos(): Promise<ITodos | QueryError> {
    return new Promise((resolve, reject) => {
      this.pool.query<ITodos>('SELECT * FROM a_todos;', (_err, rows) => {
        if (_err) {
          return reject(_err);
        }
        return resolve(rows);
      });
    });
  }

  // addTodo(todo: Todo): Todo {
  //   const todos = this.db.get('todos');
  //   todo.id = getFreeId(todos); // eslint-disable-line no-param-reassign
  //   todos.push(todo);
  //   this.db.set('todos', todos);
  //   return todo;
  // }

  // addTodos(todos: Todos): Todos {
  //   const dbTodos = this.db.get('todos');
  //   todos.forEach((todo) => {
  //     todo.id = getFreeId(todos); // eslint-disable-line no-param-reassign
  //     dbTodos.push(todo);
  //   });
  //   this.db.set('todos', dbTodos);
  //   return dbTodos;
  // }

  // deleteAllTodos() {
  //   this.db.set('todos', []);
  // }
}

export default Store;
