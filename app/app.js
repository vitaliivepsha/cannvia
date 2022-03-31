// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/products.html');
    require('./assets/templates/layouts/services.html');
    require('./assets/templates/layouts/login.html');
    require('./assets/templates/layouts/registration.html');
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
require('../node_modules/jquery-validation/dist/jquery.validate.min');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);


    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
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
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.contains('active') === true
                ? this.classList.remove('active')
                : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });
    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    // input value

    $('.input, .textarea').blur(function () {
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

    // show/hide password

    $('.show-password').click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').closest('.input-wrapper').find('.input').attr('type', 'text');
        } else{
            $(this).removeClass('active').closest('.input-wrapper').find('.input').attr('type', 'password');
        }
    });

    // validation

    $('.validate-form').each(function() {
        $(this).validate({
            highlight: function(element) {
                $(element).parent().addClass('error');
            },
            unhighlight: function(element) {
                $(element).parent().removeClass('error');
            },
            rules: {
                email: {
                    required: true,
                },
                password: {
                    required: true,
                },
                new_password: {
                    required: true,
                },
                re_password: {
                    required: true,
                    equalTo: '#new_password'
                }
            },
            messages: {
                email: {
                    required: 'Povinné pole',
                },
                password: {
                    required: 'Povinné pole',
                },
                new_password: {
                    required: 'Zadejte nové heslo',
                },
                re_password: {
                    required: 'Odeslat heslo',
                    equalTo: 'Hesla se neshodují'
                }
            }
        });
    });


    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
