# mmm-typed-vuex (beta 2)
Vuex and TypeScript living in harmony with one another.

We're talking:
* no more string references in your Vue components
* no more guess work as to the structure of your store
* typed state values, mutation / action payloads, and more!

## Installation

```bash
$ yarn add mmm-typed-vuex
```

```bash
$ npm install --save mmm-typed-vuex
```

### Why?

I could not be more sick of brittle string references! 
You know, those annoying set of characters that you copy and paste throughout your code.
Yeah, we all know we shouldn't do it, but Vuex makes it especially tempting.
Be honest, have you ever done something like this?

```typescript
// App.vue
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
      commit('increment', 3);
    },
  }),
  ...mapActions({
    decrementAction(dispatch): void {
      dispatch('CounterStore/decrement', 3);
    },
  }),
},
```

If so, you now have:
* static string references to a potentially complex and ever-changing store structure
* blind references to state properties
* very brittle code

Disgusting. Definitely not very 'mmm' ;) 

What if one of your property or mutuation names change? What if you move, rename, or delete a module? 
Yep, you're going to have to find and update all those narly string references each time you make a change.
Good luck if you're playing around with a substantial codebase.

Adding insult to injury, you sure as heck aren't getting typed state, mutation payloads, etc. Ouch!

### Solution

Let the store, alone, define and strictly enforce the following (through typings):
* module and nested module namespaces / paths
* state property names and types
* available mutations, actions, and getters
* mutuation and action payload types
* getter return types (a work in progress)

Enough talk, let me instead show you one possible alternative to the aforementioned string hell:

```typescript
// App.vue
computed: {
  ...mapState({
    title(state: RootStoreModule): string { return state.title; },
    count(state: RootStoreModule): number { return state.CounterStore.count; },
  }),
  countX10Increment(): number { return this.$store.state.CounterStore.module.getCountX10(this); },
},
methods: {
  ...mapMutations({
    incrementMutation(commit, payload): void {
      const state: RootStoreModule = this.$store.state;
      // convenience method that handles the module path and type-safes the mutation payload
      commit(...state.CounterStore.module.commitIncrement(2));
    },
  }),
  ...mapActions({
    decrementAction(dispatch, payload): void {
      const state: RootStoreModule = this.$store.state;
      dispatch(...state.CounterStore.module.dispatchDecrement(2));
    },
  }),
},
```

Much better! It may appear a little verbose, but it's all typed and your editor's intelli-sense should be able to do all the heavy lifting. Oh...and no more string references!!

### Okay, but what is mmm-typed-vuex really?

Honestly, it's not much...which was my main objective. We're talking about roughly 10 lines of real code...but there is a dash of magic in there.
It's just enough to determine module paths internally (so you don't have to) and make a module's convenience methods more accessible.

And now, for the measly sum of __$0__, all that magic can be yours ;)

### Vuex definition examples:

A quick note, this library attempts to be largely unopinionated by not recreating or wrapping any Vuex logic. 
This leaves the details of store implementation and Vue component consumption up to you.
The following is simply my best stab at it. Chances are, you'll find a better way to leverage this simple library :)

```typescript
// RootStore.module.ts (with a sub-module defined)
export default class RootStoreModule extends StoreModule {
  // state property typings (these are not used to get or set values...only for typings)
  public title: string;
  public module: RootStoreModule;
  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStoreModule = new CounterStoreModule(this);

  constructor() {
    super();

    // don't define a name for root because it's technically not a module nor does it have a namespace
    this._moduleNamespace = '';

    this.setOptions(
      // this object structure should be familiar to you...it's exactly what you've already been doing (except for Object.assign...)
      {
        state: Object.assign(this._generateState(), {
          title: 'Module Example',
        }),
        modules: {
          CounterStore: this.CounterStore,
        },
      },
    );
  }
}
```

```typescript
// CounterStore.module.ts
export default class CounterStoreModule extends StoreModule {
  public static readonly INCREMENT: string = 'increment';
  public static readonly DECREMENT: string = 'decrement';
  public static readonly COUNTX10: string = 'countX10';

  public count: number;
  public module: CounterStoreModule;

  public dispatchDecrement(payload: number, options?: DispatchOptions) { return [this._getModulePath(this, CounterStoreModule.DECREMENT), payload, options]; }
  public commitIncrement(payload: number, options?: CommitOptions) { return [this._getModulePath(this, CounterStoreModule.INCREMENT), payload, options]; }
  public getCountX10(comp: any): number { return comp.$store.getters[this._getModulePath(this, CounterStoreModule.COUNTX10)]; }

  constructor(parentModule: StoreModule) {
    super();

    this._moduleNamespace = 'CounterStore';
    this._parentModule = parentModule;

    this.setOptions(
      // this object structure should be familiar to you...it's what you've already been doing
      {
        namespaced: true,
        state: Object.assign(this._generateState(), {
          count: 0,
        }),
        mutations: {
          [CounterStoreModule.DECREMENT](state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          [CounterStoreModule.INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.DECREMENT](context: ActionContext<any, any>, payload: number) {
            context.commit(CounterStoreModule.DECREMENT, payload);
          },
        },
        getters: {
          [CounterStoreModule.COUNTX10]: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
```

### Additional Notes

* Those class properties (e.g. ```public title: string;```) found within RootStore.module.ts are *not* an anyway used to get or set state values (only for typings).
* For reasons I won't go into here, ```public CounterStore: CounterStoreModule = new CounterStoreModule(this);``` is an exception to what I mentioned above.
* Methods for mutations, actions, etc are not intended to actually execute those commands but rather type-safe payloads and auto-magically determine module paths.

### Examples

1. A baseline, no typings example that showcases the brittleness of the string-heavy approach: [modules-example-no-typings](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-example-no-typings)
2. A slightly more complex, two-level deep 'module' example: [modules-example](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/modules-example)
3. A simple, one-level deep 'root' state example: [root-example](https://github.com/crummm/mmm-typed-vuex/tree/master/examples/root-example)

### Potential negatives

There's more boilerplate. It sucks, but that's just the reality of it right now.

You're now storing a reference to your modules in the store, itself (behind the scenes as part of the 'magic'). 
This is less than ideal and I'm exploring a number of alternative options.

### Rebuttal

On the flip-side, however, is the fact that once you write a vuex module, the rest of the app
can effortlessly use it. No more banging your head against the wall trying to figure out
the store structure or refactor some part of it. Is it worth the extra initial setup? That's for you
to decide. For me, the answer is a resounding, "YES!". Once I'm done writing a store and
am back to building out components and services, the last thing I want to do is needlessly wrestle with the store.

### Other ideas

This is surely not the best way this can be done, but it's at least a step in the right direction, I feel.

If you have ideas on how to improve upon this effort or want to contribute in any way, I'd definitely enjoy hearing from you! Two people's ideas are better than one.

### Conclusion

That's it folks! Enjoy the Vue :)
