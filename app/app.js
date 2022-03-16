// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  0;
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/sweetalert2/dist/sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new LightGallery();
  new Slider();

  setTimeout(function() {
    $('body').trigger('scroll');
    $(window).trigger('resize');
  }, 100);


    // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 60) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

  // mobile menu

    var touch = $('.mobile-menu__btn');
    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.contains('active') === true
                ? this.classList.remove('active')
                : this.classList.add('active');
        });
    }

    $(touch).click(function(e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });
    $(document).on('click', '.mobile-menu__btn', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', '.mobile-menu__wrapper', function(e) {
        e.stopPropagation();
    });

    // input value

  $('.input, .textarea').blur(function() {
    if ($(this).val()) {
      $(this).closest('.input-wrapper').addClass('active');
    }
    else {
      $(this).closest('.input-wrapper').removeClass('active');
    }
  });

    // select

  $('.select').SumoSelect({
    forceCustomRendering: true
  });


    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);
});