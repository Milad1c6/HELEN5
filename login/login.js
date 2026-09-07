const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    // هر چیزی وارد شود قبول می‌شود
    if (username === "" || password === "") {
        return;
    }

    // ذخیره اسم
    localStorage.setItem(
        "loveUsername",
        username
    );

    // رفتن به انفجار
    window.location.href =
        "../explosion/explosion.html";

});
