<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <h3>{{this.$store.state.count}}</h3>
        <el-button type="primary" size="small" @click="addFn">add</el-button>
        <el-button type="danger" size="small" @click="reductFn">delete</el-button>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            msg: "Welcome to Home Page"
        };
    },
    methods: {
        addFn: function() {
            this.$store.dispatch('add', 2);
        },
        reductFn: function() {
            this.$store.dispatch('reduct', 4);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>