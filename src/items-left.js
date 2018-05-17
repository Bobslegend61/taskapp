import events from "./pubsub";
let itemLeft = (() => {
    let $itemsLeft = document.querySelector(".todo-info .items-left span");
    events.on("todolistchanged", updateItemLeft);
    function updateItemLeft(total) {
        $itemsLeft.innerHTML = total;
    }
})();

export default itemLeft;