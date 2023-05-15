class Resizer {
    resizer;
    element;
    constructor(callback) {
        this.resizer = new ResizeObserver(callback)
    }
    observe(el) {
        this.element = el;
        this.resizer.observe(el)
    }
    disconnect() {
        this.element = null;
        this.resizer.disconnect()
    }
}

let resizers = [];

export default {
    mounted(el, binding, vnode, prevVnode) {
        let resizer = new Resizer(binding.value);
        resizer.observe(el);
        resizers.push(resizer);
    },
    beforeUnmount(el, binding, vnode, prevVnode) {
        for (const resizer of resizers) {
            if (resizer.element === el) {
                resizer.disconnect();
                resizers = resizers.filter(item => item !== resizer)
            }
        }
    }
}