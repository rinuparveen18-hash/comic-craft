```javascript
"use strict";


/*
=========================================================
ComicCraft JavaScript
=========================================================
*/


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCharacterCounters();

        initializeComicForm();

        initializeCopyButton();

        initializePrintButton();

        initializeSmoothScrolling();

        initializeAnimations();

    }
);


/*
=========================================================
Character Counters
=========================================================
*/

function initializeCharacterCounters() {

    const story =
        document.getElementById("story");

    const storyCount =
        document.getElementById("story-count");

    const characters =
        document.getElementById("characters");

    const charactersCount =
        document.getElementById("characters-count");


    if (story && storyCount) {

        updateCharacterCount(
            story,
            storyCount
        );


        story.addEventListener(
            "input",
            function () {

                updateCharacterCount(
                    story,
                    storyCount
                );

            }
        );

    }


    if (
        characters &&
        charactersCount
    ) {

        updateCharacterCount(
            characters,
            charactersCount
        );


        characters.addEventListener(
            "input",
            function () {

                updateCharacterCount(
                    characters,
                    charactersCount
                );

            }
        );

    }

}


function updateCharacterCount(
    input,
    counter
) {

    counter.textContent =
        input.value.length;

}


/*
=========================================================
Comic Form
=========================================================
*/

function initializeComicForm() {

    const form =
        document.getElementById("comic-form");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            const story =
                document
                    .getElementById("story");


            if (!story) {
                return;
            }


            const storyValue =
                story.value.trim();


            if (storyValue.length < 10) {

                event.preventDefault();

                showNotification(
                    "Please provide at least 10 characters for your story.",
                    "error"
                );

                story.focus();

                return;

            }


            showLoadingState();

        }
    );

}


/*
=========================================================
Loading State
=========================================================
*/

function showLoadingState() {

    const loading =
        document.getElementById("loading");

    const button =
        document.getElementById(
            "generate-button"
        );

    const buttonText =
        document.getElementById(
            "button-text"
        );


    if (loading) {

        loading.style.display =
            "flex";

    }


    if (button) {

        button.disabled =
            true;

        button.classList.add(
            "is-loading"
        );

    }


    if (buttonText) {

        buttonText.textContent =
            "Creating Comic...";

    }


    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


/*
=========================================================
Copy Comic
=========================================================
*/

function initializeCopyButton() {

    const copyButton =
        document.getElementById(
            "copy-comic"
        );


    if (!copyButton) {
        return;
    }


    copyButton.addEventListener(
        "click",
        async function () {

            const comic =
                document.getElementById(
                    "comic-content"
                );


            if (!comic) {

                showNotification(
                    "There is no text content to copy.",
                    "error"
                );

                return;

            }


            const text =
                comic.innerText.trim();


            if (!text) {

                showNotification(
                    "There is no comic content to copy.",
                    "error"
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    text
                );


                showNotification(
                    "Comic copied to your clipboard!",
                    "success"
                );


            } catch (error) {

                fallbackCopy(text);

            }

        }
    );

}


/*
=========================================================
Fallback Copy
=========================================================
*/

function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {

        document.execCommand(
            "copy"
        );


        showNotification(
            "Comic copied to your clipboard!",
            "success"
        );


    } catch (error) {

        showNotification(
            "Unable to copy the comic.",
            "error"
        );

    }


    document.body.removeChild(
        textarea
    );

}


/*
=========================================================
Print Comic
=========================================================
*/

function initializePrintButton() {

    const printButton =
        document.getElementById(
            "print-comic"
        );


    if (!printButton) {
        return;
    }


    printButton.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


/*
=========================================================
Smooth Scrolling
=========================================================
*/

function initializeSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}


/*
=========================================================
Animations
=========================================================
*/

function initializeAnimations() {

    const elements =
        document.querySelectorAll(
            ".feature-card, .step, .comic-panel, .info-item"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/*
=========================================================
Notification
=========================================================
*/

function showNotification(
    message,
    type = "info"
) {

    const existing =
        document.getElementById(
            "comiccraft-notification"
        );


    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement(
            "div"
        );


    notification.id =
        "comiccraft-notification";


    notification.className =
        `notification ${type}`;


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(
        function () {

            notification.classList.add(
                "show"
            );

        },
        20
    );


    setTimeout(
        function () {

            notification.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    notification.remove();

                },
                300
            );

        },
        3500
    );

}
```
