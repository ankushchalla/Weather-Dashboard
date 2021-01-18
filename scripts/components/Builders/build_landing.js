import { main } from "../../main.js";

// Build landing page in container.
function buildLanding() {
    const container = $(".container");
    const header = $("<div>").addClass("header").append($("<div>").addClass("heading").text("Weather Dashboard."));
    const form = $("<form>").attr("id", "form");
    const inputGroup = $("<div>").addClass("input-group");
    const searchBar = $("<input>").addClass("form-control").attr({
        type: "text",
        id: "search-city",
        placeholder: "Search city"
    });
    const button = $("<button>").attr("id", "searchBtn").append($("<span>")
    .attr("id", "search-icon").append($("<i>").addClass("fa fa-search")));

    inputGroup.append(searchBar, button);
    header.append(form.append(inputGroup));
    container.append(header);

    // Remember, empty() will remove event handlers' ties to elements.
    $("form").on("submit", function(event) {
        event.preventDefault();
        main();
    });
        
}

export { buildLanding };