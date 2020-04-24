<template>
    <div>
        <div class="name-container">
            Welcome, {{ name }}
        </div>
        <!--   V-model For Bind Data To Input
               @keyup.enter is for Time User Type on input and press Enter
               also we add addTodo() Method-->
        <input type="text" class="todo-input" placeholder="What Needs To Be Done?" v-model="newTodo"
               @keyup.enter="addTodo">
        <div v-if="$store.state.loading" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
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
                name: '',
                newTodo: '',
                idForTodo: 3,
                // beforeEditCache: '',
            }
        },
        //After Create Instance of Vue retrieve Data from action method
        created() {
            // this.$store.dispatch('initRealtimeListeners');
            this.$store.dispatch('retrieveTodos');
            this.$store.dispatch('retrieveName')
                .then(response => {
                    this.name = response.data.name;
                });
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
        padding: 4px;

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

    /*Css Loader*/
    .lds-ring {
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: auto;
        margin-bottom: 16px;
    }

    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid grey;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: grey transparent transparent transparent;
    }

    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
