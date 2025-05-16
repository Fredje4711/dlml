// strTxtMnu array blijft ongewijzigd, zorg dat het overeenkomt met je menu-items
strTxtMnu = new Array();
strTxtMnu[0] = "Home";
strTxtMnu[1] = "Infosessies";
strTxtMnu[2] = "Cultuur/ontspanning";
// strTxtMnu[3] was "Inschrijven activiteiten"; - Zorg dat de indexen kloppen als dit item er niet meer is
strTxtMnu[3] = "Foto's vorige activiteiten"; // Index aangepast als [3] vervalt
strTxtMnu[4] = "Fotogalerij";             // Nieuwe index
strTxtMnu[5] = "Podcast Eddy";             // Nieuwe index
strTxtMnu[6] = "Q&A 100";                  // Nieuwe index
strTxtMnu[7] = "Video's";                  // Index aangepast
strTxtMnu[8] = "Info";                     // Index aangepast
strTxtMnu[9] = "Download's";               // Index aangepast
strTxtMnu[10] = "Contact";                 // Index aangepast
// strTxtMnu[11] voor mode switch

$(document).ready(function (e) {
  var pgNr = 'A'; // Default pagina
  var lightMode = true;

  // Functie om de actieve pagina in te stellen en de URL bij te werken
  function setPageAndURL(newPgNr, newMnuText) {
    pgNr = newPgNr;
    $('#actieveMnu').html(newMnuText);
    $.fn.setPg(); // Functie die de content div toont/verbergt

    let pageName = newMnuText.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Alleen de hash veranderen om geen volledige pageload te triggeren met GitHub Pages
    // En om te voorkomen dat de basis-URL van GitHub Pages verandert
    if (pageName === "home") { // Specifiek voor home om geen lelijke hash te hebben
        history.pushState({page: pageName}, newMnuText, window.location.pathname);
    } else {
        history.pushState({page: pageName}, newMnuText, '#' + pageName);
    }
  }

  // Terug/Vooruit knop browser afhandelen
  $(window).on('popstate', function(event) {
    if (event.originalEvent.state && event.originalEvent.state.page) {
        // Vind het menu-item dat overeenkomt met de state.page
        let targetPg = '';
        let targetMnuText = '';
        $('div[id^="MnuItm1"]').each(function() {
            let labelText = $("label", this).text().trim().toLowerCase()
                             .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                             .replace(/[^a-z0-9]+/g, '-')
                             .replace(/(^-|-$)/g, '');
            if (labelText === event.originalEvent.state.page || (event.originalEvent.state.page === "home" && $(this).attr('id').slice(-1) === 'A')) {
                targetPg = $(this).attr('id').slice(-1);
                targetMnuText = $("label", this).html(); // Behoud (nieuw) indicators
                return false; // Stop .each loop
            }
        });
        if (targetPg) {
            pgNr = targetPg;
            $('#actieveMnu').html(targetMnuText);
            $.fn.setPg();
        }
    } else {
        // Fallback naar home als er geen state is (bijv. eerste laad via hash)
        let hash = window.location.hash.substring(1);
        if (!hash) hash = "home"; // Default naar home als er geen hash is

         $('div[id^="MnuItm1"]').each(function() {
            let labelText = $("label", this).text().trim().toLowerCase()
                             .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                             .replace(/[^a-z0-9]+/g, '-')
                             .replace(/(^-|-$)/g, '');
            if (labelText === hash || (hash === "home" && $(this).attr('id').slice(-1) === 'A')) {
                pgNr = $(this).attr('id').slice(-1);
                $('#actieveMnu').html($("label", this).html());
                $.fn.setPg();
                return false;
            }
        });
    }
  });


  // Functie om de juiste pagina te tonen op basis van URL bij eerste laad
  function loadPageFromURL() {
    let hash = window.location.hash.substring(1);
    let initialPg = 'A'; // Default naar Home
    let initialMnuText = 'Home';

    if (hash) {
        $('div[id^="MnuItm1"]').each(function() {
            let labelText = $("label", this).text().trim().toLowerCase()
                             .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                             .replace(/[^a-z0-9]+/g, '-')
                             .replace(/(^-|-$)/g, '');
            if (labelText === hash) {
                initialPg = $(this).attr('id').slice(-1);
                initialMnuText = $("label", this).html();
                return false; // Stop .each loop
            }
        });
    }
    pgNr = initialPg;
    $('#actieveMnu').html(initialMnuText);
    $.fn.setPg();
  }


  $(window).resize(function () {});

  $('#wrapper').on('click', function (e) {
    if ($('#Mnu2').css('display') == 'block') {
      $('#Mnu2').height(0);
      setTimeout(function () {
        $('#Mnu2').css('display', 'none');
      }, 1200);
    }
  });

  $.fn.setMode = function (e) {
    lightMode = !lightMode;
    if (lightMode) {
      $('html').css('--pgBackColor', '#ffffff');
      $('html').css('--pgColor', '#333');
      // ... (andere light mode stijlen) ...
      $('html').css('--linkColor', '#0000ff');
      $('#imgHasselt').attr('src', 'site/image/Herkenrode.png'); // Aangepast pad als nodig
      $('.LogoSize1, .LogoSize2').attr('src', function(i, oldSrc) {
          return oldSrc.replace('LogoDLzw.png', 'LogoDLwt.png');
      });
    } else {
      $('html').css('--pgBackColor', '#333');
      $('html').css('--pgColor', '#ffff');
      // ... (andere dark mode stijlen) ...
      $('html').css('--linkColor', '#8080ff');
      $('#imgHasselt').attr('src', 'site/image/HerkenrodeLight.png'); // Voorbeeld, pas aan indien nodig
       $('.LogoSize1, .LogoSize2').attr('src', function(i, oldSrc) {
          return oldSrc.replace('LogoDLwt.png', 'LogoDLzw.png');
      });
    }
  };

  // Universele menu klik handler
  $('div[id^="MnuItm"]').on('click', function (e) {
    e.stopPropagation(); // Voorkom dat wrapper klik ook Mnu2 sluit
    let newPgIdSuffix = $(this).attr('id').slice(-1); // K, L, M, E, F, G, H, I, A, B, C, D
    let menuText = $("label", this).html(); // Krijg HTML om (nieuw) te behouden

    if (newPgIdSuffix == 'I') { // Mode switch
      $.fn.setMode();
    } else {
      setPageAndURL(newPgIdSuffix, menuText);
    }

    // Sluit Mnu2 als het open is (voor mobiele weergave)
    if ($('#Mnu2').css('display') == 'block') {
        $('#Mnu2').height(0);
        setTimeout(function () {
            $('#Mnu2').css('display', 'none');
        }, 1200);
    }
  });


  $.fn.setPg = function () {
    // Stop alle video's op pagina E als we weggaan
    if (pgNr !== 'E') {
        $('#pgE iframe').each(function() {
            // YouTube API gebruiken om video te stoppen
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        });
    }
    // Stop alle iframes op K, L, M als we weggaan (aangenomen dat dit ook video/audio kan zijn)
    if (pgNr !== 'K') $('#pgK iframe').attr('src', $('#pgK iframe').attr('src'));
    if (pgNr !== 'L') $('#pgL iframe').attr('src', $('#pgL iframe').attr('src'));
    if (pgNr !== 'M') $('#pgM iframe').attr('src', $('#pgM iframe').attr('src'));


    $('.pgContent').css('display', 'none');
    $('#pg' + pgNr).css('display', 'block').scrollTop(0); // Scroll naar bovenkant van nieuwe pagina

    // Update menu highlighting
    $('div[id^="MnuItm1"]').css({'color': 'var(--Mnu1Color)', 'font-weight': 'normal'});
    $('#MnuItm1' + pgNr).css({'color': 'var(--Mnu1SelColor)', 'font-weight': 'bold'});
    $('div[id^="MnuItm2"]').css({'color': 'var(--Mnu2Color)', 'font-weight': 'normal'});
    $('#MnuItm2' + pgNr).css({'color': 'var(--Mnu2SelColor)', 'font-weight': 'bold'});
  };


  $('#btnMnu').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('#Mnu2').css('display') == 'block') {
      $('#Mnu2').height(0);
      setTimeout(function () {
        $('#Mnu2').css('display', 'none');
      }, 1200);
    } else {
      $('#Mnu2').css('display', 'block');
      // Hoogte dynamisch instellen op basis van content van #MnuLst2
      // Zorg ervoor dat #MnuLst2 zichtbaar is om de hoogte correct te meten
      var actualHeight = 0;
      $('#MnuLst2 > div').each(function(){
          actualHeight += $(this).outerHeight(true); // Inclusief margin
      });
      // Voeg eventuele padding/border van MnuFrame2 toe als dat nodig is
      actualHeight += parseFloat($('#MnuFrame2').css('padding-top')) + parseFloat($('#MnuFrame2').css('padding-bottom'));

      $('#Mnu2').height(Math.min(actualHeight, parseFloat($('#Mnu2').css('max-height'))));
    }
  });

  loadPageFromURL(); // Laad de juiste pagina op basis van de URL hash bij het starten

  // --- ALGEMENE LIGHTBOX FUNCTIONALITEIT ---
  var lightboxImages = [];
  var currentImageIndex = 0;
  var $lightbox = $('#imageLightbox');
  var $lightboxImage = $('.lightbox-image-display');
  var $prevButton = $('.lightbox-prev-btn');
  var $nextButton = $('.lightbox-next-btn');

  // Klik op een afbeelding binnen een .fotoGroup op pagina #pgD
  $('#pgD').on('click', '.fotoGroup .fotoImg', function(e) {
      e.preventDefault();
      var $currentGallery = $(this).closest('.activity-gallery-wrapper');
      lightboxImages = [];
      $currentGallery.find('.fotoImg').each(function() {
          lightboxImages.push($(this).attr('src'));
      });
      currentImageIndex = lightboxImages.indexOf($(this).attr('src'));
      if (currentImageIndex !== -1) {
          openLightbox(currentImageIndex);
      }
  });

  function openLightbox(index) {
      currentImageIndex = index;
      $lightboxImage.attr('src', lightboxImages[currentImageIndex]);
      // Gebruik addClass/removeClass om de CSS transitie te triggeren als die er is
      $lightbox.removeClass('lightbox-overlay-hidden').addClass('lightbox-overlay-visible');
      $('body').css('overflow', 'hidden');
      updateNavButtons();
  }

  function closeLightbox() {
      $lightbox.removeClass('lightbox-overlay-visible').addClass('lightbox-overlay-hidden');
      $('body').css('overflow', 'auto');
  }

  function showPrevImage() {
      if (currentImageIndex > 0) {
          currentImageIndex--;
          $lightboxImage.attr('src', lightboxImages[currentImageIndex]);
          updateNavButtons();
      }
  }

  function showNextImage() {
      if (currentImageIndex < lightboxImages.length - 1) {
          currentImageIndex++;
          $lightboxImage.attr('src', lightboxImages[currentImageIndex]);
          updateNavButtons();
      }
  }

  function updateNavButtons() {
      if (lightboxImages.length <= 1) {
          $prevButton.hide();
          $nextButton.hide();
      } else {
          $prevButton.toggle(currentImageIndex > 0);
          $nextButton.toggle(currentImageIndex < lightboxImages.length - 1);
      }
  }

  $('.lightbox-close-btn').on('click', function() {
      closeLightbox();
  });

  $lightbox.on('click', function(e) {
      if ($(e.target).is($lightbox)) {
          closeLightbox();
      }
  });

  $prevButton.on('click', function(e) {
      e.stopPropagation();
      showPrevImage();
  });

  $nextButton.on('click', function(e) {
      e.stopPropagation();
      showNextImage();
  });

  $(document).on('keydown', function(e) {
      // Controleer of de lightbox daadwerkelijk de class heeft die hem zichtbaar maakt
      if ($lightbox.hasClass('lightbox-overlay-visible')) {
          if (e.key === "Escape") {
              closeLightbox();
          } else if (e.key === "ArrowLeft") {
              showPrevImage();
          } else if (e.key === "ArrowRight") {
              showNextImage();
          }
      }
  });
  // --- EINDE LIGHTBOX FUNCTIONALITEIT ---

}); // Einde van $(document).ready()