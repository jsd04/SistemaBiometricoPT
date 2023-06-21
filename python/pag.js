/*
// Obtener elementos HTML necesarios
const openModalBtn = document.getElementById("staticBackdrop");
const modal = document.getElementById("staticBackdrop");
const video = document.getElementById("video");
const captureBtn = document.getElementById("captureBtn");

// Agregar evento al botón para abrir el modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block"; // Mostrar el modal
  navigator.mediaDevices.getUserMedia({ video: true }) // Obtener acceso a la cámara
    .then(stream => {
      video.srcObject = stream; // Asignar el flujo de la cámara al elemento video
      video.play(); // Iniciar la cámara
    })
    .catch(err => {
      console.error("Ocurrió un error al obtener acceso a la cámara:", err);
    });
});

// Agregar evento al botón para capturar la foto
captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas"); // Crear un elemento canvas
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height); // Dibujar la imagen de la cámara en el canvas
  const imgData = canvas.toDataURL("image/png"); // Obtener los datos de la imagen en formato base64
  console.log(imgData); // Mostrar los datos de la imagen en la consola (puedes hacer lo que quieras con ellos)
  modal.style.display = "none"; // Ocultar el modal
  video.pause(); // Detener la cámara
});
*/
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(error);
  });
  const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

captureBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = canvas.toDataURL();
  document.body.appendChild(img);
});
