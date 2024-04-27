<template>
  <div class="home">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  mixins: [],
  props: {},
  data: function () {
    return {
      message: 'Hello Home'
    }
  },
  created: function () {},
  mounted: function () {},
  computed: {},
  methods: {}
}
</script>

<style scoped>
.home {
}
</style>
