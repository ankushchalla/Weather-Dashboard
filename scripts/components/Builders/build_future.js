
// Adds five day forecast info onto screen.
function buildFuture(fiveDay) {
    addHome();
    for (let i = 0; i < fiveDay.length; i++) {
        let card = $("<div>").addClass("box").attr("id", `day-${i}`);
        let tempAndDay = $("<div>").addClass("temp-day");
        let temp = $("<div>").addClass("temp").text(`${fiveDay[i][2]}°`);
        let day = $("<div>").addClass("day").text(fiveDay[i][0]);
        tempAndDay.append(temp, day);

        let conditions = $("<div>").addClass("conditions").text(fiveDay[i][1]);
        let humidity = $("<div>").addClass("humidity").text(`Humidity: ${fiveDay[i][3]}%`);

        $(".container").append(card.append(tempAndDay, conditions, humidity));
    }

    // For some reason, margin right on last box is only applied if something comes after it.
    // This is hacky, look for better solution.
    $(".container").append($("<div>").addClass("space-hack").text("`"));
    horizScrollOn();

}

function addHome() {
    let home = $("<button>").addClass("home").append($("<i>").addClass("fa fa-home"));
    $(".container").append(home);
    $(".home").click(function () {
        location.reload();
    })
}

// Changing direction of scroll wheel.
function horizScrollOn() {
    $('.container').on('mousewheel DOMMouseScroll', function (event) {
        event.preventDefault();
        var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));

        $(this).scrollLeft($(this).scrollLeft() - (delta * 40));
    });
}

export { buildFuture };