
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Desk.svelte generated by Svelte v3.42.6 */

    const file$d = "src/Desk.svelte";

    function create_fragment$l(ctx) {
    	let section;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (default_slot) default_slot.c();
    			attr_dev(section, "class", "desk svelte-cywknu");
    			add_location(section, file$d, 11, 0, 125);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(section, "touchmove", prevent_default(/*touchmove_handler*/ ctx[2]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Desk', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Desk> was created with unknown prop '${key}'`);
    	});

    	function touchmove_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots, touchmove_handler];
    }

    class Desk extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Desk",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable$1(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    // index.ts
    var stores = {};
    function writable(key, initialValue) {
      const browser = typeof localStorage != "undefined";
      function updateStorage(key2, value) {
        if (!browser)
          return;
        localStorage.setItem(key2, JSON.stringify(value));
      }
      if (!stores[key]) {
        const store = writable$1(initialValue, (set2) => {
          const json = browser ? localStorage.getItem(key) : null;
          if (json) {
            set2(JSON.parse(json));
          }
          if (browser) {
            const handleStorage = (event) => {
              if (event.key === key)
                set2(event.newValue ? JSON.parse(event.newValue) : null);
            };
            window.addEventListener("storage", handleStorage);
            return () => window.removeEventListener("storage", handleStorage);
          }
        });
        const {subscribe, set} = store;
        stores[key] = {
          set(value) {
            updateStorage(key, value);
            set(value);
          },
          update(updater) {
            const value = updater(get_store_value(store));
            updateStorage(key, value);
            set(value);
          },
          subscribe
        };
      }
      return stores[key];
    }

    const positions = writable('positions', {
      'g10.jpg': { left: 13.316485225505442, top: 9.281740837696335, r: -18 },
      'g07.jpg': { left: 14.717389191290826, top: 79.60078534031413, r: -34 },
      'g09.jpg': { left: 84.6605268273717, top: 44.013416230366495, r: -1 },
      'g08.jpg': { left: 14.427002332814931, top: 47.8321335078534, r: 14 },
      'g06.jpg': { left: 9.503790824261275, top: 65.48920157068063, r: -15 },
      'g05.jpg': { left: 12.887587480559876, top: 26.618128272251308, r: 24 },
      'g04.jpg': { left: 86.45873833592535, top: 15.62009162303665, r: 18 },
      'g03.jpg': { left: 85.15503499222396, top: 39.90674083769633, r: 2 },
      'g02.jpg': { left: 84.50743584758943, top: 65.92277486910994, r: 20 },
      'g01.jpg': { left: 85.59365279937792, top: 83.4407722513089, r: -15 },
    });

    const getTouchHandles = (savePosition) => {
      let offsetX = null;
      let offsetY = null;
      let fy = null;
      let sy = null;

      return {
        onTouchStart: ({
          currentTarget,
          touches: [{ clientX, clientY }, second],
        }) => {
          const { x, y } = currentTarget.getBoundingClientRect();

          offsetX = clientX - x;
          offsetY = clientY - y;
          fy = clientY;
          sy = second?.clientY;
        },
        onTouchMove: ({
          target: eventTarget,
          touches: [{ clientX, clientY, target }, second],
        }) => {
          if (eventTarget !== target) return;

          if (fy && sy && second && target === second.target) {
            const df = fy - clientY;
            const ds = sy - second.clientY;

            savePosition(
              undefined,
              undefined,
              Math.ceil(Math.abs(df - ds) / 2) *
                Math.sign(second.clientX > clientX ? df : ds)
            );
          } else {
            savePosition(clientX - offsetX, clientY - offsetY);
          }

          fy = clientY;
          sy = second?.clientY;
        },
        onTouchEnd: () => {
          offsetX = null;
          offsetY = null;
          fy = null;
          sy = null;
        },
      };
    };

    const getMouseHandles = (savePosition) => {
        let offsetX = null;
        let offsetY = null;

        return {
            onMouseDown: ({currentTarget, clientX, clientY}) => {
                const {x, y} = currentTarget.getBoundingClientRect();

                offsetX = clientX - x;
                offsetY = clientY - y;
            },
            onMouseMove: ({clientX, clientY}) => {
                if (offsetX !== null && offsetY !== null) {
                    savePosition(clientX - offsetX, clientY - offsetY);
                }
            },
            onMouseUp: () => {
                offsetX = null;
                offsetY = null;
            },
            onMouseWheel: ({deltaY}) => {
                savePosition(undefined, undefined, Math.sign(deltaY));
            }
        }
    };

    /* src/game/Button.svelte generated by Svelte v3.42.6 */
    const file$c = "src/game/Button.svelte";

    function create_fragment$k(ctx) {
    	let img;
    	let img_src_value;
    	let img_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "role", "button");
    			attr_dev(img, "class", "button svelte-n202sn");
    			if (!src_url_equal(img.src, img_src_value = src$1)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "width", /*width*/ ctx[2]);
    			attr_dev(img, "style", img_style_value = `left: ${/*left*/ ctx[0]}; top: ${/*top*/ ctx[1]}`);
    			attr_dev(img, "alt", "");
    			toggle_class(img, "pressed", /*localActive*/ ctx[6] || /*active*/ ctx[3]);
    			toggle_class(img, "hit", /*hit*/ ctx[4]);
    			toggle_class(img, "small", /*small*/ ctx[5]);
    			add_location(img, file$c, 26, 0, 500);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(img, "click", /*click_handler*/ ctx[9], false, false, false),
    					listen_dev(img, "touchstart", /*touchstart_handler*/ ctx[10], false, false, false),
    					listen_dev(img, "mousedown", /*activate*/ ctx[7], false, false, false),
    					listen_dev(img, "mouseup", /*deactivate*/ ctx[8], false, false, false),
    					listen_dev(img, "mouseout", /*deactivate*/ ctx[8], false, false, false),
    					listen_dev(img, "blur", /*deactivate*/ ctx[8], false, false, false),
    					listen_dev(img, "touchstart", /*activate*/ ctx[7], { passive: true }, false, false),
    					listen_dev(img, "touchend", /*deactivate*/ ctx[8], { passive: true }, false, false),
    					listen_dev(img, "dragstart", dragstart_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 4) {
    				attr_dev(img, "width", /*width*/ ctx[2]);
    			}

    			if (dirty & /*left, top*/ 3 && img_style_value !== (img_style_value = `left: ${/*left*/ ctx[0]}; top: ${/*top*/ ctx[1]}`)) {
    				attr_dev(img, "style", img_style_value);
    			}

    			if (dirty & /*localActive, active*/ 72) {
    				toggle_class(img, "pressed", /*localActive*/ ctx[6] || /*active*/ ctx[3]);
    			}

    			if (dirty & /*hit*/ 16) {
    				toggle_class(img, "hit", /*hit*/ ctx[4]);
    			}

    			if (dirty & /*small*/ 32) {
    				toggle_class(img, "small", /*small*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const src$1 = "/nintenday/bp.png";
    const dragstart_handler = e => e.preventDefault();

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, []);
    	const dispatch = createEventDispatcher();
    	let { left } = $$props;
    	let { top } = $$props;
    	let { width = "7.52%" } = $$props;
    	let { active = false } = $$props;
    	let { hit = false } = $$props;
    	let { small = false } = $$props;
    	let localActive = false;

    	const activate = () => {
    		$$invalidate(6, localActive = true);
    		dispatch("activate");
    	};

    	const deactivate = () => {
    		$$invalidate(6, localActive = false);
    		dispatch("deactivate");
    	};

    	const writable_props = ['left', 'top', 'width', 'active', 'hit', 'small'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function touchstart_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    		if ('top' in $$props) $$invalidate(1, top = $$props.top);
    		if ('width' in $$props) $$invalidate(2, width = $$props.width);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    		if ('hit' in $$props) $$invalidate(4, hit = $$props.hit);
    		if ('small' in $$props) $$invalidate(5, small = $$props.small);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		left,
    		top,
    		width,
    		active,
    		hit,
    		small,
    		localActive,
    		src: src$1,
    		activate,
    		deactivate
    	});

    	$$self.$inject_state = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    		if ('top' in $$props) $$invalidate(1, top = $$props.top);
    		if ('width' in $$props) $$invalidate(2, width = $$props.width);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    		if ('hit' in $$props) $$invalidate(4, hit = $$props.hit);
    		if ('small' in $$props) $$invalidate(5, small = $$props.small);
    		if ('localActive' in $$props) $$invalidate(6, localActive = $$props.localActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		left,
    		top,
    		width,
    		active,
    		hit,
    		small,
    		localActive,
    		activate,
    		deactivate,
    		click_handler,
    		touchstart_handler
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {
    			left: 0,
    			top: 1,
    			width: 2,
    			active: 3,
    			hit: 4,
    			small: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*left*/ ctx[0] === undefined && !('left' in props)) {
    			console.warn("<Button> was created without expected prop 'left'");
    		}

    		if (/*top*/ ctx[1] === undefined && !('top' in props)) {
    			console.warn("<Button> was created without expected prop 'top'");
    		}
    	}

    	get left() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hit() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hit(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get small() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set small(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function preload(src) {
        return new Promise((resolve, reject) => {
            Object.assign(new Image(), {
                src,
                onload: resolve,
                onerror: reject
            });
        });
    }

    const files = [
      "bp.png",
      "c1.png",
      "c2.png",
      "c3.png",
      "cl1.png",
      "cl2.png",
      "cl3.png",
      "cl4.png",
      "cr1.png",
      "cr2.png",
      "cr3.png",
      "cr4.png",
      "e.png",
      "ebl.png",
      "ebr.png",
      "game.webp",
      "wbl.png",
      "wbr.png",
      "whlb.png",
      "whlt.png",
      "whrb.png",
      "whrt.png",
    ];

    const src = (name) => `/nintenday/${name}`;

    const assetsReady = Promise.all(files.map(src).map(preload));

    const V = {
      top: true,
      bottom: false,
    };

    const H = {
      left: true,
      right: false,
    };

    const open = writable$1(false);
    const playing = writable$1(false);

    const eggs = writable$1([]);
    const chickens = writable$1([]);

    const basketH = writable$1(H.left);
    const basketV = writable$1(V.top);

    const score$1 = writable$1(0);
    const fails = writable$1(0);

    const getAnimation = (name, from, to) => `@keyframes ${name} {
  from { 
    ${from}
  }
  to {
    ${to}
  }
}`;

    const filename = 'g03.jpg';
    const selectorBig = '.game';
    const selectorSmall = `[src="/nintenday/${filename}"]`;
    const animationName = 'expand';
    const style = document.createElement('style');
    const duration = 400;

    document.head.appendChild(style);

    let animation = false;

    const expand = () => {
      if (animation) {
        return;
      }

      animation = true;

      const bigGame = document.querySelector(selectorBig);
      const smallGame = document.querySelector(selectorSmall);

      const r = get_store_value(positions)[filename]?.r || 0;

      smallGame.style = `transform: translate(-50%, -50%) rotate(${-r}deg); transform-origin: center center`;
      const s = smallGame.getBoundingClientRect();
      smallGame.style = undefined;
      const b = bigGame.getBoundingClientRect();

      const h = s.width / b.width;
      const v = s.height / b.height;

      const x = s.x - (b.x + (b.width - s.width) / 2);
      const y = s.y - (b.y + (b.height - s.height) / 2);

      const keyframes = getAnimation(
        animationName,
        `transform: matrix(${h}, 0, 0, ${v}, ${x}, ${y}) rotate(${r}deg); transform-origin: center center; visibility: visible; z-index: 1;`,
        'visibility: visible; z-index: 1;'
      );

      style.innerHTML = `${keyframes} ${selectorBig} {animation: ${animationName} ${duration}ms ease-in; animation-fill-mode: forwards}`;

      return new Promise((resolve) => {
        setTimeout(() => {
          style.innerHTML = '';
          animation = false;
          resolve();
        }, duration);
      });
    };

    /* src/console/Controls.svelte generated by Svelte v3.42.6 */

    function create_fragment$j(ctx) {
    	let t0;
    	let button0;
    	let t1;
    	let button1;
    	let t2;
    	let button2;
    	let t3;
    	let button3;
    	let current;
    	let mounted;
    	let dispose;

    	button0 = new Button({
    			props: {
    				width: "31px",
    				top: "29px",
    				left: "-178px",
    				small: true,
    				active: /*stage*/ ctx[0] > 0
    			},
    			$$inline: true
    		});

    	button0.$on("touchstart", /*s1*/ ctx[2]);
    	button0.$on("click", /*s1*/ ctx[2]);

    	button1 = new Button({
    			props: {
    				width: "31px",
    				top: "28px",
    				left: "146px",
    				small: true,
    				active: /*stage*/ ctx[0] > 3
    			},
    			$$inline: true
    		});

    	button1.$on("touchstart", /*s4*/ ctx[5]);
    	button1.$on("click", /*s4*/ ctx[5]);

    	button2 = new Button({
    			props: {
    				width: "31px",
    				top: "71px",
    				left: "146px",
    				small: true,
    				active: /*stage*/ ctx[0] > 1
    			},
    			$$inline: true
    		});

    	button2.$on("touchstart", /*s2*/ ctx[3]);
    	button2.$on("click", /*s2*/ ctx[3]);

    	button3 = new Button({
    			props: {
    				width: "31px",
    				top: "73px",
    				left: "-178px",
    				small: true,
    				active: /*stage*/ ctx[0] > 2
    			},
    			$$inline: true
    		});

    	button3.$on("touchstart", /*s3*/ ctx[4]);
    	button3.$on("click", /*s3*/ ctx[4]);

    	const block = {
    		c: function create() {
    			t0 = space();
    			create_component(button0.$$.fragment);
    			t1 = space();
    			create_component(button1.$$.fragment);
    			t2 = space();
    			create_component(button2.$$.fragment);
    			t3 = space();
    			create_component(button3.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(button3, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(document.body, "keydown", /*keydown_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};
    			if (dirty & /*stage*/ 1) button0_changes.active = /*stage*/ ctx[0] > 0;
    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*stage*/ 1) button1_changes.active = /*stage*/ ctx[0] > 3;
    			button1.$set(button1_changes);
    			const button2_changes = {};
    			if (dirty & /*stage*/ 1) button2_changes.active = /*stage*/ ctx[0] > 1;
    			button2.$set(button2_changes);
    			const button3_changes = {};
    			if (dirty & /*stage*/ 1) button3_changes.active = /*stage*/ ctx[0] > 2;
    			button3.$set(button3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			transition_in(button3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			transition_out(button3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(button3, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let $open;
    	validate_store(open, 'open');
    	component_subscribe($$self, open, $$value => $$invalidate(1, $open = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Controls', slots, []);
    	let stage = 0;
    	const s1 = () => $$invalidate(0, stage = stage === 0 || stage === 1 ? 1 : 0);
    	const s2 = () => $$invalidate(0, stage = stage === 1 || stage === 2 ? 2 : 0);
    	const s3 = () => $$invalidate(0, stage = stage === 2 || stage === 3 ? 3 : 0);

    	const s4 = () => {
    		const temp = stage;
    		$$invalidate(0, stage = stage === 3 || stage === 4 ? 4 : 0);

    		if (stage === 4 && stage !== temp) {
    			assetsReady.then(() => {
    				expand();
    				set_store_value(open, $open = true, $open);
    			});

    			setTimeout(() => $$invalidate(0, stage = 0), 500);
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Controls> was created with unknown prop '${key}'`);
    	});

    	const keydown_handler = ({ key }) => {
    		if (key === 'Escape') {
    			set_store_value(open, $open = false, $open);
    		}
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		assetsReady,
    		open,
    		expand,
    		stage,
    		s1,
    		s2,
    		s3,
    		s4,
    		$open
    	});

    	$$self.$inject_state = $$props => {
    		if ('stage' in $$props) $$invalidate(0, stage = $$props.stage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [stage, $open, s1, s2, s3, s4, keydown_handler];
    }

    class Controls$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Controls",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    const hidden = writable$1(false);

    const SHOW_TIMEOUT = 900000;
    const HIDE_TIMEOUT = 5000;
    const CANCEL_TIMEOUT = 1000;

    let cancelTimeout = null;
    let showTimeout = null;
    let hideTimeout = null;

    const touch = () => {
        const isHidden = get_store_value(hidden);

        if (isHidden) {
            clearTimeout(showTimeout);
            
            showTimeout = setTimeout(() => {
                hidden.set(false);
                showTimeout = null;
            }, SHOW_TIMEOUT);
        } else {
            if (!hideTimeout) {
                hideTimeout = setTimeout(() => {
                    clearTimeout(cancelTimeout);

                    hideTimeout = null;
                    cancelTimeout = null;

                    hidden.set(true);
                }, HIDE_TIMEOUT);
            } else {
                clearTimeout(cancelTimeout);
                
                cancelTimeout = setTimeout(() => {
                    clearTimeout(hideTimeout);

                    hideTimeout = null;
                    cancelTimeout = null;
                }, CANCEL_TIMEOUT);
            }
        }
    };

    /* src/console/Console.svelte generated by Svelte v3.42.6 */

    const { Object: Object_1$1, window: window_1 } = globals;
    const file$b = "src/console/Console.svelte";

    // (82:2) {#if thatOne}
    function create_if_block$3(ctx) {
    	let controls;
    	let current;
    	controls = new Controls$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(controls.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(controls, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(controls.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(controls.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(controls, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(82:2) {#if thatOne}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*thatOne*/ ctx[5] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			if (if_block) if_block.c();
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[6])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1krkwd9");
    			add_location(img, file$b, 80, 2, 2052);
    			attr_dev(div, "class", "console svelte-1krkwd9");
    			attr_dev(div, "data-type", /*filename*/ ctx[0]);
    			set_style(div, "left", (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.left || 0) + "%");
    			set_style(div, "top", (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.top || 0) + "%");
    			set_style(div, "transform", "rotate(" + (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.r || 0) + "deg) scale(" + /*scale*/ ctx[1] + ")");
    			toggle_class(div, "hidden", /*$open*/ ctx[3] && /*thatOne*/ ctx[5]);
    			add_location(div, file$b, 64, 0, 1506);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*updateScale*/ ctx[4], false, false, false),
    					listen_dev(div, "mousewheel", /*onMouseWheel*/ ctx[13], false, false, false),
    					listen_dev(div, "mousedown", prevent_default(/*onMouseDown*/ ctx[10]), false, true, false),
    					listen_dev(div, "mousemove", /*onMouseMove*/ ctx[11], false, false, false),
    					listen_dev(div, "mouseup", /*onMouseUp*/ ctx[12], false, false, false),
    					listen_dev(div, "blur", /*onMouseUp*/ ctx[12], false, false, false),
    					listen_dev(div, "mouseleave", /*onMouseUp*/ ctx[12], false, false, false),
    					listen_dev(div, "touchstart", prevent_default(/*onTouchStart*/ ctx[7]), false, true, false),
    					listen_dev(div, "touchmove", prevent_default(/*onTouchMove*/ ctx[9]), false, true, false),
    					listen_dev(div, "touchend", /*onTouchEnd*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*filename*/ 1) {
    				attr_dev(div, "data-type", /*filename*/ ctx[0]);
    			}

    			if (!current || dirty & /*$positions, filename*/ 5) {
    				set_style(div, "left", (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.left || 0) + "%");
    			}

    			if (!current || dirty & /*$positions, filename*/ 5) {
    				set_style(div, "top", (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.top || 0) + "%");
    			}

    			if (!current || dirty & /*$positions, filename, scale*/ 7) {
    				set_style(div, "transform", "rotate(" + (/*$positions*/ ctx[2][/*filename*/ ctx[0]]?.r || 0) + "deg) scale(" + /*scale*/ ctx[1] + ")");
    			}

    			if (dirty & /*$open, thatOne*/ 40) {
    				toggle_class(div, "hidden", /*$open*/ ctx[3] && /*thatOne*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const FULL_WIDTH = 768;

    function instance$i($$self, $$props, $$invalidate) {
    	let $positions;
    	let $open;
    	validate_store(positions, 'positions');
    	component_subscribe($$self, positions, $$value => $$invalidate(2, $positions = $$value));
    	validate_store(open, 'open');
    	component_subscribe($$self, open, $$value => $$invalidate(3, $open = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Console', slots, []);
    	let { filename } = $$props;
    	let scale;

    	const updateScale = () => {
    		if (window.innerWidth >= FULL_WIDTH) {
    			$$invalidate(1, scale = 1);
    		} else {
    			$$invalidate(1, scale = window.innerWidth / FULL_WIDTH);
    		}
    	};

    	updateScale();
    	const thatOne = filename === "g03.jpg";
    	const image = `/nintenday/${filename}`;
    	const bound = v => Math.max(0, Math.min(100, v));

    	const savePosition = (x, y, r) => {
    		if ($open) return;
    		touch();
    		const change = {};

    		if (x !== undefined && y !== undefined) {
    			const { clientWidth, clientHeight } = document.body;

    			Object.assign(change, {
    				left: bound(x / clientWidth * 100),
    				top: bound(y / clientHeight * 100)
    			});
    		}

    		if (r !== undefined) {
    			change.r = ((Object($positions[filename]).r || 0) + r) % 360;
    		}

    		set_store_value(
    			positions,
    			$positions = {
    				...$positions,
    				[filename]: {
    					...Object($positions[filename]),
    					...change
    				}
    			},
    			$positions
    		);
    	};

    	const { onTouchStart, onTouchEnd, onTouchMove } = getTouchHandles(savePosition);
    	const { onMouseDown, onMouseMove, onMouseUp, onMouseWheel } = getMouseHandles(savePosition);
    	const writable_props = ['filename'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Console> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('filename' in $$props) $$invalidate(0, filename = $$props.filename);
    	};

    	$$self.$capture_state = () => ({
    		positions,
    		getTouchHandles,
    		getMouseHandles,
    		Controls: Controls$1,
    		open,
    		touch,
    		filename,
    		FULL_WIDTH,
    		scale,
    		updateScale,
    		thatOne,
    		image,
    		bound,
    		savePosition,
    		onTouchStart,
    		onTouchEnd,
    		onTouchMove,
    		onMouseDown,
    		onMouseMove,
    		onMouseUp,
    		onMouseWheel,
    		$positions,
    		$open
    	});

    	$$self.$inject_state = $$props => {
    		if ('filename' in $$props) $$invalidate(0, filename = $$props.filename);
    		if ('scale' in $$props) $$invalidate(1, scale = $$props.scale);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		filename,
    		scale,
    		$positions,
    		$open,
    		updateScale,
    		thatOne,
    		image,
    		onTouchStart,
    		onTouchEnd,
    		onTouchMove,
    		onMouseDown,
    		onMouseMove,
    		onMouseUp,
    		onMouseWheel
    	];
    }

    class Console extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { filename: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Console",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*filename*/ ctx[0] === undefined && !('filename' in props)) {
    			console.warn("<Console> was created without expected prop 'filename'");
    		}
    	}

    	get filename() {
    		throw new Error("<Console>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set filename(value) {
    		throw new Error("<Console>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/game/Controls.svelte generated by Svelte v3.42.6 */

    const { Object: Object_1 } = globals;

    function create_fragment$h(ctx) {
    	let button0;
    	let t0;
    	let button1;
    	let t1;
    	let button2;
    	let t2;
    	let button3;
    	let current;

    	button0 = new Button({
    			props: {
    				left: "7.67%",
    				top: "61.98%",
    				active: /*blt*/ ctx[0],
    				hit: true
    			},
    			$$inline: true
    		});

    	button0.$on("activate", /*activate_handler*/ ctx[6]);

    	button1 = new Button({
    			props: {
    				left: "84.65%",
    				top: "61.59%",
    				active: /*brt*/ ctx[1],
    				hit: true
    			},
    			$$inline: true
    		});

    	button1.$on("activate", /*activate_handler_1*/ ctx[7]);

    	button2 = new Button({
    			props: {
    				left: "84.51%",
    				top: "78.95%",
    				active: /*brb*/ ctx[2],
    				hit: true
    			},
    			$$inline: true
    		});

    	button2.$on("activate", /*activate_handler_2*/ ctx[8]);

    	button3 = new Button({
    			props: {
    				left: "7.68%",
    				top: "79.65%",
    				active: /*blb*/ ctx[3],
    				hit: true
    			},
    			$$inline: true
    		});

    	button3.$on("activate", /*activate_handler_3*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t0 = space();
    			create_component(button1.$$.fragment);
    			t1 = space();
    			create_component(button2.$$.fragment);
    			t2 = space();
    			create_component(button3.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};
    			if (dirty & /*blt*/ 1) button0_changes.active = /*blt*/ ctx[0];
    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*brt*/ 2) button1_changes.active = /*brt*/ ctx[1];
    			button1.$set(button1_changes);
    			const button2_changes = {};
    			if (dirty & /*brb*/ 4) button2_changes.active = /*brb*/ ctx[2];
    			button2.$set(button2_changes);
    			const button3_changes = {};
    			if (dirty & /*blb*/ 8) button3_changes.active = /*blb*/ ctx[3];
    			button3.$set(button3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			transition_in(button3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			transition_out(button3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let $basketH;
    	let $basketV;
    	validate_store(basketH, 'basketH');
    	component_subscribe($$self, basketH, $$value => $$invalidate(4, $basketH = $$value));
    	validate_store(basketV, 'basketV');
    	component_subscribe($$self, basketV, $$value => $$invalidate(5, $basketV = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Controls', slots, []);
    	let blt = false;
    	let brt = false;
    	let brb = false;
    	let blb = false;

    	const onkeydown = ({ key, code }) => {
    		switch (key) {
    			case "ArrowUp":
    			case "w":
    			case "ц":
    				set_store_value(basketV, $basketV = V.top, $basketV);
    				if ($basketH === H.left) $$invalidate(0, blt = true);
    				if ($basketH === H.right) $$invalidate(1, brt = true);
    				break;
    			case "ArrowRight":
    			case "d":
    			case "в":
    				set_store_value(basketH, $basketH = H.right, $basketH);
    				if ($basketV === V.top) $$invalidate(1, brt = true);
    				if ($basketV === V.bottom) $$invalidate(2, brb = true);
    				break;
    			case "ArrowDown":
    			case "s":
    			case "ы":
    				set_store_value(basketV, $basketV = V.bottom, $basketV);
    				if ($basketH === H.left) $$invalidate(3, blb = true);
    				if ($basketH === H.right) $$invalidate(2, brb = true);
    				break;
    			case "ArrowLeft":
    			case "a":
    			case "ф":
    				set_store_value(basketH, $basketH = H.left, $basketH);
    				if ($basketV === V.top) $$invalidate(0, blt = true);
    				if ($basketV === V.bottom) $$invalidate(3, blb = true);
    				break;
    			case "Control":
    			case "Shift":
    				switch (code) {
    					case "ShiftLeft":
    						set_store_value(basketV, $basketV = V.top, $basketV);
    						set_store_value(basketH, $basketH = H.left, $basketH);
    						$$invalidate(0, blt = true);
    						break;
    					case "ShiftRight":
    						set_store_value(basketV, $basketV = V.top, $basketV);
    						set_store_value(basketH, $basketH = H.right, $basketH);
    						$$invalidate(1, brt = true);
    						break;
    					case "ControlRight":
    						set_store_value(basketV, $basketV = V.bottom, $basketV);
    						set_store_value(basketH, $basketH = H.right, $basketH);
    						$$invalidate(2, brb = true);
    						break;
    					case "ControlLeft":
    						set_store_value(basketV, $basketV = V.bottom, $basketV);
    						set_store_value(basketH, $basketH = H.left, $basketH);
    						$$invalidate(3, blb = true);
    						break;
    				}
    				break;
    		}
    	};

    	const onkeyup = () => {
    		$$invalidate(0, blt = false);
    		$$invalidate(1, brt = false);
    		$$invalidate(2, brb = false);
    		$$invalidate(3, blb = false);
    	};

    	Object.assign(document.body, { onkeyup, onkeydown });
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Controls> was created with unknown prop '${key}'`);
    	});

    	const activate_handler = () => {
    		set_store_value(basketH, $basketH = H.left, $basketH);
    		set_store_value(basketV, $basketV = V.top, $basketV);
    	};

    	const activate_handler_1 = () => {
    		set_store_value(basketH, $basketH = H.right, $basketH);
    		set_store_value(basketV, $basketV = V.top, $basketV);
    	};

    	const activate_handler_2 = () => {
    		set_store_value(basketH, $basketH = H.right, $basketH);
    		set_store_value(basketV, $basketV = V.bottom, $basketV);
    	};

    	const activate_handler_3 = () => {
    		set_store_value(basketH, $basketH = H.left, $basketH);
    		set_store_value(basketV, $basketV = V.bottom, $basketV);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		basketH,
    		basketV,
    		H,
    		V,
    		blt,
    		brt,
    		brb,
    		blb,
    		onkeydown,
    		onkeyup,
    		$basketH,
    		$basketV
    	});

    	$$self.$inject_state = $$props => {
    		if ('blt' in $$props) $$invalidate(0, blt = $$props.blt);
    		if ('brt' in $$props) $$invalidate(1, brt = $$props.brt);
    		if ('brb' in $$props) $$invalidate(2, brb = $$props.brb);
    		if ('blb' in $$props) $$invalidate(3, blb = $$props.blb);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		blt,
    		brt,
    		brb,
    		blb,
    		$basketH,
    		$basketV,
    		activate_handler,
    		activate_handler_1,
    		activate_handler_2,
    		activate_handler_3
    	];
    }

    class Controls extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Controls",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/game/Sprite.svelte generated by Svelte v3.42.6 */

    const file$a = "src/game/Sprite.svelte";

    function create_fragment$g(ctx) {
    	let img;
    	let img_src_value;
    	let img_style_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "sprite svelte-4gxohw");
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[5])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "width", /*width*/ ctx[0]);

    			attr_dev(img, "style", img_style_value = `left: ${/*left*/ ctx[1]}; top: ${/*top*/ ctx[2]}${/*rotate*/ ctx[4]
			? `; transform: rotate(${/*rotate*/ ctx[4]}deg)`
			: ""}`);

    			attr_dev(img, "alt", "");
    			toggle_class(img, "active", /*active*/ ctx[3]);
    			add_location(img, file$a, 11, 0, 191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 1) {
    				attr_dev(img, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*left, top, rotate*/ 22 && img_style_value !== (img_style_value = `left: ${/*left*/ ctx[1]}; top: ${/*top*/ ctx[2]}${/*rotate*/ ctx[4]
			? `; transform: rotate(${/*rotate*/ ctx[4]}deg)`
			: ""}`)) {
    				attr_dev(img, "style", img_style_value);
    			}

    			if (dirty & /*active*/ 8) {
    				toggle_class(img, "active", /*active*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sprite', slots, []);
    	let { name } = $$props;
    	let { width } = $$props;
    	let { left } = $$props;
    	let { top } = $$props;
    	let { active = false } = $$props;
    	let { rotate = 0 } = $$props;
    	const src = `/nintenday/${name}.png`;
    	const writable_props = ['name', 'width', 'left', 'top', 'active', 'rotate'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sprite> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(6, name = $$props.name);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    		if ('top' in $$props) $$invalidate(2, top = $$props.top);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    		if ('rotate' in $$props) $$invalidate(4, rotate = $$props.rotate);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		width,
    		left,
    		top,
    		active,
    		rotate,
    		src
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(6, name = $$props.name);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    		if ('top' in $$props) $$invalidate(2, top = $$props.top);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    		if ('rotate' in $$props) $$invalidate(4, rotate = $$props.rotate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, left, top, active, rotate, src, name];
    }

    class Sprite extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			name: 6,
    			width: 0,
    			left: 1,
    			top: 2,
    			active: 3,
    			rotate: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sprite",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[6] === undefined && !('name' in props)) {
    			console.warn("<Sprite> was created without expected prop 'name'");
    		}

    		if (/*width*/ ctx[0] === undefined && !('width' in props)) {
    			console.warn("<Sprite> was created without expected prop 'width'");
    		}

    		if (/*left*/ ctx[1] === undefined && !('left' in props)) {
    			console.warn("<Sprite> was created without expected prop 'left'");
    		}

    		if (/*top*/ ctx[2] === undefined && !('top' in props)) {
    			console.warn("<Sprite> was created without expected prop 'top'");
    		}
    	}

    	get name() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rotate() {
    		throw new Error("<Sprite>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rotate(value) {
    		throw new Error("<Sprite>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/game/Egg.svelte generated by Svelte v3.42.6 */

    function create_fragment$f(ctx) {
    	let sprite;
    	let current;
    	const sprite_spread_levels = [{ name: "e" }, /*props*/ ctx[2][/*d*/ ctx[0]][/*s*/ ctx[1]], { active: true }];
    	let sprite_props = {};

    	for (let i = 0; i < sprite_spread_levels.length; i += 1) {
    		sprite_props = assign(sprite_props, sprite_spread_levels[i]);
    	}

    	sprite = new Sprite({ props: sprite_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sprite_changes = (dirty & /*props, d, s*/ 7)
    			? get_spread_update(sprite_spread_levels, [
    					sprite_spread_levels[0],
    					get_spread_object(/*props*/ ctx[2][/*d*/ ctx[0]][/*s*/ ctx[1]]),
    					sprite_spread_levels[2]
    				])
    			: {};

    			sprite.$set(sprite_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Egg', slots, []);
    	let { d } = $$props;
    	let { s } = $$props;

    	const props = [
    		[
    			{
    				width: "1.7%",
    				left: "29.7%",
    				top: "40.0%",
    				rotate: "33"
    			},
    			{
    				width: "1.7%",
    				left: "31.3%",
    				top: "41.6%",
    				rotate: "95"
    			},
    			{
    				width: "1.5%",
    				left: "33.0%",
    				top: "43.8%"
    			},
    			{
    				width: "1.6%",
    				left: "34.5%",
    				top: "44.8%",
    				rotate: "-124"
    			},
    			{
    				width: "1.7%",
    				left: "35.9%",
    				top: "47.2%",
    				rotate: "-53"
    			}
    		],
    		[
    			{
    				width: "1.6%",
    				left: "69.5%",
    				top: "39.6%",
    				rotate: "21"
    			},
    			{
    				width: "1.6%",
    				left: "67.8%",
    				top: "41.0%",
    				rotate: "5"
    			},
    			{
    				width: "1.5%",
    				left: "66.0%",
    				top: "43.1%",
    				rotate: "-40"
    			},
    			{
    				width: "1.8%",
    				left: "64.1%",
    				top: "44.5%",
    				rotate: "-105"
    			},
    			{
    				width: "1.6%",
    				left: "62.7%",
    				top: "47.3%",
    				rotate: "-169"
    			}
    		],
    		[
    			{
    				width: "1.7%",
    				left: "69.2%",
    				top: "51.4%",
    				rotate: "-144"
    			},
    			{
    				width: "1.5%",
    				left: "67.6%",
    				top: "53.7%",
    				rotate: "-185"
    			},
    			{
    				width: "1.7%",
    				left: "65.9%",
    				top: "54.9%",
    				rotate: "110"
    			},
    			{
    				width: "1.6%",
    				left: "64.1%",
    				top: "56.7%",
    				rotate: "48"
    			},
    			{
    				width: "1.6%",
    				left: "62.5%",
    				top: "59.2%",
    				rotate: "-32"
    			}
    		],
    		[
    			{
    				width: "1.7%",
    				left: "29.3%",
    				top: "51.6%",
    				rotate: "-15"
    			},
    			{
    				width: "1.6%",
    				left: "31.0%",
    				top: "53.3%",
    				rotate: "36"
    			},
    			{
    				width: "1.7%",
    				left: "32.8%",
    				top: "54.8%",
    				rotate: "66"
    			},
    			{
    				width: "1.6%",
    				left: "34.5%",
    				top: "56.6%",
    				rotate: "171"
    			},
    			{
    				width: "1.7%",
    				left: "35.9%",
    				top: "58.6%",
    				rotate: "-123"
    			}
    		]
    	];

    	const writable_props = ['d', 's'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Egg> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('d' in $$props) $$invalidate(0, d = $$props.d);
    		if ('s' in $$props) $$invalidate(1, s = $$props.s);
    	};

    	$$self.$capture_state = () => ({ Sprite, d, s, props });

    	$$self.$inject_state = $$props => {
    		if ('d' in $$props) $$invalidate(0, d = $$props.d);
    		if ('s' in $$props) $$invalidate(1, s = $$props.s);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [d, s, props];
    }

    class Egg$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { d: 0, s: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Egg",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*d*/ ctx[0] === undefined && !('d' in props)) {
    			console.warn("<Egg> was created without expected prop 'd'");
    		}

    		if (/*s*/ ctx[1] === undefined && !('s' in props)) {
    			console.warn("<Egg> was created without expected prop 's'");
    		}
    	}

    	get d() {
    		throw new Error("<Egg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set d(value) {
    		throw new Error("<Egg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get s() {
    		throw new Error("<Egg>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set s(value) {
    		throw new Error("<Egg>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/game/Basket.svelte generated by Svelte v3.42.6 */

    function create_fragment$e(ctx) {
    	let sprite0;
    	let t0;
    	let sprite1;
    	let t1;
    	let sprite2;
    	let t2;
    	let sprite3;
    	let current;

    	sprite0 = new Sprite({
    			props: {
    				name: "whlt",
    				width: "7.7%",
    				left: "36.8%",
    				top: "44.9%",
    				active: /*$basketH*/ ctx[0] === H.left && /*$basketV*/ ctx[1] === V.top
    			},
    			$$inline: true
    		});

    	sprite1 = new Sprite({
    			props: {
    				name: "whrt",
    				width: "6.7%",
    				left: "57.0%",
    				top: "46.8%",
    				active: /*$basketH*/ ctx[0] === H.right && /*$basketV*/ ctx[1] === V.top
    			},
    			$$inline: true
    		});

    	sprite2 = new Sprite({
    			props: {
    				name: "whrb",
    				width: "7.4%",
    				left: "56.1%",
    				top: "58.1%",
    				active: /*$basketH*/ ctx[0] === H.right && /*$basketV*/ ctx[1] === V.bottom
    			},
    			$$inline: true
    		});

    	sprite3 = new Sprite({
    			props: {
    				name: "whlb",
    				width: "8.6%",
    				left: "36.1%",
    				top: "57%",
    				active: /*$basketH*/ ctx[0] === H.left && /*$basketV*/ ctx[1] === V.bottom
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite0.$$.fragment);
    			t0 = space();
    			create_component(sprite1.$$.fragment);
    			t1 = space();
    			create_component(sprite2.$$.fragment);
    			t2 = space();
    			create_component(sprite3.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(sprite1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(sprite2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(sprite3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sprite0_changes = {};
    			if (dirty & /*$basketH, $basketV*/ 3) sprite0_changes.active = /*$basketH*/ ctx[0] === H.left && /*$basketV*/ ctx[1] === V.top;
    			sprite0.$set(sprite0_changes);
    			const sprite1_changes = {};
    			if (dirty & /*$basketH, $basketV*/ 3) sprite1_changes.active = /*$basketH*/ ctx[0] === H.right && /*$basketV*/ ctx[1] === V.top;
    			sprite1.$set(sprite1_changes);
    			const sprite2_changes = {};
    			if (dirty & /*$basketH, $basketV*/ 3) sprite2_changes.active = /*$basketH*/ ctx[0] === H.right && /*$basketV*/ ctx[1] === V.bottom;
    			sprite2.$set(sprite2_changes);
    			const sprite3_changes = {};
    			if (dirty & /*$basketH, $basketV*/ 3) sprite3_changes.active = /*$basketH*/ ctx[0] === H.left && /*$basketV*/ ctx[1] === V.bottom;
    			sprite3.$set(sprite3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite0.$$.fragment, local);
    			transition_in(sprite1.$$.fragment, local);
    			transition_in(sprite2.$$.fragment, local);
    			transition_in(sprite3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite0.$$.fragment, local);
    			transition_out(sprite1.$$.fragment, local);
    			transition_out(sprite2.$$.fragment, local);
    			transition_out(sprite3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(sprite1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(sprite2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(sprite3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $basketH;
    	let $basketV;
    	validate_store(basketH, 'basketH');
    	component_subscribe($$self, basketH, $$value => $$invalidate(0, $basketH = $$value));
    	validate_store(basketV, 'basketV');
    	component_subscribe($$self, basketV, $$value => $$invalidate(1, $basketV = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Basket', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Basket> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Sprite,
    		basketH,
    		basketV,
    		H,
    		V,
    		$basketH,
    		$basketV
    	});

    	return [$basketH, $basketV];
    }

    class Basket extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Basket",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/game/Wolf.svelte generated by Svelte v3.42.6 */

    function create_fragment$d(ctx) {
    	let sprite0;
    	let t;
    	let sprite1;
    	let current;

    	sprite0 = new Sprite({
    			props: {
    				name: "wbl",
    				width: "9.3%",
    				left: "41.8%",
    				top: "45.2%",
    				active: /*$basketH*/ ctx[0] === H.left
    			},
    			$$inline: true
    		});

    	sprite1 = new Sprite({
    			props: {
    				name: "wbr",
    				width: "8.5%",
    				left: "49.8%",
    				top: "45.5%",
    				active: /*$basketH*/ ctx[0] === H.right
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite0.$$.fragment);
    			t = space();
    			create_component(sprite1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(sprite1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sprite0_changes = {};
    			if (dirty & /*$basketH*/ 1) sprite0_changes.active = /*$basketH*/ ctx[0] === H.left;
    			sprite0.$set(sprite0_changes);
    			const sprite1_changes = {};
    			if (dirty & /*$basketH*/ 1) sprite1_changes.active = /*$basketH*/ ctx[0] === H.right;
    			sprite1.$set(sprite1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite0.$$.fragment, local);
    			transition_in(sprite1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite0.$$.fragment, local);
    			transition_out(sprite1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(sprite1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $basketH;
    	validate_store(basketH, 'basketH');
    	component_subscribe($$self, basketH, $$value => $$invalidate(0, $basketH = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wolf', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wolf> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Sprite, basketH, H, $basketH });
    	return [$basketH];
    }

    class Wolf extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wolf",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/game/Score.svelte generated by Svelte v3.42.6 */
    const file$9 = "src/game/Score.svelte";

    function create_fragment$c(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*$score*/ ctx[0]);
    			attr_dev(div, "class", "score svelte-1f474ae");
    			add_location(div, file$9, 4, 0, 55);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$score*/ 1) set_data_dev(t, /*$score*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $score;
    	validate_store(score$1, 'score');
    	component_subscribe($$self, score$1, $$value => $$invalidate(0, $score = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Score', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Score> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ score: score$1, $score });
    	return [$score];
    }

    class Score extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Score",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/game/Fail.svelte generated by Svelte v3.42.6 */

    function create_fragment$b(ctx) {
    	let sprite0;
    	let t0;
    	let sprite1;
    	let t1;
    	let sprite2;
    	let current;

    	sprite0 = new Sprite({
    			props: {
    				name: "c1",
    				width: "3.6%",
    				left: "51.5%",
    				top: "38.2%",
    				active: /*$fails*/ ctx[0] > 0
    			},
    			$$inline: true
    		});

    	sprite1 = new Sprite({
    			props: {
    				name: "c2",
    				width: "3.5%",
    				left: "55.4%",
    				top: "38.1%",
    				active: /*$fails*/ ctx[0] > 1
    			},
    			$$inline: true
    		});

    	sprite2 = new Sprite({
    			props: {
    				name: "c3",
    				width: "3.3%",
    				left: "59.1%",
    				top: "38.0%",
    				active: /*$fails*/ ctx[0] > 2
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite0.$$.fragment);
    			t0 = space();
    			create_component(sprite1.$$.fragment);
    			t1 = space();
    			create_component(sprite2.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(sprite1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(sprite2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sprite0_changes = {};
    			if (dirty & /*$fails*/ 1) sprite0_changes.active = /*$fails*/ ctx[0] > 0;
    			sprite0.$set(sprite0_changes);
    			const sprite1_changes = {};
    			if (dirty & /*$fails*/ 1) sprite1_changes.active = /*$fails*/ ctx[0] > 1;
    			sprite1.$set(sprite1_changes);
    			const sprite2_changes = {};
    			if (dirty & /*$fails*/ 1) sprite2_changes.active = /*$fails*/ ctx[0] > 2;
    			sprite2.$set(sprite2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite0.$$.fragment, local);
    			transition_in(sprite1.$$.fragment, local);
    			transition_in(sprite2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite0.$$.fragment, local);
    			transition_out(sprite1.$$.fragment, local);
    			transition_out(sprite2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(sprite1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(sprite2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $fails;
    	validate_store(fails, 'fails');
    	component_subscribe($$self, fails, $$value => $$invalidate(0, $fails = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fail', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fail> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Sprite, fails, $fails });
    	return [$fails];
    }

    class Fail extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fail",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/game/Chicken.svelte generated by Svelte v3.42.6 */

    // (43:0) {:else}
    function create_else_block$1(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let if_block4_anchor;
    	let current;
    	let if_block0 = /*s*/ ctx[1] === 0 && create_if_block_10(ctx);
    	let if_block1 = /*s*/ ctx[1] === 1 && create_if_block_9(ctx);
    	let if_block2 = /*s*/ ctx[1] === 2 && create_if_block_8(ctx);
    	let if_block3 = /*s*/ ctx[1] === 3 && create_if_block_7(ctx);
    	let if_block4 = /*s*/ ctx[1] === 4 && create_if_block_6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (if_block4) if_block4.c();
    			if_block4_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block4) if_block4.m(target, anchor);
    			insert_dev(target, if_block4_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*s*/ ctx[1] === 0) {
    				if (if_block0) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_10(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 1) {
    				if (if_block1) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_9(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 2) {
    				if (if_block2) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_8(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 3) {
    				if (if_block3) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_7(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(t3.parentNode, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 4) {
    				if (if_block4) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_6(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block4) if_block4.d(detaching);
    			if (detaching) detach_dev(if_block4_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (7:0) {#if d === 0}
    function create_if_block$2(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let if_block4_anchor;
    	let current;
    	let if_block0 = /*s*/ ctx[1] === 0 && create_if_block_5(ctx);
    	let if_block1 = /*s*/ ctx[1] === 1 && create_if_block_4(ctx);
    	let if_block2 = /*s*/ ctx[1] === 2 && create_if_block_3(ctx);
    	let if_block3 = /*s*/ ctx[1] === 3 && create_if_block_2(ctx);
    	let if_block4 = /*s*/ ctx[1] === 4 && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (if_block4) if_block4.c();
    			if_block4_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block4) if_block4.m(target, anchor);
    			insert_dev(target, if_block4_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*s*/ ctx[1] === 0) {
    				if (if_block0) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 1) {
    				if (if_block1) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 2) {
    				if (if_block2) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_3(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 3) {
    				if (if_block3) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_2(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(t3.parentNode, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (/*s*/ ctx[1] === 4) {
    				if (if_block4) {
    					if (dirty & /*s*/ 2) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_1$1(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block4) if_block4.d(detaching);
    			if (detaching) detach_dev(if_block4_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(7:0) {#if d === 0}",
    		ctx
    	});

    	return block;
    }

    // (44:2) {#if s === 0}
    function create_if_block_10(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "ebr",
    				width: "7.7%",
    				left: "57.3%",
    				top: "69.2%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(44:2) {#if s === 0}",
    		ctx
    	});

    	return block;
    }

    // (51:2) {#if s === 1}
    function create_if_block_9(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cr1",
    				width: "3.7%",
    				left: "63.2%",
    				top: "62.3%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(51:2) {#if s === 1}",
    		ctx
    	});

    	return block;
    }

    // (58:2) {#if s === 2}
    function create_if_block_8(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cr2",
    				width: "2.3%",
    				left: "66.3%",
    				top: "66.0%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(58:2) {#if s === 2}",
    		ctx
    	});

    	return block;
    }

    // (65:2) {#if s === 3}
    function create_if_block_7(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cr3",
    				width: "2.4%",
    				left: "68.7%",
    				top: "66.3%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(65:2) {#if s === 3}",
    		ctx
    	});

    	return block;
    }

    // (72:2) {#if s === 4}
    function create_if_block_6(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cr4",
    				width: "2.4%",
    				left: "71.5%",
    				top: "66.2%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(72:2) {#if s === 4}",
    		ctx
    	});

    	return block;
    }

    // (8:2) {#if s === 0}
    function create_if_block_5(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "ebl",
    				width: "7.4%",
    				left: "34.6%",
    				top: "68.9%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(8:2) {#if s === 0}",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#if s === 1}
    function create_if_block_4(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cl1",
    				width: "3.4%",
    				left: "33.4%",
    				top: "62.0%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(15:2) {#if s === 1}",
    		ctx
    	});

    	return block;
    }

    // (22:2) {#if s === 2}
    function create_if_block_3(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cl2",
    				width: "2.4%",
    				left: "31.6%",
    				top: "65.8%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(22:2) {#if s === 2}",
    		ctx
    	});

    	return block;
    }

    // (29:2) {#if s === 3}
    function create_if_block_2(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cl3",
    				width: "2.6%",
    				left: "29.0%",
    				top: "66.1%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(29:2) {#if s === 3}",
    		ctx
    	});

    	return block;
    }

    // (36:2) {#if s === 4}
    function create_if_block_1$1(ctx) {
    	let sprite;
    	let current;

    	sprite = new Sprite({
    			props: {
    				name: "cl4",
    				width: "2.9%",
    				left: "26.2%",
    				top: "66.4%",
    				active: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sprite.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(36:2) {#if s === 4}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let sprite;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*d*/ ctx[0] === 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	sprite = new Sprite({
    			props: {
    				name: "cr1",
    				width: "3.7%",
    				left: "63.2%",
    				top: "62.3%"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			if_block.c();
    			t = space();
    			create_component(sprite.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(sprite, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(t.parentNode, t);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(sprite.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(sprite.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(sprite, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chicken', slots, []);
    	let { d } = $$props;
    	let { s } = $$props;
    	const writable_props = ['d', 's'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chicken> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('d' in $$props) $$invalidate(0, d = $$props.d);
    		if ('s' in $$props) $$invalidate(1, s = $$props.s);
    	};

    	$$self.$capture_state = () => ({ Sprite, d, s });

    	$$self.$inject_state = $$props => {
    		if ('d' in $$props) $$invalidate(0, d = $$props.d);
    		if ('s' in $$props) $$invalidate(1, s = $$props.s);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [d, s];
    }

    class Chicken$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { d: 0, s: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chicken",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*d*/ ctx[0] === undefined && !('d' in props)) {
    			console.warn("<Chicken> was created without expected prop 'd'");
    		}

    		if (/*s*/ ctx[1] === undefined && !('s' in props)) {
    			console.warn("<Chicken> was created without expected prop 's'");
    		}
    	}

    	get d() {
    		throw new Error("<Chicken>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set d(value) {
    		throw new Error("<Chicken>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get s() {
    		throw new Error("<Chicken>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set s(value) {
    		throw new Error("<Chicken>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/game/Start.svelte generated by Svelte v3.42.6 */

    const file$8 = "src/game/Start.svelte";

    function create_fragment$9(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "start svelte-1nxfb5y");
    			add_location(button, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Start', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Start> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	return [click_handler];
    }

    class Start extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Start",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    function loadSound(src) {
      const audio = new Audio();
      Object.assign(audio, {
        preload: true,
        src: src,
      });

      return audio;
    }

    const s1 = loadSound("/nintenday/1.mp3");
    const s2 = loadSound("/nintenday/2.mp3");
    const s3 = loadSound("/nintenday/3.mp3");
    const s4 = loadSound("/nintenday/4.mp3");
    const c = loadSound("/nintenday/c.mp3");
    const fail = loadSound("/nintenday/fail.mp3");
    const over = loadSound("/nintenday/over.mp3");
    const score = loadSound("/nintenday/score.mp3");

    let inited = false;
    const initSound = () => {
      if (inited) return;

      [s1, s2, s3, s4, c, fail, over, score].forEach((audio) => {
        audio.play();
        audio.pause();
      });

      inited = true;
    };

    function random(min = 0, max) {
      return min + Math.floor(Math.random() * Math.floor(max));
    }

    const SPEED = 800;
    const BREAK = 2500;
    const CHIKEN_SPEED = 500;

    const getOst = (d) => {
      switch (d) {
        case 0:
          return s1;
        case 1:
          return s2;
        case 2:
          return s3;
        case 3:
          return s4;
      }
    };

    class Egg {
      constructor() {
        this.d = random(0, 4);

        this.pik = getOst(this.d).cloneNode();
        this.score = score.cloneNode();
        this.fail = fail.cloneNode();

        this.s = 0;
        this.timeout = SPEED;
        this.done = false;
        this.success = null;

        this.play(this.pik);
      }
      tick(dt) {
        if (this.done) return;

        this.timeout -= dt;

        if (this.timeout < 0) {
          this.s += 1;

          this.timeout = SPEED;

          if (this.s <= 4) {
            this.play(this.pik);
          }
        }

        if (this.s > 4) {
          const v = get_store_value(basketV);
          const h = get_store_value(basketH);

          this.done = true;
          this.success =
            (this.d === 0 || this.d === 1 ? v === V.top : v === V.bottom) &&
            (this.d === 0 || this.d === 3 ? h === H.left : h === H.right);

          this.play(this.success ? this.score : this.fail);

          this.pik = null;
          this.score = null;
          this.fail = null;
        }
      }
      play(sound) {
        sound.currentTime = 0;
        sound.play();
      }
    }

    class Chicken {
      constructor(d) {
        this.d = d;

        this.pik = c.cloneNode();

        this.s = 0;
        this.timeout = CHIKEN_SPEED;
        this.done = false;

        this.play(this.pik);
      }
      tick(dt) {
        if (this.done) return;

        this.timeout -= dt;

        if (this.timeout < 0) {
          this.s += 1;
          this.timeout = CHIKEN_SPEED;

          if (this.s <= 4) {
            this.play(this.pik);
          }
        }

        if (this.s > 4) {
          this.done = true;
        }
      }
      play(sound) {
        sound.currentTime = 0;
        sound.play();
      }
    }

    const player = writable('player');

    const host = 'https://functions.yandexcloud.net/d4esa1grli4quj8vs5gs';

    const uploadScore = (score) => {
        request(`${host}?score=${encodeURIComponent(score)}&player=${encodeURIComponent(get_store_value(player))}`);
    };

    const request = (url) => {
        let r = 0;

        const exec = () => {
            return fetch(url).catch(() => {
                if (r < 20) {
                    r++;

                    return exec();
                }
            });
        };

        return exec();
    };

    let startTime;
    let lastTime;
    let loopId;
    let spawnDelay;
    let breakDelay;
    let spawnDelayOffsetIndex;
    let level;
    let speedMultiplier;
    let maxSpawnPreventChance;

    const offsets = [0, 20, -20];

    const getOffset = () => {
      const current = offsets[spawnDelayOffsetIndex];

      spawnDelayOffsetIndex = (spawnDelayOffsetIndex + 1) % 3;

      return current;
    };

    const shouldSpawn = (chance) => !(random(0, chance) % chance);

    const start = () => {
      stop();

      startTime = Date.now();
      lastTime = startTime;

      spawnDelay = 0;
      spawnDelayOffsetIndex = 0;

      breakDelay = BREAK;

      eggs.set([]);
      score$1.set(0);
      fails.set(0);

      level = 1;
      maxSpawnPreventChance = 6;
      speedMultiplier = 1;

      loopId = requestAnimationFrame(tick);
      playing.set(true);
    };

    const stop = () => {
      cancelAnimationFrame(loopId);
      playing.set(false);
    };

    const tick = () => {
      const newTime = Date.now();
      const dt = newTime - lastTime;
      const newChickens = get_store_value(chickens).filter((chicken) => {
        chicken.tick(dt);

        return !chicken.done;
      });

      if (breakDelay < 0) {
        let newScore = get_store_value(score$1);
        let newFails = get_store_value(fails);
        let newEggs = [];

        for (const egg of get_store_value(eggs)) {
          egg.tick(dt);

          if (egg.done) {
            if (egg.success) {
              newScore += 1;
            } else {
              newFails += 1;

              if (newFails === 3) {
                uploadScore(newScore);
                over.currentTime = 0;
                over.play();
              }

              newChickens.push(new Chicken(egg.d === 0 || egg.d === 3 ? 0 : 1));
              breakDelay = BREAK;
              newEggs = [];
              break;
            }
          } else {
            newEggs.push(egg);
          }
        }

        updateLevel(newScore);

        spawnDelay -= dt;
        if (spawnDelay <= 0 && newFails < 3) {
          if (
            newEggs.length < level &&
            shouldSpawn(Math.min(1 + newEggs.length, maxSpawnPreventChance))
          ) {
            newEggs.push(new Egg());
          }

          spawnDelay =
            SPEED * speedMultiplier + getOffset() * Math.min(newEggs.length + 1, 2);
        }

        eggs.set(newEggs);
        score$1.set(newScore);
        fails.set(newFails);
      } else {
        breakDelay -= dt;
      }

      chickens.set(newChickens);

      lastTime = newTime;
      loopId = requestAnimationFrame(tick);
    };

    const updateLevel = (score) => {
      if (score < 5) {
        level = 1;
        maxSpawnPreventChance = 6;
        speedMultiplier = 1;
      } else if (score < 15) {
        level = 2;
        maxSpawnPreventChance = 5;
        speedMultiplier = 1;
      } else if (score < 30) {
        level = 3;
        maxSpawnPreventChance = 4;
        speedMultiplier = 0.95;
      } else if (score < 50) {
        level = 5;
        maxSpawnPreventChance = 3;
        speedMultiplier = 0.9;
      } else if (score < 100) {
        level = 10;
        maxSpawnPreventChance = 2;
        speedMultiplier = 0.85;
      } else {
        level = 16;
        maxSpawnPreventChance = 1;
        speedMultiplier = 0.8;
      }
    };

    /* src/game/Exit.svelte generated by Svelte v3.42.6 */

    const file$7 = "src/game/Exit.svelte";

    function create_fragment$8(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			attr_dev(button, "class", "exit svelte-i995tw");
    			add_location(button, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Exit', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Exit> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	return [click_handler];
    }

    class Exit extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Exit",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/game/Auth.svelte generated by Svelte v3.42.6 */
    const file$6 = "src/game/Auth.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let script;
    	let script_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			script = element("script");
    			script.async = true;
    			if (!src_url_equal(script.src, script_src_value = "https://telegram.org/js/telegram-widget.js?15")) attr_dev(script, "src", script_src_value);
    			attr_dev(script, "data-telegram-login", "nintenday_bot");
    			attr_dev(script, "data-size", "medium");
    			attr_dev(script, "data-radius", "8");
    			attr_dev(script, "data-onauth", "onTelegramAuth(user)");
    			add_location(script, file$6, 11, 4, 253);
    			attr_dev(div, "class", "auth svelte-13pxl4k");
    			add_location(div, file$6, 10, 0, 230);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, script);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Auth', slots, []);

    	window.onTelegramAuth = ({ first_name, last_name, username }) => {
    		player.set(`${first_name} ${last_name}${username ? ' ' + username : ''}`.replace(/'/g, ''));
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Auth> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ player });
    	return [];
    }

    class Auth extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Auth",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/game/Game.svelte generated by Svelte v3.42.6 */
    const file$5 = "src/game/Game.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (36:2) {:else}
    function create_else_block(ctx) {
    	let start_1;
    	let current;
    	start_1 = new Start({ $$inline: true });
    	start_1.$on("click", start);

    	const block = {
    		c: function create() {
    			create_component(start_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(start_1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(start_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(start_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(start_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(36:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if !$player}
    function create_if_block_1(ctx) {
    	let auth;
    	let current;
    	auth = new Auth({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(auth.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(auth, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(auth.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(auth.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(auth, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(34:2) {#if !$player}",
    		ctx
    	});

    	return block;
    }

    // (40:2) {#if $playing}
    function create_if_block$1(ctx) {
    	let score;
    	let t0;
    	let controls;
    	let t1;
    	let fail;
    	let t2;
    	let basket;
    	let t3;
    	let wolf;
    	let t4;
    	let t5;
    	let each1_anchor;
    	let current;
    	score = new Score({ $$inline: true });
    	controls = new Controls({ $$inline: true });
    	fail = new Fail({ $$inline: true });
    	basket = new Basket({ $$inline: true });
    	wolf = new Wolf({ $$inline: true });
    	let each_value_1 = /*$eggs*/ ctx[3];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*$chickens*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			create_component(score.$$.fragment);
    			t0 = space();
    			create_component(controls.$$.fragment);
    			t1 = space();
    			create_component(fail.$$.fragment);
    			t2 = space();
    			create_component(basket.$$.fragment);
    			t3 = space();
    			create_component(wolf.$$.fragment);
    			t4 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(score, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(controls, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(fail, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(basket, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(wolf, target, anchor);
    			insert_dev(target, t4, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(target, anchor);
    			}

    			insert_dev(target, t5, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$eggs*/ 8) {
    				each_value_1 = /*$eggs*/ ctx[3];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(t5.parentNode, t5);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*$chickens*/ 16) {
    				each_value = /*$chickens*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(score.$$.fragment, local);
    			transition_in(controls.$$.fragment, local);
    			transition_in(fail.$$.fragment, local);
    			transition_in(basket.$$.fragment, local);
    			transition_in(wolf.$$.fragment, local);

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(score.$$.fragment, local);
    			transition_out(controls.$$.fragment, local);
    			transition_out(fail.$$.fragment, local);
    			transition_out(basket.$$.fragment, local);
    			transition_out(wolf.$$.fragment, local);
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(score, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(controls, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(fail, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(basket, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(wolf, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(40:2) {#if $playing}",
    		ctx
    	});

    	return block;
    }

    // (46:4) {#each $eggs as egg}
    function create_each_block_1(ctx) {
    	let egg;
    	let current;

    	egg = new Egg$1({
    			props: { d: /*egg*/ ctx[9].d, s: /*egg*/ ctx[9].s },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(egg.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(egg, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const egg_changes = {};
    			if (dirty & /*$eggs*/ 8) egg_changes.d = /*egg*/ ctx[9].d;
    			if (dirty & /*$eggs*/ 8) egg_changes.s = /*egg*/ ctx[9].s;
    			egg.$set(egg_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(egg.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(egg.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(egg, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(46:4) {#each $eggs as egg}",
    		ctx
    	});

    	return block;
    }

    // (49:4) {#each $chickens as chicken}
    function create_each_block$2(ctx) {
    	let chicken;
    	let current;

    	chicken = new Chicken$1({
    			props: {
    				d: /*chicken*/ ctx[6].d,
    				s: /*chicken*/ ctx[6].s
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(chicken.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(chicken, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chicken_changes = {};
    			if (dirty & /*$chickens*/ 16) chicken_changes.d = /*chicken*/ ctx[6].d;
    			if (dirty & /*$chickens*/ 16) chicken_changes.s = /*chicken*/ ctx[6].s;
    			chicken.$set(chicken_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chicken.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chicken.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(chicken, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(49:4) {#each $chickens as chicken}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let exit;
    	let t1;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*$player*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	exit = new Exit({ $$inline: true });
    	exit.$on("click", /*click_handler*/ ctx[5]);
    	let if_block1 = /*$playing*/ ctx[2] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block0.c();
    			t0 = space();
    			create_component(exit.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", "game svelte-mjv71m");
    			toggle_class(div, "open", /*$open*/ ctx[0]);
    			add_location(div, file$5, 32, 0, 801);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t0);
    			mount_component(exit, div, null);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div, t0);
    			}

    			if (/*$playing*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$playing*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$open*/ 1) {
    				toggle_class(div, "open", /*$open*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(exit.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(exit.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    			destroy_component(exit);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const background = "/nintenday/game.webp";

    function instance$6($$self, $$props, $$invalidate) {
    	let $open;
    	let $player;
    	let $playing;
    	let $eggs;
    	let $chickens;
    	validate_store(open, 'open');
    	component_subscribe($$self, open, $$value => $$invalidate(0, $open = $$value));
    	validate_store(player, 'player');
    	component_subscribe($$self, player, $$value => $$invalidate(1, $player = $$value));
    	validate_store(playing, 'playing');
    	component_subscribe($$self, playing, $$value => $$invalidate(2, $playing = $$value));
    	validate_store(eggs, 'eggs');
    	component_subscribe($$self, eggs, $$value => $$invalidate(3, $eggs = $$value));
    	validate_store(chickens, 'chickens');
    	component_subscribe($$self, chickens, $$value => $$invalidate(4, $chickens = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Game', slots, []);

    	open.subscribe(value => {
    		if (!value) {
    			stop();
    		} else {
    			initSound();
    		}
    	});

    	preload(background);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Game> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(open, $open = false, $open);

    	$$self.$capture_state = () => ({
    		preload,
    		Controls,
    		Egg: Egg$1,
    		Basket,
    		Wolf,
    		Score,
    		Fail,
    		Chicken: Chicken$1,
    		Start,
    		initSound,
    		eggs,
    		chickens,
    		open,
    		playing,
    		start,
    		stop,
    		Exit,
    		Auth,
    		player,
    		background,
    		$open,
    		$player,
    		$playing,
    		$eggs,
    		$chickens
    	});

    	return [$open, $player, $playing, $eggs, $chickens, click_handler];
    }

    class Game extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Game",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Paranja.svelte generated by Svelte v3.42.6 */
    const file$4 = "src/Paranja.svelte";

    function create_fragment$5(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "paranja svelte-1idg5py");
    			toggle_class(div, "open", /*$open*/ ctx[0]);
    			add_location(div, file$4, 36, 0, 675);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$open*/ 1) {
    				toggle_class(div, "open", /*$open*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $open;
    	validate_store(open, 'open');
    	component_subscribe($$self, open, $$value => $$invalidate(0, $open = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Paranja', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paranja> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ open, $open });
    	return [$open];
    }

    class Paranja extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paranja",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/invitation/Timer.svelte generated by Svelte v3.42.6 */

    function create_fragment$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*status*/ ctx[0]);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*status*/ 1) set_data_dev(t, /*status*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function d2(v) {
    	return ('0' + v).substr(-2);
    }

    function plural(n, f) {
    	n %= 100;
    	if (n > 10 && n < 20) return f[2];
    	n %= 10;
    	return f[n > 1 && n < 5 ? 1 : n === 1 ? 0 : 2];
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Timer', slots, []);
    	let { start } = $$props;
    	const INTERVALS = [1000, 60, 60, 24, 7];

    	function offset(start, from = new Date()) {
    		let offset = start - from;
    		let direction = offset > 0 ? 1 : offset < 0 ? -1 : 0;
    		offset = Math.abs(offset);

    		let result = INTERVALS.map(function (value) {
    			var result = offset % value;
    			offset = (offset - result) / value;
    			return result;
    		});

    		return {
    			milliseconds: result[0],
    			seconds: result[1],
    			minutes: result[2],
    			hours: result[3],
    			days: result[4],
    			weeks: offset,
    			direction
    		};
    	}

    	let status;

    	function iterate() {
    		$$invalidate(0, status = render());

    		if (offset(start).direction !== 1) {
    			return;
    		}

    		setTimeout(iterate, 1000);
    	}

    	iterate();

    	function render() {
    		const { direction, weeks, days, hours, minutes, seconds } = offset(start);

    		if (direction === 1) {
    			const result = [];

    			if (weeks) {
    				result.push(weeks + ' ' + plural(weeks, ['неделю', 'недели', 'недель']));
    			}

    			if (days) {
    				result.push(days + ' ' + plural(days, ['день', 'дня', 'дней']));
    			}

    			return `${result.join(' ')} ${hours}ч ${d2(minutes)}м ${d2(seconds)}с`;
    		} else {
    			return '🚀';
    		}
    	}

    	const writable_props = ['start'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Timer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    	};

    	$$self.$capture_state = () => ({
    		start,
    		INTERVALS,
    		d2,
    		plural,
    		offset,
    		status,
    		iterate,
    		render
    	});

    	$$self.$inject_state = $$props => {
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    		if ('status' in $$props) $$invalidate(0, status = $$props.status);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [status, start];
    }

    class Timer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { start: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timer",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*start*/ ctx[1] === undefined && !('start' in props)) {
    			console.warn("<Timer> was created without expected prop 'start'");
    		}
    	}

    	get start() {
    		throw new Error("<Timer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set start(value) {
    		throw new Error("<Timer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/invitation/Links.svelte generated by Svelte v3.42.6 */

    const file$3 = "src/invitation/Links.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i].icon;
    	child_ctx[2] = list[i].text;
    	child_ctx[3] = list[i].href;
    	return child_ctx;
    }

    // (59:1) {#each links as { icon, text, href }}
    function create_each_block$1(ctx) {
    	let a;
    	let span0;
    	let raw_value = /*icon*/ ctx[1] + "";
    	let span1;
    	let t_value = /*text*/ ctx[2] + "";
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			span0 = element("span");
    			span1 = element("span");
    			t = text(t_value);
    			attr_dev(span0, "class", "icon svelte-1th9ln2");
    			add_location(span0, file$3, 59, 32, 2289);
    			add_location(span1, file$3, 59, 70, 2327);
    			attr_dev(a, "a", "");
    			attr_dev(a, "href", /*href*/ ctx[3]);
    			attr_dev(a, "class", "row svelte-1th9ln2");
    			add_location(a, file$3, 59, 1, 2258);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, span0);
    			span0.innerHTML = raw_value;
    			append_dev(a, span1);
    			append_dev(span1, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(59:1) {#each links as { icon, text, href }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let each_value = /*links*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "links svelte-1th9ln2");
    			add_location(div, file$3, 57, 0, 2198);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*links*/ 1) {
    				each_value = /*links*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Links', slots, []);

    	const links = [
    		{
    			icon: '<svg width="1em"fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.7c-54.5-46.4-136-38.7-186.6 13.5L256 96.6l-19.7-20.3C195.5 34.1 113.2 8.7 49.7 62.7c-62.8 53.6-66.1 149.8-9.9 207.8l193.5 199.8c6.2 6.4 14.4 9.7 22.6 9.7 8.2 0 16.4-3.2 22.6-9.7L472 270.5c56.4-58 53.1-154.2-9.7-207.8zm-13.1 185.6L256.4 448.1 62.8 248.3c-38.4-39.6-46.4-115.1 7.7-161.2 54.8-46.8 119.2-12.9 142.8 11.5l42.7 44.1 42.7-44.1c23.2-24 88.2-58 142.8-11.5 54 46 46.1 121.5 7.7 161.2z"/></svg>',
    			text: 'Вишлист',
    			href: 'https://yandex.ru/collections/user/erblack/_wishlist/'
    		},
    		{
    			icon: '<svg width="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm0-312c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm0-88c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24zm-8-144c-88.2 0-160 71.8-160 160h32c0-70.6 57.4-128 128-128V88z"/></svg>',
    			text: 'Пластинки',
    			href: 'https://www.discogs.com/wantlist?user=ErBlack'
    		},
    		{
    			icon: '<svg width="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"/></svg>',
    			text: 'Чат',
    			href: 'https://t.me/joinchat/FtBO2_Nqd5JhMmJi'
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Links> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ links });
    	return [links];
    }

    class Links extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Links",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/invitation/Content.svelte generated by Svelte v3.42.6 */
    const file$2 = "src/invitation/Content.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let h1;
    	let t1;
    	let p;
    	let t2;
    	let t3_value = /*start*/ ctx[0].getDate() + "";
    	let t3;
    	let t4;
    	let br0;
    	let br1;
    	let t5;
    	let br2;
    	let br3;
    	let t6;
    	let timer;
    	let t7;
    	let links;
    	let current;

    	timer = new Timer({
    			props: { start: /*start*/ ctx[0] },
    			$$inline: true
    		});

    	links = new Links({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "nintenday";
    			t1 = space();
    			p = element("p");
    			t2 = text("Приглашаю ");
    			t3 = text(t3_value);
    			t4 = text(" октября\n        ");
    			br0 = element("br");
    			br1 = element("br");
    			t5 = text("\n        приходите с 14:00 до 17:00\n        ");
    			br2 = element("br");
    			br3 = element("br");
    			t6 = text("\n        Через ");
    			create_component(timer.$$.fragment);
    			t7 = space();
    			create_component(links.$$.fragment);
    			attr_dev(h1, "class", "heading svelte-149eylp");
    			add_location(h1, file$2, 7, 4, 186);
    			add_location(br0, file$2, 10, 8, 294);
    			add_location(br1, file$2, 10, 13, 299);
    			add_location(br2, file$2, 12, 8, 348);
    			add_location(br3, file$2, 12, 13, 353);
    			attr_dev(p, "class", "text svelte-149eylp");
    			add_location(p, file$2, 8, 4, 225);
    			attr_dev(section, "class", "content svelte-149eylp");
    			add_location(section, file$2, 6, 0, 156);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, p);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, br0);
    			append_dev(p, br1);
    			append_dev(p, t5);
    			append_dev(p, br2);
    			append_dev(p, br3);
    			append_dev(p, t6);
    			mount_component(timer, p, null);
    			append_dev(section, t7);
    			mount_component(links, section, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(timer.$$.fragment, local);
    			transition_in(links.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(timer.$$.fragment, local);
    			transition_out(links.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(timer);
    			destroy_component(links);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Content', slots, []);
    	const start = new Date('2021-10-16T11:00:00.000Z');
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Timer, Links, start });
    	return [start];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/invitation/invitation.svelte generated by Svelte v3.42.6 */
    const file$1 = "src/invitation/invitation.svelte";

    // (14:0) {#if  ready}
    function create_if_block(ctx) {
    	let main;
    	let content;
    	let current;
    	let mounted;
    	let dispose;
    	content = new Content({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(content.$$.fragment);
    			attr_dev(main, "class", "invitation svelte-1g3gk05");
    			toggle_class(main, "inbound", /*ready*/ ctx[0]);
    			toggle_class(main, "hidden", /*$hidden*/ ctx[1] || /*$open*/ ctx[2]);
    			add_location(main, file$1, 14, 0, 276);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(content, main, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(main, "touchmove", prevent_default(/*touchmove_handler*/ ctx[3]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ready*/ 1) {
    				toggle_class(main, "inbound", /*ready*/ ctx[0]);
    			}

    			if (dirty & /*$hidden, $open*/ 6) {
    				toggle_class(main, "hidden", /*$hidden*/ ctx[1] || /*$open*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(content);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(14:0) {#if  ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ready*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ready*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $hidden;
    	let $open;
    	validate_store(hidden, 'hidden');
    	component_subscribe($$self, hidden, $$value => $$invalidate(1, $hidden = $$value));
    	validate_store(open, 'open');
    	component_subscribe($$self, open, $$value => $$invalidate(2, $open = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Invitation', slots, []);
    	let ready = false;

    	preload('/nintenday/nesc.webp').then(() => {
    		$$invalidate(0, ready = true);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Invitation> was created with unknown prop '${key}'`);
    	});

    	function touchmove_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$capture_state = () => ({
    		Content,
    		preload,
    		hidden,
    		open,
    		ready,
    		$hidden,
    		$open
    	});

    	$$self.$inject_state = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ready, $hidden, $open, touchmove_handler];
    }

    class Invitation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Invitation",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.6 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (17:4) {#each gw as console}
    function create_each_block(ctx) {
    	let console;
    	let current;
    	const console_spread_levels = [/*console*/ ctx[1]];
    	let console_props = {};

    	for (let i = 0; i < console_spread_levels.length; i += 1) {
    		console_props = assign(console_props, console_spread_levels[i]);
    	}

    	console = new Console({ props: console_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(console.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(console, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const console_changes = (dirty & /*gw*/ 1)
    			? get_spread_update(console_spread_levels, [get_spread_object(/*console*/ ctx[1])])
    			: {};

    			console.$set(console_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(console.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(console.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(console, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(17:4) {#each gw as console}",
    		ctx
    	});

    	return block;
    }

    // (16:2) <Desk>
    function create_default_slot(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*gw*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*gw*/ 1) {
    				each_value = /*gw*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:2) <Desk>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let invitation;
    	let t0;
    	let desk;
    	let t1;
    	let paranja;
    	let t2;
    	let game;
    	let current;
    	invitation = new Invitation({ $$inline: true });

    	desk = new Desk({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paranja = new Paranja({ $$inline: true });
    	game = new Game({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(invitation.$$.fragment);
    			t0 = space();
    			create_component(desk.$$.fragment);
    			t1 = space();
    			create_component(paranja.$$.fragment);
    			t2 = space();
    			create_component(game.$$.fragment);
    			add_location(main, file, 13, 0, 372);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(invitation, main, null);
    			append_dev(main, t0);
    			mount_component(desk, main, null);
    			append_dev(main, t1);
    			mount_component(paranja, main, null);
    			append_dev(main, t2);
    			mount_component(game, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const desk_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				desk_changes.$$scope = { dirty, ctx };
    			}

    			desk.$set(desk_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(invitation.$$.fragment, local);
    			transition_in(desk.$$.fragment, local);
    			transition_in(paranja.$$.fragment, local);
    			transition_in(game.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(invitation.$$.fragment, local);
    			transition_out(desk.$$.fragment, local);
    			transition_out(paranja.$$.fragment, local);
    			transition_out(game.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(invitation);
    			destroy_component(desk);
    			destroy_component(paranja);
    			destroy_component(game);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const gw = new Array(10).fill({}).map((props, i) => ({
    		...props,
    		filename: `g${`0${i + 1}`.slice(-2)}.jpg`
    	}));

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Desk,
    		Console,
    		Game,
    		Paranja,
    		Invitation,
    		gw
    	});

    	return [gw];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
