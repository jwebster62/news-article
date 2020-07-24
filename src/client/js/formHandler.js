const headResult = document.querySelector("#results-heading");
const contRes = document.querySelector("#results");

export const handleSubmit = (url, loadingBtn, header = headResult, container = contRes) => {
    return fetch("/sentiment", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })
        .then(res => res.json())
        .then(({ polarity, subjectivity, text }) => {
            const polElem = document.createElement("p");
            const subjElem = document.createElement("p");

            polElem.textContent = `Polarity: ${polarity}`;
            subjElem.textContent = `Subjectivity: ${subjectivity}`;

            header.textContent = "Form Results:";
            container.innerHTML = `<p>${text}</p>`;

            container.insertAdjacentElement("afterbegin", subjElem);
            container.insertAdjacentElement("afterbegin", polElem);

            loadingBtn.value = "submit";
        })
        .catch(e => console.error(e));
};