<template>
  <div id="app">
    <h1>Title: {{ titleWithCaps }}</h1>
    <button @click="decrementAction">-2 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+2 (mutation)</button>
    <p>
      counter (x10): {{ countX10Increment }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
  import RootStoreModule from '@/store/RootStore.module';

  export default Vue.extend({
    name: 'app',
    computed: {
      ...mapState({
        title(state: RootStoreModule): string { return state.title; },
        count(state: RootStoreModule): number { return state.CounterStore.count; },
      }),
      titleWithCaps(): string { return RootStoreModule.helpers.getTitleWithCaps(); },
      countX10Increment(): number { return RootStoreModule.helpers.CounterStore.getCountX10(); },
    },
    methods: {
      ...mapMutations({
        incrementMutation(commit): void {
          const state: RootStoreModule = (this as any).$store.state;
          // convenience method that handles the module path and type-safes the mutation payload
          RootStoreModule.helpers.CounterStore.commitIncrement(2, commit);
        },
      }),
      ...mapActions({
        decrementAction(dispatch): void {
          const state: RootStoreModule = (this as any).$store.state;
          RootStoreModule.helpers.CounterStore.dispatchDecrement(2, dispatch);
        },
      }),
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
