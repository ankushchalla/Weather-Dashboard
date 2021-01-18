
function changeStyle(startsWith, newLink) {
    $(`link[href^='${startsWith}']`).remove();
    let newStyle = $("<link>").attr({
        rel: "stylesheet",
        href: newLink
    })
    $("head").append(newStyle);
}

export { changeStyle };