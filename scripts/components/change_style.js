
function changeStyle(oldLink, newLink) {
    $(`link[href='${oldLink}']`).remove();
    let newStyle = $("<link>").attr({
        rel: "stylesheet",
        href: newLink
    })
    $("head").append(newStyle);
}

export { changeStyle };