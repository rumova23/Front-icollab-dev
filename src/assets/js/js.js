
window.onload = function() {
    var node= document.getElementById("loader");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

};