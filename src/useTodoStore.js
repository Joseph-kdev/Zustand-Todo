import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  //State
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'

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

  setFilter: (filter) => set({ filter }),

  // Computed values (selectors)
  getFilteredTodos: () => {
    const { todos, filter } = get()
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  },
  
  getTodoCount: () => get().todos.length,
  getActiveCount: () => get().todos.filter(todo => !todo.completed).length
}))

export default useTodoStore;