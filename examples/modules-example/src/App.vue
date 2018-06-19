<template>
  <div id="app">
    <h1>Title: {{ titleWithCaps }}</h1>
    <button @click="decrementAction">-2 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+2 (mutation)</button>
    <p>
      counter (x10): {{ countX10 }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import RootStore from '@/store/RootStore.module';

  export default Vue.extend({
    name: 'app',
    computed: {
      // use map state
      ...mapState({
        title(state: RootStore): string { return state.title; },
      }),
      // or bypass mapState and access through our helper
      count(): number { return RootStore.get().CounterStore.count; },
      // getters
      titleWithCaps(): string { return RootStore.get().getTitleWithCaps(); },
      countX10(): number { return RootStore.get().CounterStore.getCountX10(); },
    },
    methods: {
      // convenience method that handles the module path and type-safes the mutation payload
      incrementMutation(): void { RootStore.get().CounterStore.commitIncrement(2); },
      decrementAction(): void { RootStore.get().CounterStore.dispatchDecrement(2); },
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
