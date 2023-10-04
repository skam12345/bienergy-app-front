<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
          v-if="currentPage !== 1">
          <a class="page-link"
             @click="onClick(currentPage -1)"
             style="cursor: pointer">Previous</a></li>
      <li class="page-item"
          :class = "currentPage === page ? 'active' : ''"
          v-for="page in numberOfPages"
          :key="page">
          <a class="page-link"
             @click="onClick(page)"
             style="cursor: pointer">{{page}}</a></li>
      <li
          class="page-item"
          v-if="numberOfPages !== currentPage">
          <a class="page-link"
             @click="onClick(currentPage +1)"
             style="cursor: pointer">Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    numberOfPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['click'],
  setup (props, {emit}) {
    const onClick = (page) => {
      emit('click', page)
    }

    return {
      onClick,
    }
  }

}
</script>

<style scoped>

</style>