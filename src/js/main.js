import '../styles/main.scss'
import 'https://code.jquery.com/jquery-3.2.1.slim.min.js'
import 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'
import 'equal-height/dist/jquery.equalHeight'
import { Splide } from '@splidejs/splide';
import Mmenu from 'mmenu-js';
import 'owl.carousel/dist/owl.carousel'

$(document).on(
    "DOMContentLoaded", () => {
        jQuery.event.special.touchstart = {
            setup: function (_, ns, handle) {
                this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
            }
        };
        //mmenu
        document.body.style.overflow = 'visible'
        const menu = new Mmenu("#menu", {
            slidingSubmenus: true,
            extensions: ["theme-dark", "position-right", "widescreen"],
        }, {
            classNames: {
                selected: "active"
            },
            offCanvas: {
                page: {
                    selector: "#page"
                }
            }
        });
        let menuBtn = $('.hamburger')
        $(menuBtn).on('click', function () {
            setTimeout(() => menuBtn.addClass('is-active'), 250)

            let overlay = $('#mm-0')
            overlay.on('click', function () {
                setTimeout(() => menuBtn.removeClass('is-active'), 250)
            })
        })
        //owl-carousel 
        // first usage
        $('.carousel-services').on('initialized.owl.carousel', function () {
            $('.carousel-services__item').equalHeight()

            setTimeout(() => carouselService(), 100)

        })
        $('.carousel-services').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
            smartSpeed: 800,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1100: {
                    items: 3
                }

            }
        })

        //owl-carousel item
        function carouselService() {
            $('.carousel-services__item').each(function () {
                let currentItem = $(this)
                let currentHeight = currentItem.find('.carousel-services__content').innerHeight();
                currentItem.find('.carousel-services__img').css('min-height', currentHeight)
            })
        }
        function setSpan(selector) {
            $(selector).each(function () {
                let currentItem = $(this)
                currentItem.html(currentItem.html().replace(/(\S+)\s*$/, '<span>$1</span>'))
            })
        }
        //resize window
        function onResize() {
            $('.carousel-services__item').equalHeight()
        }
        window.onresize = function () {
            onResize()
        }

        //owl carousel
        //second usage

        $('.reviews-carousel').owlCarousel({
            nav: true,
            dotClass: true,
            smartSpeed: 800,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1100: {
                    items: 1
                }

            }
        })

        //splider
        // first
        let main = new Splide('#main-slider', {
            type: 'fade',
            rewind: true,
            pagination: false,
            arrows: false,
        });

        let thumbnails = new Splide('#thumbnail-slider', {
            fixedWidth: 104,
            fixedHeight: 58,
            gap: 10,
            rewind: true,
            focus: 'center',
            pagination: false,
            cover: true,
            isNavigation: true,
            breakpoints: {
                600: {
                    fixedWidth: 60,
                    fixedHeight: 44,
                },
            },
        });

        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();


        setSpan('.title')

        //second 
        let splide = new Splide('.splide-partners', {
            type: 'loop',
            perPage: 4,
            autoplay: true,
        });

        splide.mount();

        // options list

        $('.select').each(function () {
            const _this = $(this),
                selectOption = _this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                duration = 450; // длительность анимации 

            _this.hide();
            _this.wrap('<div class="select"></div>');
            $('<div>', {
                class: 'new-select',
                text: _this.children('option:disabled').text()
            }).insertAfter(_this);

            const selectHead = _this.next('.new-select');
            $('<div>', {
                class: 'new-select__list'
            }).insertAfter(selectHead);

            const selectList = selectHead.next('.new-select__list');
            for (let i = 1; i < selectOptionLength; i++) {
                $('<div>', {
                    class: 'new-select__item',
                    html: $('<span>', {
                        text: selectOption.eq(i).text()
                    })
                })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            const selectItem = selectList.find('.new-select__item');
            selectList.slideUp(0);
            selectHead.on('click', function () {
                if (!$(this).hasClass('on')) {
                    $(this).addClass('on');
                    selectList.slideDown(duration);

                    selectItem.on('click', function () {
                        let chooseItem = $(this).data('value');

                        $('select').val(chooseItem).attr('selected', 'selected');
                        selectHead.text($(this).find('span').text());

                        selectList.slideUp(duration);
                        selectHead.removeClass('on');
                    });

                } else {
                    $(this).removeClass('on');
                    selectList.slideUp(duration);
                }
            });
        });

        $('#submitionBtn').on('click', function () {
            let isEmpty = true
            const inputs = $('.input__wrapper > input')
            inputs.each(function () {
                let currentInput = $(this)
                if (currentInput.val()) {
                    isEmpty = false
                } else {
                    isEmpty = true
                }
            })
            if (!isEmpty) {
                $('.form__successful').css('display', 'flex')
            }

        })

    }
);



