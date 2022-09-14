var colourTimer
click = 0;

function changeColour() {

    click++;

    if (click >= 3) {

        if (click == 3) {
            colourTimer = window.setTimeout(resetColour, 5000);
        } else {
            clearTimeout(colourTimer);
            colourTimer = window.setTimeout(resetColour, 5000);
        }

        let color = getRandomColor();
        const children = document.getElementsByClassName("logo")[0].children;

        for (let i = 0; i < children.length; i++) {

            children[i].setAttribute("fill", color);
            children[i].setAttribute("stroke", color);

        }
    }

}

function resetColour() {

    const children = document.getElementsByClassName("logo")[0].children;

    for (let i = 0; i < children.length; i++) {

        children[i].removeAttribute("fill");

        children[i].removeAttribute("stroke");

    }

    clearTimeout(colourTimer);
    click = 0;
}

function getRandomColor() {

    const letters = "0123456789ABCDEF";
    let color = "#";

    for (var i = 0; i < 6; i++) {

        color += letters[Math.floor(Math.random() * 16)];

    }

    return color;
}

var pattern = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
var current = 0;

var keyHandler = function(event) {

    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {

        current = 0;
        return;

    }

    current++;

    if (pattern.length === current) {

        current = 0;
        window.location.href = "https://piped.kavin.rocks/embed/PayvWj2piKg";

    }

};

document.addEventListener("keydown", keyHandler, false);


fetch("https://blog.clubelec.insset.fr/index.xml")
    .then(response => response.text())
    .then(xml => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        var rootElement = xmlDoc.documentElement;
        var children = rootElement.childNodes;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType == Node.ELEMENT_NODE) {
                document.getElementById("article-link").href = child.getElementsByTagName("link")[1].textContent;
                document.getElementById("article-title").innerHTML = child.getElementsByTagName("title")[1].textContent;
                document.getElementsByClassName("blog")[0].classList.add("active");
            }
        }
    })
