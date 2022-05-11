<template>
  <div>
    <!-- <Login/> -->
    <List/>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
// import Login from '@/components/auth/Login.vue'


export default {
  name: 'Home',
  components: {
    List
  }
}
</script>
