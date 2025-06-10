// ========================================================================
// == FINALE, GECORRIGEERDE VERSIE VAN MYJAVASCRIPT.JS (V3) ==
// ========================================================================

// Globale variabelen die overal in het script toegankelijk zijn
var pgNr = 'A';
var menuIdToText = {}; // Nu globaal, zodat handleRouting erbij kan

// De "Chef-kok" functie met een verbeterd "recept" voor URL-namen.
function handleRouting() {
    let hash = window.location.hash.substring(1); // Haal hash op zonder #
    let targetPgIdSuffix = 'A'; // Standaard is Home

    // 1. Controleer voor content-only modus
    if (hash.startsWith('content-')) {
        $('body').addClass('content-only');
        hash = hash.substring(8); // Verwijder 'content-' prefix om de echte slug over te houden
    } else {
        $('body').removeClass('content-only');
    }

    // 2. Bepaal de juiste pagina-ID op basis van de overgebleven slug
    if (hash) {
        let found = false;
        for (const idSuffix in menuIdToText) {
            let tempLabelElement = $('<div>').html(menuIdToText[idSuffix]);
            
            // --- HIER ZIT DE CORRECTIE: Het verbeterde recept ---
            let labelSlug = tempLabelElement.text().trim()
              .toLowerCase()
              .replace(/'/g, '') // VERWIJDERT EERST DE APOSTROFS
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Dan de accenten
              .replace(/[^a-z0-9]+/g, '-') // Dan de rest vervangen door -
              .replace(/(^-|-$)/g, ''); // Dan opkuisen
              
            tempLabelElement.remove();

            if (labelSlug === hash) {
                targetPgIdSuffix = idSuffix;
                found = true;
                break;
            }
        }
        if (!found) {
          targetPgIdSuffix = 'A'; // Fallback naar Home als slug niet gevonden is
        }
    }
    
    // 3. Toon de pagina met de gevonden ID
    pgNr = targetPgIdSuffix;
    var newMnuText = menuIdToText[pgNr] || "Diabetes Liga";
    $('#actieveMnu').html(newMnuText);
    $.fn.setPg(); // Deze functie toont de juiste pagina en update de menu's
}


$(document).ready(function (e) {
  var lightMode = true;

  // Vul de globale 'menuIdToText' lijst
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
  
  // Deze functie wordt nu alleen gebruikt voor interne navigatie (klik op menu)
  function setPageAndURL(newPgIdSuffix) {
    var newMnuText = menuIdToText[newPgIdSuffix] || "Diabetes Liga";
    
    // --- HIER OOK DE CORRECTIE TOEPASSEN VOOR CONSISTENTIE ---
    let tempLabelElement = $('<div>').html(newMnuText);
    let pageSlug = tempLabelElement.text().trim()
        .toLowerCase()
        .replace(/'/g, '') // VERWIJDERT EERST DE APOSTROFS
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    tempLabelElement.remove();

    if (pageSlug === "home" || !pageSlug || newPgIdSuffix === 'A') {
        if (window.location.hash) {
            window.location.hash = '';
        } else {
            handleRouting();
        }
    } else {
        window.location.hash = '#' + pageSlug;
    }
  }
  
  // Luister naar kliks op menu-items
  $('div[id^="MnuItm1"], div[id^="MnuItm2"]').on('click', function (e) {
    e.stopPropagation();
    let newPgIdSuffix = $(this).attr('id').slice(-1);
    
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

  // De setPg functie
  $.fn.setPg = function () {
    $('.pgContent').css('display', 'none');
    var $targetPage = $('#pg' + pgNr);
    if ($targetPage.length) {
        $targetPage.removeAttr('style').css('display', 'block');
        $targetPage.scrollTop(0);
    }
    $('div[id^="MnuItm1"]').css({'color': 'var(--Mnu1Color)', 'font-weight': 'normal'});
    $('#MnuItm1' + pgNr).css({'color': 'var(--Mnu1SelColor)', 'font-weight': 'bold'});
    $('div[id^="MnuItm2"]').css({'color': 'var(--Mnu2Color)', 'font-weight': 'normal'});
    $('#MnuItm2' + pgNr).css({'color': 'var(--Mnu2SelColor)', 'font-weight': 'bold'});
  };

  // --- ROUTING LOGICA ---
  $(window).on('hashchange', handleRouting);
  handleRouting();
  // --- EINDE ROUTING LOGICA ---
  
  // De .setMode functie
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
  
  // Knop voor mobiel menu
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

  // Lightbox
  var lightboxImages = []; var currentImageIndex = 0;
  var $lightbox = $('#imageLightbox'); var $lightboxImage = $('.lightbox-image-display');
  var $prevButton = $('.lightbox-prev-btn'); var $nextButton = $('.lightbox-next-btn');
  $('#pgD').on('click', '.activity-gallery-wrapper .fotoImg', function(e) {
      e.preventDefault(); var $currentGallery = $(this).closest('.activity-gallery-wrapper');
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
  function showPrevImage() { if (currentImageIndex > 0) { currentImageIndex--; $lightboxImage.attr('src', lightboxImages[currentImageIndex]); updateNavButtons(); } }
  function showNextImage() { if (currentImageIndex < lightboxImages.length - 1) { currentImageIndex++; $lightboxImage.attr('src', lightboxImages[currentImageIndex]); updateNavButtons(); } }
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

  // Video's
  $('.pgContent#pgE').on('click', '.video-wrapper', function () {
    const videoId = $(this).data('video-id');
    if (!videoId) return;
    const iframe = $('<iframe>', {
        src: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0',
        title: $(this).find('img').attr('alt') || 'Video',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowfullscreen: true,
        frameborder: 0,
        css: { width: '100%', height: '100%', display: 'block', border: 'none' }
    });
    $(this).find('img, .play-button').remove();
    $(this).append(iframe);
  });
});