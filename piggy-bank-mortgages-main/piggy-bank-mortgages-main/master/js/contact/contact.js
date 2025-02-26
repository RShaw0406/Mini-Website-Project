export const sendForm = () => {
  // Checks whether the form is filled in properly, and displays the correct message
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const failMessage = document.getElementById('failMessage');

  if (contactForm.checkValidity() === false) {
    failMessage.style.display = 'block';
    successMessage.style.display = 'none';
  }
  contactForm.classList.add('was-validated');
  if (contactForm.checkValidity() === true) {
    failMessage.style.display = 'none';
    successMessage.style.display = 'block';
  }
};

export const initMap = () => {
  // Initiates the google map using the coordinates of Belfast
  const belfast = { lat: 54.59655203268345, lng: -5.930042286394907 };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: belfast,
  });
  new google.maps.Marker({
    position: belfast,
    map: map,
    optimized: false,
    url: 'path/img/marker@2x.png',
    size: new google.maps.Size(30, 40),
    scaledSize: new google.maps.Size(30, 40),
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initMap();
});

document.getElementById('submit').addEventListener('click', () => {
  sendForm();
});
