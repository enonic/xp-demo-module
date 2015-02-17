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

/*


function adjustWindow() {
    var $window = $(window);
    var $slides = $('#fp-story .slide');

// Get window size
    //var winH = $window.height();
    //var winW = $window.width();
    var winH = window.innerHeight;
    var winW = window.innerWidth;

// Keep minimum height 550
    */
/*if(winH <= 350) {
        winH = 350;
    }*//*


   */
/* winH = window.innerHeight;
    winW = window.innerWidth;

    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
        winH = window.innerHeight;
        winW = window.innerWidth;
    }*//*



    $slides.height(winH);
    $slides.width(winW);

    var $slideScene = $slides.eq(1).find('.scene');
    var $slideHeading = $slideScene.find('h2');
    var $slideImage = $slides.find('.scene img');
    //var $slideFloors = $slide.find('.floor');

    //console.log($slideScene.height());
    //console.log($slideHeading.height());

    var $slideImageHeight = $slideScene.height() - $slideHeading.outerHeight(true);
    //console.log($slideImageHeight);
    $slideImage.height($slideImageHeight);
    //$slideFloors.css('bottom', -$slideFigureHeight/1.5);



}




$(function() {
    var $fpStory = $('#fp-story .carousel');


    function slideEffects(slide) {
        if (slide === 'first') {
            $fpStory.addClass('first');
        }
        else if (slide === 'last') {
            $fpStory.addClass('last');
            setTimeout(function (){
                $('#slide-stop-dreaming').addClass('active');
            }, 2000);
        }
    }


    if ($fpStory.length) {
        $fpStory.owlCarousel({
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

        $(document).keyup(function(i){
            if(i.keyCode==37) {
                $fpStory.trigger('prev.owl.carousel');
            } else if (i.keyCode==39) {
                $fpStory.trigger('next.owl.carousel');
            }
        });

        $fpStory.on('resized.owl.carousel', function(e) {
            if ($fpStory.find('.owl-item:first-child').hasClass('active')) {
                slideEffects('first')
            }
            else if ($fpStory.find('.owl-item:last-child').hasClass('active')) {
                slideEffects('last');
            }
        });

        $fpStory.on('change.owl.carousel', function(e) {
            $fpStory.removeClass('first last');
            $('#slide-stop-dreaming').removeClass('active');
            if (e.namespace && e.property.name === 'position'
                && e.relatedTarget.relative(e.property.value) === e.relatedTarget.items().length - 1) {
                slideEffects('last');

            }
            else if (e.namespace && e.property.name === 'position'
                && e.relatedTarget.relative(e.property.value) === 0) {
                slideEffects('first');
            }
        });
    }


    window.onresize = function(e) {
        adjustWindow();
    };
    adjustWindow();

    */
/*function rotateTerm(i) {
        var $terms = $('#slide-dream .business-case span');
        var $current = $terms.eq(i);
        var nextIndex = $current.next().length ? i + 1 : 0;
        //$current.fadeOut();
        $terms.eq(nextIndex).fadeIn(2000).delay(4000).fadeOut(200, function() {
            rotateTerm(nextIndex);
        });
    }*//*


    function rotateTerm(i) {
        var $termContainer = $('#slide-dream .business-case');
        var terms = $termContainer.data('terms');
        var numOfTerms = terms.length;
        var current = terms[i];
        var nextIndex = i + 1 < numOfTerms ? i + 1 : 0;
        $termContainer.text(current).fadeIn(2000).delay(4000).fadeOut(200, function() {
            rotateTerm(nextIndex);
        });

    }

    rotateTerm(0);


    // smooth scrolling to anchor


    */
/*$('#slide-dream').mousemove(function(e){
        var amountMovedX = (e.pageX * -1) * 2;
        var amountMovedY = (e.pageY * -1) * 1;
        $(this).find('.clouds.distant').css('margin-left', amountMovedX / 300 + 'px').css('margin-top', amountMovedY / 300);
        $(this).find('.clouds.close').css('margin-left', amountMovedX / 150 + 'px').css('margin-top', amountMovedY / 150);
        $(this).find('.man img').css('margin-left', amountMovedX / 50 + 'px').css('margin-top', amountMovedY / 50);
    });*//*

});*/


/*
$('#slide-stop-dreaming a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});*/
