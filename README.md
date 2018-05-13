# mmm-typed-vuex
Vuex and TypeScript living in harmony with one another. 

We're talking:
* no more string references in your components
* no more guess work as to the structure of the store
* typed state values, mutation payloads, and more!

## Installation

```bash
$ yarn add mmm-typed-vuex
```

```bash
$ npm install --save-dev mmm-typed-vuex
```

### Why?

I could not be more sick of brittle string references! 
You know, those annoying set of characters that you copy and paste throughout your code.
Yeah, we all know we shouldn't do it, but Vuex makes it especially tempting.
Be honest, have you ever done something like this?

```typescript
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}
```

If so, you now have:
* static string references to a potentially, complex store structure
* blind references to state properties
* very brittle code

What if one of your property or mutuation names change? What if you move, rename, or delete a module? 
Yep, you're going to have to remember to update all those narly string references throughout your app.
Good luck if you're playing around with a substantial codebase.

Adding insult to injury, you sure as heck aren't getting typed state, mutation payloads, etc. Ouch!

### Solution

Enough talk, let me instead show you one possible alternative to the aforementioned string hell:

```typescript
computed: {
  ...mapState({
    count(state: RootStoreModule) { return state.CounterStore.count; },
  }),
  countX10Increment(): number { return this.$store.state.CounterStore.module.getCountX10(this); },
},
methods: {
  ...mapMutations({
    increment(commit, payload): void {
      // convenience method that handles the module path and type-safes the mutation payload
      commit(...this.$store.state.CounterStore.module.commitIncrement(1));
    },
  }),
  ...mapActions({
    incrementAction(dispatch, payload): void {
      dispatch(...this.$store.state.CounterStore.module.dispatchIncrement(2));
    },
  }),
```

Much better! It may appear a little verbose, but it's all typed and your editor's intelli-sense should be able to do all the heavy lifting.

### Okay, but what is mmm-typed-vuex?

Honestly, it's not much. We're talking about roughly 10 lines of real code...but it did take some thought to pull off and there's some magic happening in there.

And now, for the measly sum of $0, all that magic can be yours ;)

### Vuex definition exmaples:

Before you commit to anything, no pun intended, please take a quick gander at how the definition of a Vuex store might look:

```typescript
// the root store with a module setup
export class RootStoreModule extends StoreModule {
  public CounterStore: CounterStoreModule = new CounterStoreModule(this);

  constructor() {
    super();

    this._moduleNamespace = '';

    this._mixinOptions(
      {
        modules: {
          CounterStore: this.CounterStore,
        },
      },
    );
  }
}
```

```typescript
// a module definition
export class CounterStoreModule extends StoreModule {
  // did I mention that I hate strings and static declarations? that's why these guys are here.
  public static readonly INCREMENT: string = 'increment';
  public static readonly COUNTX10: string = 'countX10';

  // state property typings
  // these are not used to set or get values...only for typings
  public count: number;
  public module: CounterStoreModule;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number, options?: CommitOptions) { return [this._getModulePath(this, CounterStoreModule.INCREMENT), payload, options]; }
  public dispatchIncrement(payload: number, options?: DispatchOptions) { return [this._getModulePath(this, CounterStoreModule.INCREMENT), payload, options]; }
  public getCountX10(comp: any): number { return comp.$store.getters[this._getModulePath(this, CounterStoreModule.COUNTX10)]; }

  constructor(parentModule: StoreModule) {
    super();

    this._moduleNamespace = 'CounterStore';
    this._parentModule = parentModule;

    this._mixinOptions(
      {
        namespaced: true,
        state: Object.assign(this._generateState(), {
          count: 0,
        }),
        mutations: {
          [CounterStoreModule.INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.INCREMENT](context: ActionContext<any, any>, payload: number) {
            context.commit(CounterStoreModule.INCREMENT, payload);
          },
        },
        getters: {
          [CounterStoreModule.COUNTX10]: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
        modules: {
          CounterStoreNested: this.CounterStoreNested,
        },
      },
    );
  }
}
```

### Gotchas

There's more boilerplate. It sucks, but that's just the reality of it right now.
On the flip-side, however, is the fact that once you write a vuex module, the rest of the app
can effortlessly use it. No more banging your head against the wall trying to figure out
a reference or refactor some part of it. Is it worth the extra initial setup? That's for you
to decide. For me, the answer is a resounding, "YES!". Once I'm done writing a store and
am back to building out components, the last thing I want to do is needlessly wrestle with the store.

### Conclusion

That's it folks! Enjoy the Vue :)
