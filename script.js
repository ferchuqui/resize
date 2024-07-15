document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const files = event.target.files;
    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous output

    Array.from(files).forEach((file) => {
      if (file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const newWidth = 800;
            const newHeight = 600;
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob(function (blob) {
              const newFile = new File([blob], `img_${file.name}`, {
                type: "image/jpeg",
              });
              displayImage(newFile);
              createDownloadLink(newFile, blob);
            }, "image/jpeg");
          };
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a JPG file.");
      }
    });
  });

function displayImage(file) {
  const preview = document.getElementById("preview");
  const reader = new FileReader();
  reader.onload = function (e) {
    const imgElement = document.createElement("img");
    imgElement.src = e.target.result;
    preview.appendChild(imgElement);
  };
  reader.readAsDataURL(file);
}

function createDownloadLink(file, blob) {
  const output = document.getElementById("output");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = file.name;
  link.textContent = `Download ${file.name}`;
  link.style.display = "block";
  link.style.marginTop = "10px";
  output.appendChild(link);
}

// Añadir el evento al botón de reset
document.getElementById("resetButton").addEventListener("click", function () {
  window.location.reload();
});
