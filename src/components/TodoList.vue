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
                       :checkAll="!anyRemaining"></todo-item>
        </transition-group>
        <div class="extra-container">
            <!--Show Remaining Task-->
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-container">
            <todo-filtered></todo-filtered>
            <div>
                <transition name="fade">
                    <todo-clear-complete></todo-clear-complete>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";
    import TodoItemsRemaining from "./TodoItemsRemaining";
    import TodoCheckAll from "./TodoCheckAll";
    import TodoFiltered from "./TodoFiltered";
    import TodoClearComplete from "./TodoClearComplete";

    export default {
        name: 'todo-list',
        components: {
            TodoFiltered,
            TodoCheckAll,
            TodoItemsRemaining,
            TodoItem,
            TodoClearComplete,
        },
        data() {
            return {
                newTodo: '',
                idForTodo: 3,
                beforeEditCache: '',
            }
        },
        //After Create Instance of Vue retrieve Data from action method
        created() {
            this.$store.dispatch('retrieveTodos');
        },
        computed: {
            anyRemaining() {//Check if there is Remaining Items
                return this.$store.getters.anyRemaining;
            },
            todosFiltered() {//Filter Items
                return this.$store.getters.todosFiltered;
            },
        },
        methods: {
            addTodo() {//Add to Do
                if (this.newTodo.trim().length == 0) {//Validation
                    return
                }
                this.$store.dispatch('addTodo', {
                    id: this.idForTodo,
                    title: this.newTodo,
                });
                //Clear Input
                this.newTodo = '';
                //Increment Id
                this.idForTodo++;
            },
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
