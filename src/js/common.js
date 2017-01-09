/*


 允许同时绑定多个callback，
 允许删除绑定
 允许删除绑定


 */
class MyBtn {
    constructor(el) { //id
        this.el = document.querySelector(`#${el}`);
        this.listeners = {};
    }

    on(eventName, listener, reDelegate = false) {
        try {
            throw typeof(listener) != "function";
        } catch (e) {
            if (e) alert("binder not a function");
        }
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        if (!reDelegate) {
            this.listeners[eventName].push(listener);
        } else {
            this.listeners[eventName] = listener;
        }
        this.addDelegate(eventName)
    }

    addDelegate(eventName) {
        let listener = this.listeners[eventName];
        this.el.addEventListener(eventName, listener[listener.length - 1], false);

    }

    delDelegate(eventName) {
        for (var fn of this.listeners[eventName]) {
            this.el.removeEventListener(eventName, fn, false);
        }
        alert(`${eventName} all removed`);
    }
}
module.exports = MyBtn;