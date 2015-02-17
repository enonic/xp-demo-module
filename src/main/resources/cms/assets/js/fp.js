$(function() {
    var Story = {

        init: function() {
            this.body = $('body');
            this.window = $(window);
            this.story = $('#fp-story .carousel');
            this.slides = this.story.find('.slide');
            this.termContainer = this.slides.first().find('.business-case');
            this.terms = this.termContainer.data('terms').split(',');
            this.bindEvents();
            this.initCarousel();
            this.adjustWindow();
            this.rotateTerm();
        },

        // Bind events
        bindEvents: function() {
            this.bindWindowResize();
            this.bindKeyboardClick();
            this.bindCarouselResize();
            this.bindCarouselChange();
        },

        // Bind window resize
        bindWindowResize: function() {
            this.window.resize($.proxy(function(e) {
                this.adjustWindow();
            }, this));
        },

        // Click on keyboard button
        bindKeyboardClick: function() {
            $(document).on('keyup', $.proxy(function(e) {
                if (e.keyCode === 37) {
                    this.story.trigger('prev.owl.carousel');
                }
                else if (e.keyCode === 39) {
                    this.story.trigger('next.owl.carousel');
                }
            }, this));
        },

        // On carousel resize
        bindCarouselResize: function() {
            this.story.on('resized.owl.carousel', $.proxy(function(e) {
                if (this.story.find('.owl-item:first-child').hasClass('active')) {
                    this.slideEffect('first')
                }
                else if (this.story.find('.owl-item:last-child').hasClass('active')) {
                    this.slideEffect('last');
                }
            }, this));
        },

        // On carousel change
        bindCarouselChange: function() {
            this.story.on('change.owl.carousel', $.proxy(function(e) {
                this.story.removeClass('first last');
                this.slides.last().removeClass('active');
                if (e.namespace && e.property.name === 'position'
                    && e.relatedTarget.relative(e.property.value) === e.relatedTarget.items().length - 1) {
                    // if last slide
                    this.slideEffect('last');

                }
                else if (e.namespace && e.property.name === 'position'
                    && e.relatedTarget.relative(e.property.value) === 0) {
                    // if first slide
                    this.slideEffect('first');
                }
            }, this));
        },

        // Initiate owl carousel
        initCarousel: function() {
            this.story.owlCarousel({
                items: 1,
                nav: true,
                center: true,
                dots: true,
                responsiveClass: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsive: {
                    0: {
                        stagePadding: 0
                    },
                    900: {
                        stagePadding: 0,
                        autoWidth: false
                    }

                }

            });
            this.slideEffect('first');
        },

        // On window resize
        adjustWindow: function() {
            var winH = this.window.height();
            var winW = this.window.width();
            this.slides.height(winH);
            this.slides.width(winW);

            var $slideScene = this.slides.eq(1).find('.scene');
            var $slideHeading = $slideScene.find('h2');
            var $slideImage = this.slides.find('.scene img');

            var $slideImageHeight = $slideScene.height() - $slideHeading.outerHeight(true);
            $slideImage.height($slideImageHeight);
        },

        // Special slide effects
        slideEffect: function(pos) {
            if (pos === 'first') {
                this.story.addClass('first');
            }
            else if (pos === 'last') {
                this.story.addClass('last');
                setTimeout($.proxy(function (){
                    this.slides.last().addClass('active');
                }, this), 2000);
            }
        },

        rotateTerm: function(i) {
            i = (i === undefined) ? 0 : i;
            //var $termContainer = this.slides.first().find('.business-case');
            //var terms = $termContainer.data('terms');
            if (this.terms) {
                var numOfTerms = this.terms.length;
                var current = this.terms[i];
                var nextIndex = i + 1 < numOfTerms ? i + 1 : 0;
                this.termContainer.text(current);
                this.termContainer.fadeIn(2000).delay(4000).fadeOut(200, $.proxy(function() {
                    this.rotateTerm(nextIndex);
                }, this));
            }

        }
    };

    if ($('#fp-story').length) {
        Story.init();
    }

});



$(function() {
    $('.tour.user-interface').height($(window).height() * 0.8);


    // add padding to ensure that circle image is centered on background circle
    // add negative margin to next part to avoid too much padding
    var tourIntroTextHeight = $('.tour.intro .text').outerHeight();
    $('.tour.intro .container').css('padding-bottom', tourIntroTextHeight);
    $('.tour.intro').next().css('margin-top', -tourIntroTextHeight);
});
