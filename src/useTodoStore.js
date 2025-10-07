import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  //State
  todos: [],
  //Actions
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id:Date.now(),
      text: text,
      completed: false,
      createdAt: new Date()
    }]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  getTodoCount: () => get().todos.length,
}))

export default useTodoStore;