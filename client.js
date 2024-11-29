// Ah, yes. The client side. Where most of the processing happens. Including the filtering which is kinda flawed.
var link = "https://curly-meme-w6964g55p7jcgqjg-8080.app.github.dev/";//"http://localhost:8080" //link
function filter(text) {
    var list = ["fuck", "shit", "fucking", "shitting", "nigger", "negro", "nigga", "niggers", "niggas", "negroes", "cumming", "cock", "cum", "nutting", "dick", "nazi", "hitler", "adolf", "nut", "pussy", "bitch", "ass", "asshole", "asscheeks", "butthole", "butt"];
    var filteredtext = text;
    var filteredword = "";
    for (item of list) {
        filteredword = item.replace(/./g, "#");
        filteredtext = filteredtext.split(item).join(filteredword);
    }
    filteredtext = filteredtext.split("undefined").join("");
    filteredtext = filteredtext.split("\n\n").join("\n");
    return filteredtext
}

async function send() {
    var user = document["getElementById"]("user")["value"];
    if (user === "") {
        alert("You need a username!");
        return false;
    }
    if (user.split(" ").length !== 1) {
        alert("Username can't contain spaces!");
        return false;
    }
    if (filter(user).split("#").length !== 1) {
        alert("Woah there buddy, your username is explicit!");
        return false;
    }
    user = user[0].toUpperCase() + user.substr(1, user.length);
    var text = document["getElementById"]("senddata")["value"];
    var resp = "";
    var area = document["getElementById"]("log")
    await fetch(link, {method: "POST", body: user+": "+text.toString()})
        .then((response) => response.text())
        .then((txt) => {resp += txt})
    document["getElementById"]("senddata")["value"] = "";
    area.value = filter(resp);
    area.scrollTop = area.scrollHeight;
}
async function update() {
    var resp = "";
    var area = document["getElementById"]("log")
    await fetch(link, {method: "POST", body: "updateRequestV3"})
        .then((response) => response.text())
        .then((txt) => {resp += txt})
    area.value = filter(resp);
    area.scrollTop = area.scrollHeight;
    // This is a auto-sync function for simply updating the chat.
    // It is a basic patched version of send()
}

var btn = document.createElement("button");
var input = document.createElement("input");
var user = document.createElement("input");
var t = document.createElement("textarea");

btn.setAttribute("onclick", "send();");
btn.innerText = "Send =>";
input.setAttribute("id", "senddata");
input.setAttribute("placeholder", "chat here");
input.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        send();
    }
});
user.setAttribute("id", "user");
user.setAttribute("placeholder", "username here");
t.setAttribute("rows", "50");
t.setAttribute("cols", "50");
t.setAttribute("id", "log");
t.setAttribute("readonly", "")


document.write("<html><body></body></html>");

document["body"]["appendChild"](user);
document["body"]["appendChild"](input);
document["body"]["appendChild"](btn);
document["body"]["appendChild"](document.createElement("br"));
document["body"]["appendChild"](t);
update();
setInterval(update, 1000); //Constant updating :)
