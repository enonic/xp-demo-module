function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

var STK = STK || {};

STK.responsive = {
    wrapIframes: function(selectors) {
        $(selectors).each(function() {
            var $iframe = $(this);
            var ratio = ($iframe.height() / $iframe.width()) * 100;
            var $wrapper = $('<div/>').addClass('iframe-wrapper').css('padding-top', ratio + '%');
            $iframe.wrap($wrapper);
        });
    }
};

STK.youtube = {
    getImageUrl: function(videoId) {
        return 'http://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
    },

    createIframe: function(videoId, width, height) {
        var $iframe = $('<iframe/>').attr('id', 'ytp' + videoId);
        $iframe.attr('src',
            '//www.youtube.com/embed/' + videoId
            + '?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1');

        $iframe.attr('allowfullscreen', 'true');

        if (isInt(width)) {
            $iframe.width(width);
        }
        if (isInt(height)) {
            $iframe.height(height);
        }

        return $iframe;
    },

    loadIframeOnDemand: function() {
        var $videos = $('.youtube.video');
        $videos.each(function() {
            var $video = $(this);
            var videoId = $(this).data('youtube-id');

            if (!$video.hasClass('masked')) {
                var $img = $('<img/>').attr('src', STK.youtube.getImageUrl(videoId));
                $img.appendTo($video);
            }

            var $button = $('<button/>').addClass('play').attr('title', 'Play video' + ($video.data('title') !== undefined ?  ' \'' + $video.data('title') + '\'' : ''));
            $button.appendTo($video);
            $video.hasClass('highlight') ? $button.addClass('highlight') : null;

            $button.click(function() {
                var $iframe = STK.youtube.createIframe(videoId);
                $.featherlight($iframe);
            });
        });
    }
};



$(function() {


    var pricingProductsSelector = $('.pricing .products');
    if (pricingProductsSelector.length) {
        pricingProductsSelector.owlCarousel({
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    dots: true
                },
                600: {
                    items: 2,
                    nav: true,
                    dots: true
                },
                900: {
                    items: 4,
                    nav: false,
                    dots: false
                }
            }
        });

    }



    var owlCarouselSelector = $('.owl-carousel');
    if (owlCarouselSelector.length) {
        owlCarouselSelector.owlCarousel({
            items: 1,
            nav: true,
            loop: true


        });
    }


    var trainCarouselSelector = $('#train');
    if (trainCarouselSelector.length) {
        trainCarouselSelector.owlCarousel({
            items: 1,
            center: true,
            responsiveClass: true,
            responsive: {
                0: {
                    stagePadding: 50
                },
                900: {
                    stagePadding: 200
                },
                1250: {
                    stagepadding: 200,
                    autoWidth: true
                }

            }

        });
    }

    //initPricingCurrencySelector();

    STK.responsive.wrapIframes('iframe.youtube');
    STK.youtube.loadIframeOnDemand();

    $('.video.play.button').click(function(e) {
        $(this).next('.video-container').addClass('toggled');
        e.preventDefault();
    });

    $('.expandable').expandable();

    $('.try-now.video').specialHeight(85);


});

$.fn.expandable = function(){
    return $(this).each(function(){

        var $content = $(this);
        var contentId = $content.attr('id');

        if (contentId.length) {

            $content.wrap('<div class="expandable-wrapper"/>');
            var $wrapper = $content.closest('.expandable-wrapper');
            var $toggleButton = $('<button>').attr('title', 'Expand/collapse content').append('<span>Expand</span>');
            $toggleButton.attr('aria-expanded', 'false');
            $toggleButton.attr('aria-controls', contentId);

            $content.before($toggleButton);


            //events
            $toggleButton
                .bind('collapse', function(){
                    $(this).find('span').text('Expand');
                    $wrapper.removeClass('expanded').addClass('collapsed');
                    $(this).attr('aria-hidden',true);
                    $(this).attr('aria-expanded', false);
                })
                .bind('expand', function(){
                    $(this).find('span').text('Collapse');
                    $wrapper.removeClass('collapsed').addClass('expanded');
                    $(this).attr('aria-hidden',false);
                    $(this).attr('aria-expanded', true);
                })
                .click(function(){
                    if( $($wrapper).is('.expanded') ){
                        $(this).trigger('collapse');
                    }
                    else {
                        $(this).trigger('expand');
                    }
                    return false;
                }).trigger('collapse');
        }

    });
};


/* Set content height to X percent of window height */
$.fn.specialHeight = function(percentage){
    return $(this).each(function(){
        var $content = $(this);
        var specialHeight = window.innerHeight * (percentage/100);
        $content.innerHeight(specialHeight);
    });
};




$(function() {
    var GA = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            this.bindDownloadClick();
            this.bindVideoClick();
        },

        bindDownloadClick: function() {
            var that = this;
            var trigger = $('a.download');
            trigger.click(function(e) {
                that.triggerEvent('Link', 'Download');
            });
        },

        bindVideoClick: function() {
            var that = this;
            var trigger = $('button.play');
            trigger.click(function(e) {
                var label = $(this).attr('title');
                that.triggerEvent('Button', 'Watch video', label);
            });
        },

        triggerEvent: function(category, action, label, value) {
            if (window.ga) {
                window.ga('send', 'event', category, action, label, value);
            }
        }
    };

    GA.init();

});




$(function() {
    var Menu = {

        init: function() {
            this.body = $('body');
            this.toggleBtn = this.body.find('> header .toggle-menu');
            this.menu = $('#main-nav');
            this.menuVisible = false;
            this.bindEvents();
        },

        // Bind events
        bindEvents: function() {
            this.bindToggleBtnClick();
            this.bindBackdropClick();
            this.bindEscClick();
        },

        // Show the menu
        showMenu: function() {
            this.body.addClass('main-nav-toggled');
            this.toggleBtn.attr('aria-expanded', 'true');
            this.menuVisible = true;
        },

        // Hide the menu
        hideMenu: function() {
            this.body.removeClass('main-nav-toggled');
            this.toggleBtn.attr('aria-expanded', 'false');
            this.menuVisible = false;
        },

        // Click on toggle button
        bindToggleBtnClick: function() {
            this.toggleBtn.on('click', $.proxy(function(e) {
                e.preventDefault();
                if (this.menuVisible) {
                    this.hideMenu();
                }
                else {
                    this.showMenu();
                }
            }, this));
        },

        // Click outside of menu
        bindBackdropClick: function() {
            $(document).on('click', $.proxy(function(e) {
                var clickIsOnMenuLink = $(e.target).closest(this.menu.find('a')).length;
                var clickIsOnToggleBtn = $(e.target).closest(this.toggleBtn).length;
                if (this.menuVisible && !clickIsOnMenuLink && !clickIsOnToggleBtn) {
                    this.hideMenu();
                }
            }, this));
        },

        // Click on ESC button
        bindEscClick: function() {
            $(document).on('keyup', $.proxy(function(e) {
                if (e.keyCode === 27) {
                    this.hideMenu();
                }
            }, this));
        }
    };

    Menu.init();
});



$(function() {
    var Pricing = {

        init: function() {
            this.pricing = $('.pricing');
            this.products = this.pricing.find('.product > article');
            this.prices = this.pricing.find('.prices li');
            this.currencySelector = this.pricing.find('.currency-selector select');
            this.siteNumberSelector = this.pricing.find('#num-of-sites');
            this.currency = this.currencySelector.find('option:first').val();
            this.bindEvents();
            this.setCurrency();
        },

        // Bind events
        bindEvents: function() {
            this.bindSiteNumberChange();
            this.bindCurrencySelectorChange();
            this.bindBuyButtonClick();
        },

        // Change currency
        bindCurrencySelectorChange: function() {
            var that = this;
            this.currencySelector.change(function(e) {
                var value = $(this).val();
                // Make sure that other currencySelectors are updated
                that.currencySelector.val(value);
                that.currency = $(this).val();
                that.setCurrency();
            });
        },

        // Change num of sites
        bindSiteNumberChange: function() {
            var that = this;
            this.siteNumberSelector.on('input change', function(e) {
                var numOfSites = parseInt($(this).val());
                // If numOfSites is greater than 5, show question mark
                $(this).next('output').text(numOfSites <= 5 ? numOfSites : '?');
                that.setPrice(numOfSites);
            });
        },

        bindBuyButtonClick: function() {
            var that = this;
            $('.product-group').click(function(e) {
                var target = e.target;
                if (target.nodeName === 'A') {
                    var productType = $(target).closest('article').data('product-type');
                    if (productType === 'cloud') {
                        target.href += '&co=' + that.siteNumberSelector.val();
                    }
                    target.href += '&ac=' + $(target).data('action');
                }
            });
        },

        // Set price based on selected number of sites
        // Only valid for cloud products
        setPrice: function(numOfSites) {
            var that = this;
            that.products.filter('[data-product-type="cloud"]').each(function() {
                var product = $(this);
                var maxSites = isInt(product.data('max-sites')) ? product.data('max-sites') : 9999;
                var prices = product.find('.prices li');
                var button = product.find('.button');

                prices.each(function() {
                    var priceText;
                    var price = $(this);
                    var number = price.find('.number');
                    var currency = price.find('.currency');
                    if (maxSites < numOfSites) {
                        priceText = 'Contact us';
                        currency.hide();
                        button.text('Get quote');
                        button.data('action', 'gq');
                    }
                    else {
                        var basePrice = number.data('base-price');
                        var extraPrice = number.data('extra-price') || 0;
                        var calculatedPrice = basePrice + (extraPrice * (numOfSites - 1));
                        priceText = calculatedPrice;
                        currency.show();
                        button.text('Order now');
                        button.data('action', 'o');
                    }

                    number.text(priceText);
                });
            });
        },

        // Set chosen currency
        setCurrency: function() {
            this.prices.filter('.selected').removeClass('selected');
            this.prices.filter('[data-currency="' + this.currency + '"]').addClass('selected');
            this.setStartupFee();
        },

        // Set startup fee
        // Only valid for cloud products
        setStartupFee: function() {
            var that = this;
            that.products.filter('[data-product-type="cloud"]').each(function() {
                var startupFeeEl = $(this).find('.fee');
                var currentPrice = $(this).find('.prices li.selected');
                var startupFeeNumber = currentPrice.data('base-price');
                var startupFee = currentPrice.children().clone();
                startupFee.find('.number').text(startupFeeNumber);
                var startupFeeText = '';
                startupFee.each(function() {
                    startupFeeText += $(this).text() + ' ';
                });
                startupFeeEl.text(startupFeeText);
            });
        }
    };

    Pricing.init();
});




$(function() {
    var AccessibleTabs = {

        init: function() {

            this.window = $(window);
            this.tabsContainer = $('.tabs');
            this.tabs = this.tabsContainer.children('section');
            this.tabsMenu = $('<ol/>').addClass('tabs-menu');
            this.tabsContainer.prepend(this.tabsMenu);
            this.createTabMenu();
            this.bindEvents();

            // Check for hash when page is loaded
            this.hashChanged();

        },

        // Bind events
        bindEvents: function() {
            this.bindWindowHashChange();
            this.bindTabMenuClick();
        },

        bindWindowHashChange: function() {
            this.window.hashchange($.proxy(function() {
                this.hashChanged();
            }, this));
        },

        createTabMenu: function() {
            var that = this;
            this.tabs.each(function() {
                var tabContent = $(this);
                var isFirstTab = tabContent.is(':first-of-type');
                tabContent.addClass('tab-content');
                if (!isFirstTab) {
                    tabContent.addClass('visually-hidden');
                }
                var heading = tabContent.children().first().text();
                var tabId = "t-" + encodeURIComponent(heading.replace(/[\sá]/g, '-'));
                tabContent.attr('id', tabId);
                var link = $('<a/>').attr('href', '#' + tabId).data('hash', '#' + tabId).text(heading);
                if (isFirstTab) {
                    link.addClass('selected');
                }
                var listEl = $('<li/>');
                listEl.append(link);
                that.tabsMenu.append(listEl);
            });
        },

        bindTabMenuClick: function() {
            this.tabsMenu.click($.proxy(function(e) {
                var target = e.target,
                    $target = $(target);
                if (target.nodeName === 'A') {
                    history.pushState({}, '', $target.attr('href'));
                    this.hashChanged();
                    e.preventDefault();
                }
            }, this));
        },

        hashChanged: function() {
            var hash = location.hash;
            if (hash.length) {
                this.selectTabLink(hash);
                this.selectTabContent(hash);
            }
        },

        selectTabLink: function(hash) {
            this.tabsMenu.find('a.selected').removeClass('selected');
            this.tabsMenu.find('a').filter('[href="' + hash + '"]').addClass('selected');
        },

        selectTabContent: function(hash) {
            var tabContent = $('.tabs ' + hash);
            if (tabContent.length) {
                $('.tabs').find('.tab-content').addClass('visually-hidden');
                tabContent.removeClass('visually-hidden');
            }
        }
    };

    AccessibleTabs.init();
});







$(function() {
    jQuery.extend(jQuery.validator.messages, {
        required:"Required field.",
        email:"Invalid email."
    });

    $('form.validate').validate({
        submitHandler: function (form) {

            var options = {
                dataType: 'json',
                success: function(resp, status, xhr) {
                    if(resp.content == 'ok') {
                        $(form).addClass('success');
                    } else {
                        $(form).addClass('failed');
                    }
                },
                error: function() {
                    $(form).addClass('failed');
                }
            };

            $(form).ajaxSubmit(options);
            return false;
        }
    });
});
