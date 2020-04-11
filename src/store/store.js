import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

//Vuex is state management pattern for our Application
//its centralized store for all component
//so basically we have all our component in one place so we dont duplicate and have clean code
Vue.use(Vuex);

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

//Declare Our Vuex Instance and Set to store variable
export const store = new Vuex.Store({
    //state: is one store for our application which means all data we have
    state: {
        filter: 'all',//Default Filter
        todos: []
    },
    //getters: first all methods get 'state' as first parameter
    //its computed properties for our store
    getters: {
        remainig(state) {//For Remaining Items
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters) {//Check if there is Remaining Items
            return getters.remainig != 0;
        },
        todosFiltered(state) {//Filter Items
            if (state.filter == 'all') {
                return state.todos;
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos;
        },
        showClearCompletedButton(state) {//For Check to show Clear Complete Button
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    //mutations: are similar to event again methods get state as first parameter
    //also for call it from component we should use 'commit'
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing,
            })
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state, checked) {
            state.todos.forEach((todo) => todo.completed = checked)
        },
        deleteTodo(state, id) {
            //Find Index of items and check with id passed to method
            const index = state.todos.findIndex((item) => item.id == id);
            //Splice 1 Item
            state.todos.splice(index, 1);
        },
        updateTodo(state, todo) {
            //Check Items id with data Id passed to method
            const index = state.todos.findIndex((item) => item.id == todo.id);
            //splice 1 item
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        },
        retriveTodos(state, todos) {
            state.todos = todos;
        }
    },
    //actions: are same as mutations but is for task that take some time like Ajax and also for parameter we use context
    //also for call it from component we should use 'dispatch'
    actions: {
        retriveTodos(context) {
            axios.get('/todos')
                .then(response => {
                    context.commit('retriveTodos', response.data)
                })
        },
        addTodo(context, todo) {
            axios.post('/todos', {
                title: todo.title,
                completed: false,
            }).then(response => {
                context.commit('addTodo', response.data)
            });
        },
        clearCompleted(context) {
            const completed = context.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id);

            axios.delete('/todosDeleteCompleted', {
                data: {
                    todos: completed
                }
            })
                .then(response => {
                    context.commit('clearCompleted')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        checkAll(context, checked) {
            axios.patch('/todosCheckAll', {
                completed: checked
            }).then(response => {
                context.commit('checkAll', checked);
            });
        },
        deleteTodo(context, id) {
            axios.delete('/todos/' + id).then(response => {
                context.commit('deleteTodo', id)
            });
        },
        updateTodo(context, todo) {
            axios.patch('/todos/' + todo.id, {
                title: todo.title,
                completed: todo.completed,
            })
                .then(response => {
                    context.commit('updateTodo', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
});