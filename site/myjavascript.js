$(document).ready(function (e) {
  var pgNr = 'A';
  var lightMode = true;
  var menuIdToText = {};

  $('div[id^="MnuItm1"]').each(function() {
      var idSuffix = $(this).attr('id').slice(-1);
      menuIdToText[idSuffix] = $("label", this).html();
  });
  $('div[id^="MnuItm2"]').each(function() {
      var idSuffix = $(this).attr('id').slice(-1);
      if (!menuIdToText[idSuffix]) {
          menuIdToText[idSuffix] = $("label", this).html();
      }
  });

  console.log("DEBUG: menuIdToText is gevuld:", menuIdToText);

  function setPageAndURL(newPgIdSuffix) {
    console.log("DEBUG: setPageAndURL gestart voor suffix:", newPgIdSuffix);
    pgNr = newPgIdSuffix;
    var newMnuText = menuIdToText[pgNr] || "Menu Tekst Niet Gevonden";
    $('#actieveMnu').html(newMnuText);
    $.fn.setPg();

    let tempLabelElement = $('<div>').html(newMnuText);
    let pageSlug = tempLabelElement.text().trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    tempLabelElement.remove();

    if (pageSlug === "home" || !pageSlug || newPgIdSuffix === 'A') {
        history.pushState({ pageIdSuffix: pgNr }, newMnuText, window.location.pathname + window.location.search);
    } else {
        history.pushState({ pageIdSuffix: pgNr }, newMnuText, '#' + pageSlug);
    }
    console.log("DEBUG: setPageAndURL klaar voor suffix:", newPgIdSuffix);
  }

  $(window).on('popstate', function(event) {
    console.log("DEBUG: popstate event gedetecteerd", event.originalEvent.state);
    let targetPgIdSuffix = 'A';
    if (event.originalEvent.state && event.originalEvent.state.pageIdSuffix) {
        targetPgIdSuffix = event.originalEvent.state.pageIdSuffix;
    } else {
        let hash = window.location.hash.substring(1);
        if (hash) {
            let found = false;
            for (const idSuffix in menuIdToText) {
                let tempLabelElement = $('<div>').html(menuIdToText[idSuffix]);
                let labelSlug = tempLabelElement.text().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                tempLabelElement.remove();
                if (labelSlug === hash) {
                    targetPgIdSuffix = idSuffix;
                    found = true;
                    break;
                }
            }
            if (!found) targetPgIdSuffix = 'A';
        }
    }
    console.log("DEBUG: popstate verwerkt, nieuwe targetPgIdSuffix:", targetPgIdSuffix);
    setPageAndURL(targetPgIdSuffix);
  });

  function loadPageFromURL() {
    console.log("DEBUG: loadPageFromURL gestart. Hash:", window.location.hash);
    let hash = window.location.hash.substring(1);
    let initialPgIdSuffix = 'A';
    if (hash) {
        let found = false;
        for (const idSuffix in menuIdToText) {
            let tempLabelElement = $('<div>').html(menuIdToText[idSuffix]);
            let labelSlug = tempLabelElement.text().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            tempLabelElement.remove();
            if (labelSlug === hash) {
                initialPgIdSuffix = idSuffix;
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("DEBUG: Hash niet gevonden in menuIdToText, fallback naar Home (A)");
            initialPgIdSuffix = 'A';
        } else {
            console.log("DEBUG: Hash gevonden, initialPgIdSuffix:", initialPgIdSuffix);
        }
    } else {
        console.log("DEBUG: Geen hash, initialPgIdSuffix wordt Home (A)");
    }
    setPageAndURL(initialPgIdSuffix);
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
      $('html').css('--pgBackColor', '#ffffff'); $('html').css('--pgColor', '#333');
      $('html').css('--colorRed', '#ff0000'); $('html').css('--Mnu1BackColor', '#6f32aa');
      $('html').css('--Mnu1Color', '#ffffff'); $('html').css('--Mnu1SelColor', '#00dd00');
      $('html').css('--Mnu2BackColor', '#6f32aa'); $('html').css('--Mnu2Color', '#ffffff');
      $('html').css('--Mnu2SelColor', '#00dd00'); $('html').css('--linkColor', '#0000ff');
      $('#imgHasselt').attr('src', 'site/image/Herkenrode.png');
      $('.LogoSize1, .LogoSize2').attr('src', function(i, oldSrc) { return oldSrc.replace('LogoDLzw.png', 'LogoDLwt.png'); });
    } else {
      $('html').css('--pgBackColor', '#333'); $('html').css('--pgColor', '#ffff');
      $('html').css('--colorRed', '#ff7f50'); $('html').css('--Mnu1BackColor', '#ffffff');
      $('html').css('--Mnu1Color', '#333'); $('html').css('--Mnu1SelColor', '#0000ff');
      $('html').css('--Mnu2BackColor', '#6f32aa'); $('html').css('--Mnu2Color', '#ffffff');
      $('html').css('--Mnu2SelColor', '#00dd00'); $('html').css('--linkColor', '#8080ff');
      $('#imgHasselt').attr('src', 'site/image/HerkenrodeLight.png');
      $('.LogoSize1, .LogoSize2').attr('src', function(i, oldSrc) { return oldSrc.replace('LogoDLwt.png', 'LogoDLzw.png'); });
    }
  };

  $('div[id^="MnuItm1"], div[id^="MnuItm2"]').on('click', function (e) {
    e.stopPropagation();
    let newPgIdSuffix = $(this).attr('id').slice(-1);
    console.log("DEBUG: Menu item geklikt. ID Suffix:", newPgIdSuffix, "Label HTML:", $("label", this).html());
    if (newPgIdSuffix === 'I') {
      $.fn.setMode();
    } else {
      setPageAndURL(newPgIdSuffix);
    }
    if ($(this).closest('#Mnu2').length && $('#Mnu2').css('display') == 'block') {
        $('#Mnu2').height(0);
        setTimeout(function () { $('#Mnu2').css('display', 'none'); }, 1200);
    }
  });

  $.fn.setPg = function () {
    console.log("DEBUG: $.fn.setPg aangeroepen. Huidige pgNr:", pgNr);

    // Stop iframes van YouTube (pgE) en andere (pgK, pgL, pgM)
    // Zorg ervoor dat pgE, pgK, pgL, pgM ook daadwerkelijk iframes bevatten als je deze code gebruikt
    if (pgNr !== 'E' && $('#pgE iframe').length) {
        $('#pgE iframe').each(function() {
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        });
    }
    if (pgNr !== 'K' && $('#pgK iframe').length) $('#pgK iframe').attr('src', $('#pgK iframe').attr('src'));
    if (pgNr !== 'L' && $('#pgL iframe').length) $('#pgL iframe').attr('src', $('#pgL iframe').attr('src'));
    if (pgNr !== 'M' && $('#pgM iframe').length) $('#pgM iframe').attr('src', $('#pgM iframe').attr('src'));

    // Verberg alle .pgContent divs EERST
    $('.pgContent').css('display', 'none');
    console.log("DEBUG: Alle .pgContent verborgen.");

    // Toon de geselecteerde pagina
    var $targetPage = $('#pg' + pgNr);
    console.log("DEBUG: Probeer pagina te tonen: #pg" + pgNr);

    if ($targetPage.length) { // Controleer of het element bestaat
        $targetPage.removeAttr('style'); // VERWIJDER de inline style="display: none;"
        $targetPage.css('display', 'block'); // Zet display expliciet op block
        $targetPage.scrollTop(0); // Scroll naar bovenkant van nieuwe pagina
        console.log("DEBUG: #pg" + pgNr + " zou nu zichtbaar moeten zijn. Huidige display:", $targetPage.css('display'));
    } else {
        console.error("DEBUG: FOOOOUT!!! Element #pg" + pgNr + " NIET GEVONDEN IN DE DOM!");
    }

    // Update menu highlighting
    $('div[id^="MnuItm1"]').css({'color': 'var(--Mnu1Color)', 'font-weight': 'normal'});
    $('#MnuItm1' + pgNr).css({'color': 'var(--Mnu1SelColor)', 'font-weight': 'bold'});

    $('div[id^="MnuItm2"]').css({'color': 'var(--Mnu2Color)', 'font-weight': 'normal'});
    $('#MnuItm2' + pgNr).css({'color': 'var(--Mnu2SelColor)', 'font-weight': 'bold'});
  };

  $('#btnMnu').on('click', function (e) {
    e.preventDefault(); e.stopPropagation();
    if ($('#Mnu2').css('display') == 'block') {
      $('#Mnu2').height(0); setTimeout(function () { $('#Mnu2').css('display', 'none'); }, 1200);
    } else {
      $('#Mnu2').css('display', 'block'); var actualHeight = 0;
      $('#MnuLst2 > div').each(function(){ actualHeight += $(this).outerHeight(true); });
      actualHeight += parseFloat($('#MnuFrame2').css('padding-top')) + parseFloat($('#MnuFrame2').css('padding-bottom'));
      $('#Mnu2').height(Math.min(actualHeight, parseFloat($('#Mnu2').css('max-height'))));
    }
  });

  // Lightbox functionaliteit (van antwoord #26, JavaScript deel)
  var lightboxImages = []; var currentImageIndex = 0;
  var $lightbox = $('#imageLightbox'); var $lightboxImage = $('.lightbox-image-display');
  var $prevButton = $('.lightbox-prev-btn'); var $nextButton = $('.lightbox-next-btn');
  $('#pgD').on('click', '.activity-gallery-wrapper .fotoImg', function(e) { // Aangepast naar .activity-gallery-wrapper
      e.preventDefault(); var $currentGallery = $(this).closest('.activity-gallery-wrapper'); // Aangepast
      lightboxImages = [];
      $currentGallery.find('.fotoImg').each(function() { lightboxImages.push($(this).attr('src')); });
      currentImageIndex = lightboxImages.indexOf($(this).attr('src'));
      if (currentImageIndex !== -1) { openLightbox(currentImageIndex); }
  });
  function openLightbox(index) {
      currentImageIndex = index; $lightboxImage.attr('src', lightboxImages[currentImageIndex]);
      $lightbox.removeClass('lightbox-overlay-hidden').addClass('lightbox-overlay-visible');
      $('body').css('overflow', 'hidden'); updateNavButtons();
  }
  function closeLightbox() {
      $lightbox.removeClass('lightbox-overlay-visible').addClass('lightbox-overlay-hidden');
      $('body').css('overflow', 'auto');
  }
  function showPrevImage() {
      if (currentImageIndex > 0) { currentImageIndex--; $lightboxImage.attr('src', lightboxImages[currentImageIndex]); updateNavButtons(); }
  }
  function showNextImage() {
      if (currentImageIndex < lightboxImages.length - 1) { currentImageIndex++; $lightboxImage.attr('src', lightboxImages[currentImageIndex]); updateNavButtons(); }
  }
  function updateNavButtons() {
      if (lightboxImages.length <= 1) { $prevButton.hide(); $nextButton.hide(); }
      else { $prevButton.toggle(currentImageIndex > 0); $nextButton.toggle(currentImageIndex < lightboxImages.length - 1); }
  }
  $('.lightbox-close-btn').on('click', function() { closeLightbox(); });
  $lightbox.on('click', function(e) { if ($(e.target).is($lightbox)) { closeLightbox(); } });
  $prevButton.on('click', function(e) { e.stopPropagation(); showPrevImage(); });
  $nextButton.on('click', function(e) { e.stopPropagation(); showNextImage(); });
  $(document).on('keydown', function(e) {
      if ($lightbox.hasClass('lightbox-overlay-visible')) {
          if (e.key === "Escape") { closeLightbox(); }
          else if (e.key === "ArrowLeft") { showPrevImage(); }
          else if (e.key === "ArrowRight") { showNextImage(); }
      }
  });

// Video thumbnail klik functionaliteit (correcte selector: .video-wrapper)
$('.pgContent#pgE').on('click', '.video-wrapper', function () {
  const videoId = $(this).data('video-id');
  if (!videoId) return;

  const iframe = $('<iframe>', {
    src: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0',
    title: $(this).find('img').attr('alt') || 'Video',
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowfullscreen: true,
    frameborder: 0
  });

  const container = $('<div>').addClass('youtube-video-container').append(iframe);
  $(this).replaceWith(container);
});

// Toon Home-pagina (A) als er geen hash in de URL zit
if (!window.location.hash) {
  setPageAndURL('A');
} else {
  loadPageFromURL();
}

});