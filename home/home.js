
/* =========================
   SONGS
========================= */

const songs = [

    "song1.mp3",
    "song2.mp3",
    "song3.mp3",
    "song4.mp3",
    "song5.mp3",
    "song6.mp3",
    "song10.mp3",
    "song11.mp3",
    "song12.mp3",
    "song13.mp3",
    "song14.mp3",
    "song15.mp3",
    "song16.mp3",
    "song17.mp3",
    "song18.mp3",
    "song19.mp3",
    "song20.mp3",
    "song21.mp3",
    "song22.mp3",
    "song23.mp3",
    "song24.mp3",
    "song25.mp3",
    "song26.mp3",
    "song27.mp3",
    "song28.mp3",
    "song29.mp3",
    "song30.mp3",
    "song31.mp3",
    "song32.mp3",
    "song33.mp3",
    "song34.mp3",
    "song35.mp3",
    "song36.mp3",
    "song37.mp3",
    "song38.mp3",
    "song39.mp3"

];


/* =========================
   ELEMENTS
========================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playSong");

const previousButton =
    document.getElementById("prevSong");

const nextButton =
    document.getElementById("nextSong");

const shuffleButton =
    document.getElementById("shuffleButton");

const repeatButton =
    document.getElementById("repeatButton");

const progressBar =
    document.getElementById("progressBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const songNumber =
    document.getElementById("songNumber");

const songList =
    document.getElementById("songList");

const volumeBar =
    document.getElementById("volumeBar");

const muteButton =
    document.getElementById("muteButton");


let currentSong = 0;

let isShuffle = false;

let isRepeat = false;

let lastVolume = 0.8;


/* =========================
   LETTER
========================= */

const letterButton =
    document.getElementById("letterButton");

const closeLetter =
    document.getElementById("closeLetter");

const letterModal =
    document.getElementById("letterModal");


letterButton.addEventListener(
    "click",
    function () {

        letterModal.classList.add(
            "show"
        );

    }
);


closeLetter.addEventListener(
    "click",
    function () {

        letterModal.classList.remove(
            "show"
        );

    }
);


letterModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === letterModal
        ) {

            letterModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================
   SECRET
========================= */

const secretButton =
    document.getElementById("secretButton");


secretButton.addEventListener(
    "click",
    createSecretExplosion
);


function createSecretExplosion() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            Math.random() > .25
                ? "♥"
                : "♡";


        heart.style.position =
            "fixed";


        heart.style.left =
            "50%";


        heart.style.top =
            "50%";


        heart.style.zIndex =
            "200";


        heart.style.color =
            "#ff62b1";


        heart.style.fontSize =
            `${12 + Math.random() * 25}px`;


        heart.style.pointerEvents =
            "none";


        heart.style.textShadow =
            "0 0 15px #ff168b";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() *
            400;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [

                {

                    transform:
                        "translate(-50%,-50%) scale(.2)",

                    opacity: 1

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.5)
                        rotate(360deg)`,

                    opacity: 0

                }

            ],

            {

                duration:
                    1100 +
                    Math.random() * 900,

                easing:
                    "cubic-bezier(.1,.7,.2,1)",

                fill:
                    "forwards"

            }

        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => heart.remove(),
            2200
        );

    }

}


/* =========================
   SONG NAME
========================= */

function getSongName(file) {

    return file
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "");

}


/* =========================
   LOAD SONG
========================= */

function loadSong(
    index,
    autoPlay = false
) {

    if (
        songs.length === 0
    ) {

        return;

    }


    currentSong = index;


    audioPlayer.src =
        songs[currentSong];


    audioPlayer.load();


    songTitle.textContent =
        getSongName(
            songs[currentSong]
        );


    songNumber.textContent =
        String(
            currentSong + 1
        ).padStart(
            2,
            "0"
        );


    progressBar.value =
        0;


    currentTimeElement.textContent =
        "0:00";


    durationElement.textContent =
        "0:00";


    updateSongList();


    if (autoPlay) {

        playAudio();

    }

}


/* =========================
   PLAY
========================= */

function playAudio() {

    audioPlayer.play()

        .then(
            function () {

                playButton.textContent =
                    "❚❚";


                document.body.classList.add(
                    "music-playing"
                );

            }
        )

        .catch(
            function (error) {

                console.error(
                    "Audio error:",
                    error
                );

            }
        );

}


/* =========================
   PAUSE
========================= */

function pauseAudio() {

    audioPlayer.pause();


    playButton.textContent =
        "▶";


    document.body.classList.remove(
        "music-playing"
    );

}


/* =========================
   PLAY / PAUSE
========================= */

playButton.addEventListener(
    "click",
    function () {

        if (
            audioPlayer.paused
        ) {

            playAudio();

        } else {

            pauseAudio();

        }

    }
);


/* =========================
   NEXT
========================= */

nextButton.addEventListener(
    "click",
    function () {

        playNextSong();

    }
);


function playNextSong() {


    if (isShuffle) {


        let randomSong;


        do {

            randomSong =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        }

        while (
            randomSong === currentSong &&
            songs.length > 1
        );


        currentSong =
            randomSong;


    } else {


        currentSong++;


        if (
            currentSong >=
            songs.length
        ) {

            currentSong = 0;

        }

    }


    loadSong(
        currentSong,
        true
    );

}


/* =========================
   PREVIOUS
========================= */

previousButton.addEventListener(
    "click",
    function () {


        if (
            audioPlayer.currentTime > 3
        ) {

            audioPlayer.currentTime =
                0;

            return;

        }


        currentSong--;


        if (
            currentSong < 0
        ) {

            currentSong =
                songs.length - 1;

        }


        loadSong(
            currentSong,
            true
        );

    }
);


/* =========================
   SHUFFLE
========================= */

shuffleButton.addEventListener(
    "click",
    function () {


        isShuffle =
            !isShuffle;


        shuffleButton.classList.toggle(
            "active",
            isShuffle
        );

    }
);


/* =========================
   REPEAT
========================= */

repeatButton.addEventListener(
    "click",
    function () {


        isRepeat =
            !isRepeat;


        repeatButton.classList.toggle(
            "active",
            isRepeat
        );

    }
);


/* =========================
   PROGRESS
========================= */

audioPlayer.addEventListener(
    "timeupdate",
    function () {


        if (
            !audioPlayer.duration
        ) {

            return;

        }


        const percent =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        progressBar.value =
            percent;


        currentTimeElement.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


/* =========================
   DURATION
========================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {


        durationElement.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


/* =========================
   SEEK
========================= */

progressBar.addEventListener(
    "input",
    function () {


        if (
            !audioPlayer.duration
        ) {

            return;

        }


        audioPlayer.currentTime =
            (
                progressBar.value /
                100
            ) *
            audioPlayer.duration;

    }
);


/* =========================
   AUTO NEXT / REPEAT
========================= */

audioPlayer.addEventListener(
    "ended",
    function () {


        if (isRepeat) {


            audioPlayer.currentTime =
                0;


            playAudio();


            return;

        }


        playNextSong();

    }
);


/* =========================
   VOLUME
========================= */

audioPlayer.volume =
    0.8;


volumeBar.value =
    0.8;


volumeBar.addEventListener(
    "input",
    function () {


        const volume =
            Number(
                volumeBar.value
            );


        audioPlayer.volume =
            volume;


        if (
            volume > 0
        ) {


            lastVolume =
                volume;


            muteButton.textContent =
                "🔊";


        } else {


            muteButton.textContent =
                "🔇";

        }

    }
);


/* =========================
   MUTE
========================= */

muteButton.addEventListener(
    "click",
    function () {


        if (
            audioPlayer.volume > 0
        ) {


            lastVolume =
                audioPlayer.volume;


            audioPlayer.volume =
                0;


            volumeBar.value =
                0;


            muteButton.textContent =
                "🔇";


        } else {


            audioPlayer.volume =
                lastVolume || .8;


            volumeBar.value =
                audioPlayer.volume;


            muteButton.textContent =
                "🔊";

        }

    }
);


/* =========================
   SONG LIST
========================= */

function createSongList() {


    songList.innerHTML =
        "";


    songs.forEach(
        function (
            song,
            index
        ) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item";


            item.innerHTML = `

                <span>

                    <span
                        class="song-item-number"
                    >
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    ${getSongName(song)}

                </span>

                <span>
                    ♫
                </span>

            `;


            item.addEventListener(
                "click",
                function () {


                    loadSong(
                        index,
                        true
                    );

                }
            );


            songList.appendChild(
                item
            );

        }
    );

}


/* =========================
   UPDATE LIST
========================= */

function updateSongList() {


    const items =
        document.querySelectorAll(
            ".song-item"
        );


    items.forEach(
        function (
            item,
            index
        ) {


            item.classList.toggle(
                "active",
                index === currentSong
            );

        }
    );

}


/* =========================
   FORMAT TIME
========================= */

function formatTime(
    seconds
) {


    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsPart =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            secondsPart
        ).padStart(
            2,
            "0"
        )
    );

}


/* =========================
   STORY COUNTER
========================= */

const startDate =
    new Date(
        "2026-08-24T00:00:00"
    );


function updateStoryCounter() {


    const now =
        new Date();


    let difference =
        now.getTime() -
        startDate.getTime();


    if (
        difference < 0
    ) {

        difference = 0;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (
                totalSeconds % 86400
            ) / 3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds % 3600
            ) / 60
        );


    const seconds =
        totalSeconds % 60;


    document.getElementById(
        "days"
    ).textContent =
        String(
            days
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).textContent =
        String(
            hours
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(
            minutes
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(
            seconds
        ).padStart(
            2,
            "0"
        );

}


updateStoryCounter();


setInterval(
    updateStoryCounter,
    1000
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.code === "Space"
        ) {


            const tag =
                document.activeElement.tagName;


            if (
                tag !== "INPUT" &&
                tag !== "BUTTON"
            ) {


                event.preventDefault();


                if (
                    audioPlayer.paused
                ) {

                    playAudio();

                } else {

                    pauseAudio();

                }

            }

        }


        if (
            event.code ===
            "ArrowRight"
        ) {

            playNextSong();

        }


        if (
            event.code ===
            "ArrowLeft"
        ) {

            previousButton.click();

        }

    }
);


/* =========================
   START
========================= */

createSongList();


loadSong(
    0,
    false
);

/* =========================
   MEMORIES
========================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


const memoryModal =
    document.getElementById(
        "memoryModal"
    );


const memoryModalTitle =
    document.getElementById(
        "memoryModalTitle"
    );


const memoryModalText =
    document.getElementById(
        "memoryModalText"
    );


const closeMemory =
    document.getElementById(
        "closeMemory"
    );


/* =========================
   SCROLL REVEAL
========================= */

const memoryObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        memoryObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


memoryCards.forEach(
    function (card) {

        memoryObserver.observe(
            card
        );

    }
);


/* =========================
   OPEN MEMORY
========================= */

document
    .querySelectorAll(
        ".memory-open"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const title =
                        button.dataset.title;

                    const text =
                        button.dataset.text;


                    memoryModalTitle.textContent =
                        title;

                    memoryModalText.textContent =
                        text;


                    memoryModal.classList.add(
                        "show"
                    );

                }
            );

        }
    );


/* =========================
   CLOSE MEMORY
========================= */

closeMemory.addEventListener(
    "click",
    function () {

        memoryModal.classList.remove(
            "show"
        );

    }
);


memoryModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === memoryModal
        ) {

            memoryModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================
   ESC CLOSE
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            memoryModal.classList.remove(
                "show"
            );

        }

    }
);
