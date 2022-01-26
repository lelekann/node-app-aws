const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async event => {
    event.preventDefault();
    const file = imageInput.files[0]

    const {url} = await fetch("/s3Url").then(res => res.json())

    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split('?')[0]
    console.log(imageUrl)

    const img = document.createElement('img')
    img.src = imageUrl;
    img.width=300;
    img.height=300;
    img.style="margin: 10px"
    document.body.appendChild(img)
})