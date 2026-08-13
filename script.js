/* ==================================================
   VÒNG QUAY MAY MẮN
================================================== */


/* ==================================================
   LẤY ELEMENT
================================================== */

const canvas = document.getElementById("wheel");

const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spin");

const resultText = document.getElementById("result");


/* ==================================================
   KIỂM TRA ELEMENT
================================================== */

if (!canvas) {
    console.error("Không tìm thấy canvas #wheel");
}

if (!spinButton) {
    console.error("Không tìm thấy nút #spin");
}

if (!resultText) {
    console.error("Không tìm thấy #result");
}


/* ==================================================
   PHẦN THƯỞNG
================================================== */

const prizes = [

    "🎵 NHẠC 1",

    "🎵 NHẠC 2",

    "🎵 NHẠC 3",

    "🎵 NHẠC 4",

    "🎵 NHẠC 5",

    "🎵 NHẠC 6"

];


/* ==================================================
   MÀU SẮC
================================================== */

const colors = [

    "#ff4757",

    "#ffa502",

    "#2ed573",

    "#1e90ff",

    "#9b59b6",

    "#00cec9"

];


/* ==================================================
   THÔNG SỐ
================================================== */

const total = prizes.length;

const slice = (Math.PI * 2) / total;


/* ==================================================
   BIẾN VÒNG QUAY
================================================== */

let rotation = 0;

let spinning = false;


/* ==================================================
   VẼ VÒNG QUAY
================================================== */

function drawWheel() {

    const center = canvas.width / 2;

    const radius = center - 5;


    /* Xóa canvas */

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* ==================================================
       VẼ 6 Ô
    ================================================== */

    for (
        let i = 0;
        i < total;
        i++
    ) {

        const startAngle =
            rotation + i * slice;

        const endAngle =
            startAngle + slice;


        /* ----------------------------------------------
           Ô MÀU
        ---------------------------------------------- */

        ctx.beginPath();

        ctx.moveTo(
            center,
            center
        );

        ctx.arc(
            center,
            center,
            radius,
            startAngle,
            endAngle
        );

        ctx.closePath();


        ctx.fillStyle =
            colors[i % colors.length];

        ctx.fill();


        /* ----------------------------------------------
           VIỀN
        ---------------------------------------------- */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth =
            6;

        ctx.stroke();


        /* ----------------------------------------------
           CHỮ
        ---------------------------------------------- */

        ctx.save();


        ctx.translate(
            center,
            center
        );


        ctx.rotate(
            startAngle + slice / 2
        );


        ctx.textAlign =
            "right";

        ctx.textBaseline =
            "middle";


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "bold 25px Arial";


        ctx.shadowColor =
            "rgba(0, 0, 0, 0.35)";

        ctx.shadowBlur =
            5;


        ctx.fillText(
            prizes[i],
            radius - 35,
            0
        );


        ctx.restore();

    }


    /* ==================================================
       VÒNG TRÒN Ở GIỮA
    ================================================== */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        65,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.fill();


    ctx.strokeStyle =
        "#ff9800";

    ctx.lineWidth =
        8;

    ctx.stroke();


    /* ==================================================
       CHỮ QUAY
    ================================================== */

    ctx.fillStyle =
        "#ff5722";

    ctx.font =
        "bold 21px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.shadowColor =
        "transparent";

    ctx.shadowBlur =
        0;


    ctx.fillText(
        "QUAY",
        center,
        center
    );

}


/* ==================================================
   VẼ LẦN ĐẦU
================================================== */

drawWheel();


/* ==================================================
   DỪNG TẤT CẢ NHẠC
================================================== */

function stopAllMusic() {

    const audios =
        document.querySelectorAll("audio");


    audios.forEach(
        function(audio) {

            audio.pause();

            audio.currentTime = 0;

        }
    );

}


/* ==================================================
   KIỂM TRA FILE NHẠC
================================================== */

function checkMusic(index) {

    const music =
        document.getElementById(
            "music" + (index + 1)
        );


    if (!music) {

        console.error(
            "Không tìm thấy phần tử music" +
            (index + 1)
        );

        return null;

    }


    return music;

}


/* ==================================================
   PHÁT NHẠC
================================================== */

function playMusic(index) {

    /* Dừng bài cũ */

    stopAllMusic();


    /* Lấy bài nhạc */

    const music =
        checkMusic(index);


    if (!music) {

        return;

    }


    /* Đưa về đầu bài */

    music.currentTime = 0;


    /* Kiểm tra source */

    console.log(
        "Đang chuẩn bị phát:",
        music.id
    );

    console.log(
        "Nguồn nhạc:",
        music.currentSrc || music.src
    );


    /* ==================================================
       KIỂM TRA TRÌNH DUYỆT CÓ HỖ TRỢ AUDIO KHÔNG
    ================================================== */

    if (
        music.readyState === 0
    ) {

        console.warn(
            "File nhạc chưa được tải."
        );

    }


    /* ==================================================
       PHÁT
    ================================================== */

    const playPromise =
        music.play();


    if (
        playPromise !== undefined
    ) {

        playPromise

            .then(
                function() {

                    console.log(
                        "Đang phát:",
                        music.id
                    );

                }
            )

            .catch(
                function(error) {

                    console.error(
                        "Không thể phát nhạc:",
                        error
                    );


                    console.error(
                        "File đang sử dụng:",
                        music.currentSrc || music.src
                    );


                    if (
                        error.name ===
                        "NotSupportedError"
                    ) {

                        resultText.innerHTML =
                            "⚠️ Không đọc được file nhạc " +
                            (index + 1) +
                            ".mp3";

                    }

                }
            );

    }

}


/* ==================================================
   KIỂM TRA LỖI AUDIO
================================================== */

document
    .querySelectorAll("audio")
    .forEach(
        function(audio) {

            audio.addEventListener(
                "error",
                function() {

                    console.error(
                        "Lỗi file âm thanh:",
                        audio.id,
                        audio.src
                    );

                }
            );

        }
    );


/* ==================================================
   QUAY VÒNG QUAY
================================================== */

spinButton.addEventListener(
    "click",
    function() {


        /* ----------------------------------------------
           Không cho quay liên tục
        ---------------------------------------------- */

        if (spinning) {

            return;

        }


        /* ----------------------------------------------
           Bắt đầu
        ---------------------------------------------- */

        spinning = true;

        spinButton.disabled = true;


        resultText.innerHTML =
            "🎡 Đang quay...";


        /* ----------------------------------------------
           Chọn người thắng
        ---------------------------------------------- */

        const winner =
            Math.floor(
                Math.random() * total
            );


        console.log(
            "Winner:",
            winner + 1
        );


        /* ----------------------------------------------
           Số vòng quay
        ---------------------------------------------- */

        const rounds = 6;


        /* ----------------------------------------------
           Mũi tên ở phía trên
           
           -90 độ
        ---------------------------------------------- */

        const targetAngle =
            -Math.PI / 2
            -
            (
                winner * slice
                +
                slice / 2
            );


        /* ----------------------------------------------
           Tính khoảng cách
        ---------------------------------------------- */

        let difference =
            targetAngle - rotation;


        while (
            difference < 0
        ) {

            difference +=
                Math.PI * 2;

        }


        /* ----------------------------------------------
           Góc bắt đầu
        ---------------------------------------------- */

        const startRotation =
            rotation;


        /* ----------------------------------------------
           Góc kết thúc
        ---------------------------------------------- */

        const finalRotation =
            rotation
            +
            rounds * Math.PI * 2
            +
            difference;


        /* ----------------------------------------------
           Thời gian quay
        ---------------------------------------------- */

        const duration =
            5000;


        const startTime =
            performance.now();


        /* ==================================================
           ANIMATION
        ================================================== */

        function animate(currentTime) {

            const elapsed =
                currentTime - startTime;


            let progress =
                elapsed / duration;


            /* ------------------------------------------
               Giới hạn progress
            ------------------------------------------ */

            if (
                progress >= 1
            ) {

                progress = 1;

            }


            /* ------------------------------------------
               Hiệu ứng chậm dần
            ------------------------------------------ */

            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    4
                );


            /* ------------------------------------------
               Cập nhật rotation
            ------------------------------------------ */

            rotation =
                startRotation
                +
                (
                    finalRotation -
                    startRotation
                )
                *
                ease;


            /* ------------------------------------------
               Vẽ lại
            ------------------------------------------ */

            drawWheel();


            /* ------------------------------------------
               Tiếp tục animation
            ------------------------------------------ */

            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    animate
                );

            }


            /* ------------------------------------------
               KẾT THÚC
            ------------------------------------------ */

            else {

                rotation =
                    finalRotation;


                drawWheel();


                /* --------------------------------------
                   Hiển thị kết quả
                -------------------------------------- */

                resultText.innerHTML =
                    "🎉 Bạn trúng: "
                    +
                    "<strong>"
                    +
                    prizes[winner]
                    +
                    "</strong>";


                /* --------------------------------------
                   Phát nhạc
                -------------------------------------- */

                playMusic(
                    winner
                );


                /* --------------------------------------
                   Cho quay lại
                -------------------------------------- */

                spinning = false;

                spinButton.disabled =
                    false;

            }

        }


        /* Bắt đầu animation */

        requestAnimationFrame(
            animate
        );

    }
);