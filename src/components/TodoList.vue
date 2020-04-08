<template>
    <div>
        <!--   V-model For Bind Data To Input
               @keyup.enter is for Time User Type on input and press Enter
               also we add addTodo() Method-->
        <input type="text" class="todo-input" placeholder="What Needs To Be Done?" v-model="newTodo"
               @keyup.enter="addTodo">
        <!--Transition for making it Animation-->
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <!--  Loop Through Each Items also pass index of items
                   :key is for pass items id-->
            <todo-item v-for="(todo) in todosFiltered" :key="todo.id" :todo="todo"
                       :checkAll="!anyRemaining"
                       @removedTodo="removeTodo" @finishedEdit="finishedEdit"></todo-item>
        </transition-group>
        <div class="extra-container">
            <!--Show Remaining Task-->
            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div>
            <div>{{ remainig }} Items Left</div>
        </div>
        <div class="extra-container">
            <div>
                <!--Check All, Active, Completed Task-->
                <button :class="{active: filter == 'all'}" @click="filter = 'all'">All</button>
                <button :class="{active: filter == 'active'}" @click="filter = 'active'">Active</button>
                <button :class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
            </div>
            <div>
                <transition name="fade">
                    <!--Clear Complete Task-->
                    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";

    export default {
        name: 'todo-list',
        components: {
            TodoItem,
        },
        data() {
            return {
                newTodo: '',
                idForTodo: 3,
                beforeEditCache: '',
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
            }
        },
        computed: {
            remainig() {//For Remaining Items
                return this.todos.filter(todo => !todo.completed).length
            },
            anyRemaining() {//Check if there is Remaining Items
                return this.remainig != 0;
            },
            todosFiltered() {//Filter Items
                if (this.filter == 'all') {
                    return this.todos;
                } else if (this.filter == 'active') {
                    return this.todos.filter(todo => !todo.completed)
                } else if (this.filter == 'completed') {
                    return this.todos.filter(todo => todo.completed)
                }
                return this.todos;
            },
            showClearCompletedButton() {//For Check to show Clear Complete Button
                return this.todos.filter(todo => todo.completed).length > 0
            }
        },
        methods: {
            addTodo() {//Add to Do
                if (this.newTodo.trim().length == 0) {//Validation
                    return
                }
                this.todos.push({//Add Item to List
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                });
                //Clear Input
                this.newTodo = '';
                //Increment Id
                this.idForTodo++;
            },
            removeTodo(id) {//Remove Task
                //Find Index of items and check with id passed to method
                const index = this.todos.findIndex((item) => item.id == id);
                //Splice 1 Item
                this.todos.splice(index, 1);
            },
            checkAllTodos() {//For Check All Todos
                this.todos.forEach(
                    (todo) => todo.completed = event.target.checked
                )
            },
            clearCompleted() {//Clear All Completed Task
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            finishedEdit(data) {
                //Check Items id with data Id passed to method
                const index = this.todos.findIndex((item) => item.id == data.id);
                //splice 1 item
                this.todos.splice(index, 1, data)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 0;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

    .todo-item-left { // later
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc; //override defaults
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;

        &:hover {
            background: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }

    // CSS Transitions
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
