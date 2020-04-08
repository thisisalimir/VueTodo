<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <!--Complete
                When Change We check For Done Editing-->
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <!--Edit Tasks Using Double Click Event-->
            <div class="todo-item-label" @dblclick="editTodo" v-if="!editing"
                 :class="{ completed : completed }">{{ title }}
            </div>
            <!--Save Edit(doneEdit) also if User Change Mind We brings Old Title(cancelEdit)-->
            <input v-else type="text" class="todo-item-edit" v-model="title" @blur="doneEdit"
                   @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
        </div>

        <div>
            <!--On Click Make Title Plural-->
            <button @click="pluralize">Plural</button>
            <!--  When User Click On This remove Item  -->
            <span class="remove-item" @click="removeTodo(todo.id)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        // This is Property Should Pass From Parent Component
        props: {
            //Main Item Data
            todo: {
                type: Object,
                required: true,
            },
            //Check All Tasks Done
            checkAll: {
                type: Boolean,
                required: true,
            }
        },
        //Binding Data From parent Item
        data() {
            return {
                'id': this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'editing': this.todo.editing,
                'beforeEditCache': '',
            }
        },
        created() {
            //On Click call handle
            eventBus.$on('pluralize', this.handlePluralize);
        },
        beforeDestroy() {
            //Before Destroy Item Call off handle
            eventBus.$off('pluralize', this.handlePluralize);
        },
        //Watcher is watch when props are changed
        watch: {
            checkAll() {
                //Check if all Items checked then make it true otherwise single file checked
                this.completed = this.checkAll ? true : this.todo.completed;
            }
        },
        directives: {
            focus: {//this is For When User Click On Items Focus immediately
                // directive definition
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            editTodo() {//For Edit
                this.beforeEditCache = this.title;
                this.editing = true;
            },

            doneEdit() {//For Done
                if (this.title.trim() == '') {//Validation
                    this.title = this.beforeEditCache;
                }
                this.editing = false;
                //Create Event for pass to Parent Call finishedEdit and pass Data
                eventBus.$emit('finishedEdit', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                });
            },
            cancelEdit() {//For When User Decide to Cancel Edit
                this.title = this.beforeEditCache;
                this.editing = false;
            },
            removeTodo(id) {
                //Here Use $emit because we want to pass this to parent component method
                // Now first parameter is name of Event
                // second parameter we pass item we want to pass
                eventBus.$emit('removedTodo', id);
            },
            //Event Bus method
            pluralize() {
                eventBus.$emit('pluralize');
            },
            //Add s to Title
            handlePluralize() {
                this.title = this.title + 's';
                eventBus.$emit('finishedEdit', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                });
            }
        }
    }
</script>

<style scoped>

</style>