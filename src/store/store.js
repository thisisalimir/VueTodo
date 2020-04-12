import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from '../firebase'

//Vuex is state management pattern for our Application
//its centralized store for all component
//so basically we have all our component in one place so we dont duplicate and have clean code
Vue.use(Vuex);
//Declare Our Api url
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

//Declare Our Vuex Instance and Set to store variable
export const store = new Vuex.Store({
    //state: is one store for our application which means all data we have
    state: {
        //Loading
        loading: true,
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
    //mutations: are similar to event again methods get 'state' as first parameter
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
        //Get todos and bind to todos state
        retrieveTodos(state, todos) {
            state.todos = todos;
        }
    },
    //actions: are same as mutations but is for task that take some time like Ajax and also for parameter we use context
    //also for call it from component we should use 'dispatch'
    actions: {
        //Get All Tasks
        retrieveTodos(context) {
            context.state.loading = true;
            //Get Task From firestore DB
            db.collection('todos').get()
                .then(querySnapshot => {
                    let tempTodos = [];
                    querySnapshot.forEach(
                        doc => {
                            const data = {
                                id: doc.id,
                                title: doc.data().title,
                                completed: doc.data().completed,
                                timestamp: doc.data().timestamp,
                            };
                            tempTodos.push(data)
                        });
                    context.state.loading = false;
                    //Sort by Timestamp because Firebase is NoSql
                    const tempTodosSorted = tempTodos.sort((a, b) => {
                        return a.timestamp.seconds - b.timestamp.seconds;
                    });
                    context.commit('retrieveTodos', tempTodosSorted)
                })
        },
        //Adding Todos
        addTodo(context, todo) {
            db.collection('todos').add({
                title: todo.title,
                completed: false,
                timestamp: new Date(),
            }).then(docRef => {
                context.commit('addTodo', {
                    id: docRef.id,
                    title: todo.title,
                    completed: false,
                })
            });
        },
        clearCompleted(context) {
            db.collection('todos').where('completed', '==', true).get()
                .then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        doc.ref.delete()
                            .then(() => {
                                context.commit('clearCompleted')
                            })
                    })
                });
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        //Checked All Todos
        checkAll(context, checked) {
            db.collection('todos').get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            completed: checked
                        }).then(() => {
                            context.commit('checkAll', checked);
                        })
                    })
                });

        },
        deleteTodo(context, id) {
            db.collection('todos').doc(id).delete()
                .then(() => {
                    context.commit('deleteTodo', id)
                });
        },
        //Update Todos
        updateTodo(context, todo) {
            db.collection('todos').doc(todo.id).set({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                timestamp: new Date(),
            }).then(() => {
                context.commit('updateTodo', todo)
            });
        }
    }
});