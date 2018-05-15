<template>
  <div id="app">
    <h1>Title: {{ title }}</h1>
    <button @click="decrementAction">-3 (action)</button>
    counter: {{ count }}
    <button @click="incrementMutation">+3 (mutation)</button>
    <p>
      counter (x10): {{ countX10 }}
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'app',
    computed: {
      ...mapState({
        title: 'title',
        count(state) { return state.CounterStore.count; },
      }),
      ...mapGetters('CounterStore', [
        'countX10',
      ]),
    },
    methods: {
      ...mapMutations('CounterStore', {
        incrementMutation(commit): void {
          // @ts-ignore
          commit('increment', 3);
        },
      }),
      ...mapActions({
        decrementAction(dispatch): void {
          // @ts-ignore
          dispatch('CounterStore/decrement', 3);
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
