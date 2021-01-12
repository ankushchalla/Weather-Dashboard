import { getFuture } from "./components/future.js"

// Changing direction of scroll wheel.
$('.container').on('mousewheel DOMMouseScroll', function(event){
    event.preventDefault();
    var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

    $(this).scrollLeft( $(this).scrollLeft() - ( delta * 40 ) );
    
});

function main() {
    let home = $("<button>").addClass("home").append($("<i>").addClass("fa fa-home"));
    $(".container").append(home);
    $(".home").click(function() {
        location.reload();
    })
    getFuture("Portland");
}

main();