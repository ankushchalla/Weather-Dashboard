
import { buildLanding } from "../Builders/build_landing.js";
import { changeStyle } from "../change_style.js";
// GOAL: Buttons navigate to page, instead of reloading, etc.

function addHome(parent) {
    let home = $("<button>").addClass("home").append($("<i>").addClass("fa fa-home"));
    $(parent).prepend(home);
    home.click(function (event) {
        event.preventDefault();
        $(".container").empty();
        changeStyle("./styles", "./styles/landing.css");
        buildLanding();
    })
}

export { addHome };