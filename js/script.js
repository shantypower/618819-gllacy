function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(59.938143, 30.327466)
  }
  var map = new google.maps.Map(document.getElementById("map__canvas"),
                                mapOptions);
  var image = "img/pin.svg";
  var myLatLng = new google.maps.LatLng(59.938625, 30.322938);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
google.maps.event.addDomListener(window, "load", initialize);


  var link = document.querySelector(".map__btn");
  var popup = document.querySelector(".feedback");
  var overlay = document.querySelector(".feedback__overlay");
  var close = popup.querySelector(".feedback--close");
  var form = popup.querySelector("form");
  var login = popup.querySelector("[name=user]");
  var email = popup.querySelector("[name=email]");
  var message = popup.querySelector("[name=text]");

  var isStorageSupport = true;
  var storage = "";
  
  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    overlay.classList.add("overlay-show");

    if (storage) {
      login.value = storage;
      email.focus();
    } else {
      login.focus();
    }
  });

  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    overlay.classList.remove("overlay-show");
  });

  form.addEventListener("submit", function (evt) {
    if (!login.value || !email.value || !message.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
      console.log("Необходимо заполнить все поля!");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("login", login.value);
      }
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
        popup.classList.remove("overlay-show");
      }
    }
  });

  overlay.addEventListener("click", function() {
    if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
        overlay.classList.remove("overlay-show");
    }
  });