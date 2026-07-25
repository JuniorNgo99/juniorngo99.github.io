let deg = 0;

function stopAll() {
    document.querySelectorAll("audio").forEach(function (a) {
        a.pause();
        a.currentTime = 0;
    });
}

function spin() {

    let result = Math.floor(Math.random() * 5);

    deg += 360 * 5 + result * 72;

    document.getElementById("wheel").style.transform =
        "rotate(" + deg + "deg)";

    setTimeout(function () {

        stopAll();

        let music = document.getElementById("music" + (result + 1));

        if (music) {
            music.play();
        }

        alert("Bạn trúng Quà " + (result + 1));

    }, 5000);
}