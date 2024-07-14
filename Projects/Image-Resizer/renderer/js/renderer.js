const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

console.log("versions = ", Toastify.toast());

function loadImage(e) {
    const file = e.target?.files[0]

    if (!isFileImage(file)) {
        console.log("Please select an image");
        alertError("Please select an image")
        return
    }
    //get original dimentions
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = function () {
        widthInput.value = this.width;
        heightInput.value = this.height;
    }

    form.style.display = "block";
    filename.innerText = file.name;
    console.log("Success");
    outputPath.innerText = path.join(os.homedir(), 'imageresizer')
}

//send image data to main
function sendImage(e) {
    e.preventDefault()

    const width = widthInput.value
    const height = heightInput.value
    const imagePath = img.files[0].path

    if (!img.files[0]) {
        alertError("please Upload and Image")
        return;
    }

    if (width === "" || height === "") {
        return alertError("Please fill in height and width")
    }

    //send to main using ipcRenderer
    ipcRenderer.send('image:resize', {
        imagePath,
        width,
        height
    })
}

// catch the image done event
ipcRenderer.on('image:done', () => {
    alertSuccess(`Image resize to ${widthInput.value} x ${heightInput.value}`)
})

// make sure file is imaage 
function isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg']
    return file && acceptedImageTypes.includes(file['type'])
}

function alertError(message) {
    Toastify.toast({
        text: message,
        duration: 3000,
        close: false,
        style: {
            background: "red",
            color: "white",
            textAlign: 'center'
        }
    })
}

function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 3000,
        close: false,
        style: {
            background: "green",
            color: "white",
            textAlign: 'center'
        }
    })
}

img.addEventListener("change", loadImage)
form.addEventListener("submit", sendImage)