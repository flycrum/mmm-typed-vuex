<template>
  <div id="app">
    <button @click="decrementAction">-1 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+1 (mutation)</button>
    <p>
      counter (x10): {{ countX10Increment }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import RootStore from '@/store/RootStore.module';

  export default Vue.extend({
    name: 'app',
    computed: {
      count(): number { return RootStore.state.count; },
      countX10Increment(): number { return RootStore.helpers.getCountX10(); },
    },
    methods: {
      incrementMutation(): void {
        // convenience method that handles the module path and type-safes the mutation payload
        RootStore.helpers.commitIncrement(2);
      },
      decrementAction(): void {
        RootStore.helpers.dispatchDecrement(2);
      },
    },
  });
</script>

<style>
  .app {
    margin-top: 30px;
  }
  button {
    background-color: dodgerblue;
    border: none;
    border-radius: 5px;
    color: white;
    margin: 4px;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>
