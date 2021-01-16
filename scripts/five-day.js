import { getFuture } from "./components/future.js"

// Changing direction of scroll wheel.
$('.container').on('mousewheel DOMMouseScroll', function(event){
    event.preventDefault();
    var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

    $(this).scrollLeft( $(this).scrollLeft() - ( delta * 40 ) );
    
});

function main() {
    getFuture("Portland");
}

main();