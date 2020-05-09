<template>
    <div id="app" class="todolist">
        <div class="pt-24">
            <div class="container px-3 mx-auto  flex-wrap flex-col md:flex-row items-center">
                <todo-list></todo-list>
            </div>
        </div>

    </div>
</template>

<script>
    import TodoList from "./components/TodoList";

    export default {
        name: 'App',
        components: {
            TodoList
        }
    }
</script>

<style>

    /*    * {*/
    /*        box-sizing: border-box;*/
    /*    }*/

    /*    .container {*/
    /*        max-width: 600px;*/
    /*        margin: 0 auto;*/
    /*    }*/

    /*    .logo {*/
    /*        display: block;*/
    /*        margin: 20px auto;*/
    /*        height: 75px;*/
    /*    }*/
</style>
