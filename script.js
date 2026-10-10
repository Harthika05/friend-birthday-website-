// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
  "https://szfgyxmyjxjuweznseos.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_jkw8t5tTB8WZpcfggZwN1A_thEHJ49Q";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


// ==========================================
// PAGE NAVIGATION
// ==========================================

function nextPage(pageNumber) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(function(page) {
    page.classList.remove("active-page");
  });

  const next =
    document.getElementById("page" + pageNumber);

  if (next) {
    next.classList.add("active-page");
  }

  createConfetti();

  // Load photos when photo page opens
  if (pageNumber === 8) {
    loadPhotos();
  }

  // Load song when song page opens
  if (pageNumber === 9) {
    loadSong();
  }
}


// ==========================================
// BLOW CANDLE
// ==========================================

function blowCandle() {

  const flame =
    document.getElementById("flame");

  if (flame) {
    flame.style.display = "none";
  }

  const blowArea =
    document.getElementById("blowArea");

  if (blowArea) {
    blowArea.style.display = "none";
  }

  const cutArea =
    document.getElementById("cutArea");

  if (cutArea) {
    cutArea.classList.remove("hidden");
  }

  createConfetti();
}


// ==========================================
// CUT CAKE
// ==========================================

function cutCake() {

  createConfetti();

  setTimeout(function() {
    nextPage(5);
  }, 1000);

}


// ==========================================
// SONG
// ==========================================

// ==========================================
// PASTE YOUR SONG URL HERE
// ==========================================

const birthdaySongURL =
  "https://szfgyxmyjxjuweznseos.supabase.co/storage/v1/object/public/birthday-song/All%20Time%20Anba%20Irukum.mp3";

const birthdaySongName =
  "Our Special Birthday Song ❤️";


// ==========================================
// SONG ELEMENTS
// ==========================================

const songName =
  document.getElementById("songName");

const audioPlayer =
  document.getElementById("audioPlayer");


// ==========================================
// LOAD BIRTHDAY SONG
// ==========================================

function loadSong() {

  if (!audioPlayer) {
    return;
  }

  if (
    !birthdaySongURL ||
    birthdaySongURL ===
    "PASTE_YOUR_SONG_URL_HERE"
  ) {

    if (songName) {
      songName.textContent =
        "🎵 Song URL not added yet ❤️";
    }

    return;
  }

  audioPlayer.src =
    birthdaySongURL;

  audioPlayer.load();

  if (songName) {

    songName.textContent =
      "🎵 " +
      birthdaySongName +
      " ❤️";

  }

}


// ==========================================
// PHOTO GALLERY
// ==========================================

const photoGallery =
  document.getElementById("photoGallery");


// ==========================================
// LOAD PHOTOS FROM SUPABASE
// ==========================================

async function loadPhotos() {

  if (!photoGallery) {
    return;
  }

  photoGallery.innerHTML =
    "<p>📸 Loading memories... ❤️</p>";

  try {

    const { data, error } =
      await supabaseClient
        .storage
        .from("birthday-photos")
        .list("", {
          limit: 100,
          sortBy: {
            column: "created_at",
            order: "asc"
          }
        });


    if (error) {

      console.error(
        "Photo loading error:",
        error
      );

      photoGallery.innerHTML =
        "<p>❌ Unable to load photos.</p>";

      return;
    }


    photoGallery.innerHTML = "";


    if (
      !data ||
      data.length === 0
    ) {

      photoGallery.innerHTML =
        "<p>📷 No photos uploaded yet.</p>";

      return;
    }


    data.forEach(function(file) {

      if (!file.name) {
        return;
      }


      const { data: publicData } =
        supabaseClient
          .storage
          .from("birthday-photos")
          .getPublicUrl(file.name);


      const image =
        document.createElement("img");


      image.src =
        publicData.publicUrl;

      image.className =
        "gallery-image";

      image.loading =
        "lazy";

      image.alt =
        "Birthday Memory";


      image.onclick =
        function() {

          openLightbox(
            publicData.publicUrl
          );

        };


      photoGallery.appendChild(
        image
      );

    });


  } catch (error) {

    console.error(
      "Photo loading failed:",
      error
    );

    photoGallery.innerHTML =
      "<p>❌ Unable to load photos.</p>";

  }

}


// ==========================================
// LIGHTBOX
// ==========================================

function openLightbox(imageSrc) {

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");


  if (
    lightbox &&
    lightboxImage
  ) {

    lightboxImage.src =
      imageSrc;

    lightbox.style.display =
      "flex";

  }

}


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

  const lightbox =
    document.getElementById("lightbox");

  if (lightbox) {

    lightbox.style.display =
      "none";

  }

}


// ==========================================
// CLOSE BUTTON
// ==========================================

const closeLightboxButton =
  document.getElementById(
    "closeLightbox"
  );


if (closeLightboxButton) {

  closeLightboxButton.addEventListener(
    "click",
    closeLightbox
  );

}


// ==========================================
// CLOSE LIGHTBOX BY CLICKING OUTSIDE
// ==========================================

const lightbox =
  document.getElementById(
    "lightbox"
  );


if (lightbox) {

  lightbox.addEventListener(
    "click",
    function(event) {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );

}


// ==========================================
// CONFETTI
// ==========================================

function createConfetti() {

  for (
    let i = 0;
    i < 30;
    i++
  ) {

    const confetti =
      document.createElement("div");

    confetti.innerHTML =
      "🎉";

    confetti.style.position =
      "fixed";

    confetti.style.left =
      Math.random() * 100 + "vw";

    confetti.style.top =
      "-30px";

    confetti.style.fontSize =
      (
        15 +
        Math.random() * 20
      ) + "px";

    confetti.style.zIndex =
      "9999";

    confetti.style.pointerEvents =
      "none";

    confetti.style.animation =
      "fall " +
      (
        2 +
        Math.random() * 3
      ) +
      "s linear forwards";


    document.body.appendChild(
      confetti
    );


    setTimeout(
      function() {

        confetti.remove();

      },
      5000
    );

  }

}


// ==========================================
// FLOATING HEARTS
// ==========================================

function createHeart() {

  const heart =
    document.createElement("div");

  heart.innerHTML =
    "❤️";

  heart.style.position =
    "fixed";

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.bottom =
    "-30px";

  heart.style.fontSize =
    (
      15 +
      Math.random() * 20
    ) + "px";

  heart.style.zIndex =
    "999";

  heart.style.pointerEvents =
    "none";

  heart.style.animation =
    "heartFloat 5s linear forwards";


  document.body.appendChild(
    heart
  );


  setTimeout(
    function() {

      heart.remove();

    },
    5000
  );

}


// ==========================================
// CREATE HEART EVERY 1.2 SECONDS
// ==========================================

setInterval(
  createHeart,
  1200
);


// ==========================================
// PAGE LOAD
// ==========================================

console.log(
  "🎂 Birthday Website Loaded Successfully ❤️"
);