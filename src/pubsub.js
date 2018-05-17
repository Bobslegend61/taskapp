let events = (() => {
    let events = {};

    const registerEvents = (eventName, eventFunction) => {
        events[eventName] = events[eventName] || [];
        events[eventName].push(eventFunction);
    }

    const destroyEvent = (eventName, eventFunction) => {
        if(eventName in events) {
            let i = 0;
            for(i; i < events[eventName].length; i++) {
                if(events[eventName][i] === eventFunction) {
                    events[eventName].splice(i, 1);
                }
            }
        }
    }

    const emitEvents = (eventName, data) => {
        if(eventName in events) {
            events[eventName].forEach((fn) => {
                fn(data);
            })
        }
    }

    return {
        on: registerEvents,
        emit: emitEvents,
        destroy: destroyEvent,
    }
})();

export default events;