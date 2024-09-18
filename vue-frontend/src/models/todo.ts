type Todo = {
  id?: string;

  title: String;

  description: String;

  done: boolean;

  created_date: string;

  updated_date: string;

  due_date?: string;

  done_date?: string;
}

export type { Todo };
