import Vue from 'vue';
import Vuex from 'vuex';

//Vuex is state management pattern for our Application
//its centralized store for all component
//so basically we have all our component in one place so we dont duplicate and have clean code
Vue.use(Vuex);

//Declare Our Vuex Instance and Set to store variable
export const store = new Vuex.Store({
    //state: is one store for our application which means all data we have
    state: {
        filter: 'all',//Default Filter
        todos: [//Sample Data
            {
                'id': 1,
                'title': 'Finish Vue Screen',
                'completed': false,
                'editing': false
            }, {
                'id': 2,
                'title': 'Take Over The World',
                'completed': false,
                'editing': false
            },
        ]
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
        }
    },
    //actions: are same as mutations but is for task that take some time like Ajax
    //also for call it from component we should use 'dispatch'
    actions: {
        addTodo(context, todo) {
            context.commit('addTodo', todo);
        },
        clearCompleted(context) {
            context.commit('clearCompleted');
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        checkAll(context, checked) {
            context.commit('checkAll', checked);
        },
        deleteTodo(context, id) {
            context.commit('deleteTodo', id);
        },
        updateTodo(context, todo) {
            context.commit('updateTodo', todo);
        }
    }
});