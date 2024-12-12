<template>
    <div class="navbar">
        <router-link to="/" >Home</router-link>
        <div v-if="isUserLoggedIn">
            <!-- display username -->
            <button @click="logout" type="button">Logout</button>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'NavBar',
        computed: {
            ...mapGetters(['isUserLoggedIn']), 
        },
        methods: {
            ...mapActions(['logout']), 
        },
    }
</script>