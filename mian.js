
async function retrieve(link) {
    var r="";
    var l = "https://api.allorigins.win/get?url=" + "https://" + link;
    await fetch(l.toString(), {method: "GET"})
        .then((response) => response.json())
        .then((text) => {r = text.contents});
    //r = r.substr(0, r.indexOf("<head>") + 6) + `<script>document.addEventListener('click',e=>{frameElement&&document.activeElement&&document.activeElement.href&&(e.preventDefault(),frameElement.load(document.activeElement.href))}); var link = '${link}';alert("balls");</script>` + r.substr(r.indexOf("</head>") + 7, r.length) 
    console.log(r);
return r;
}
var frame = document.createElement("frame");
frame.setAttribute("id", "f");
document.body.appendChild(frame)
var link = prompt("enter link here (must start with www. or images will be broken): ")
frame.innerHTML = await retrieve(link)
var w = frame.contentWindow
frame.addEventListener('click', e => {
		if (frameElement && document.activeElement && document.activeElement.href) {
			e.preventDefault()
			frameElement.innerHTML = retrieve(document.activeElement.href)
			alert("click")
		}
	}, true)
function loop() {
    for (s of frame.querySelectorAll("[src]")) {
        if (s.src[0] === "/") {
        s.src = `https://${link}${s.src}`;
        console.log(`Patched element. (${s.src})`);
    }
    }
}
setInterval(loop, 10);
//document.querySelectorAll([src])