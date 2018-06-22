<template>
  <div id="app">
    <h1>{{ titleWithCaps }}</h1>
    <button @click="decrement">-2 (action)</button>
    counter: {{ count }}
    <button @click="increment">+2 (mutation)</button>
    <p>counter (x10): {{ countX10 }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppStoreHelper from '@/store/AppStoreHelper';

  export default Vue.extend({
    name: 'app',
    computed: {
      // access state through the helper (though you can still use 'mapState' if you choose and still get typings)
      count(): number { return AppStoreHelper.CounterStore.state.count; },
      // getters
      titleWithCaps(): string { return AppStoreHelper.getters.titleWithCaps(); },
      countX10(): number { return AppStoreHelper.CounterStore.getters.countX10(); },
    },
    methods: {
      // convenience method that type-safes the mutation and payload
      increment(): void { AppStoreHelper.CounterStore.mutations.increment(2); },
      // convenience method that type-safes the action and payload
      decrement(): void { AppStoreHelper.CounterStore.actions.decrement(2); },
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
