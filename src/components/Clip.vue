<script>
  export default {
    props: {
      subtitle: { type: String },
    },
  };
</script>

<template>
  <li>
    <div class="clip">
      {{ subtitle }}
    </div>
  </li>
</template>

<style>
  .clip {
    min-height: 10px;
    outline: 1px solid gray;
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
