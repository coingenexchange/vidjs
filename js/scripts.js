    $(document).ready(function () {
      $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: false,
        draggable: false,
        fade: true,
        cssEase: 'linear'
      });

      const player = videojs('vid', {
        inactivityTimeout: 3000,
        preload: "auto",
        autoplay: false,
        controls: true,
        fluid: true
      });


      // Full screen disabled for iOS
      // fullScreenElement = document.getElementsByClassName("vjs-fullscreen-control")[0];
      // if (videojs.browser.IS_IOS ) {
      //   fullScreenElement.parentNode.removeChild(fullScreenElement);
      // }

      // hotkeys
      player.hotkeys({
        volumeStep: 0.1,
        seekStep: 30,
        enableModifiersForNumbers: false
      });

      player.playlist([{
        sources: [{
          src: 'http://view.vzaar.com/1780458/video',
          type: 'video/mp4'
        }],
        poster: 'http://www.superyachts.com/syv2/resource/585-340-95-c-c61d/superyachts/property/yacht/resource/superyacht-top-five-14653.jpg',
        textTracks: [{
          kind: 'captions',
          label: 'English',
          default: 'showing',
          srclang: 'en'
        }, true]
      }, {
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/bunny/poster.png',
        textTracks: [{
          kind: 'captions',
          label: 'test'
        }, true]
      }, {
        sources: [{
          src: 'http://view.vzaar.com/1780458/video',
          type: 'video/mp4'
        }],
        poster: 'http://www.videojs.com/img/poster.jpg'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/bunny/poster.png'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/video/poster.png',
        textTracks: [{
          kind: 'captions',
          label: 'test'
        }, true]
      }]);

      // Play through the playlist automatically.
      player.playlist.autoadvance(0);

      // if(player.playlist.currentItem(0)) {
      //   console.log("it's the first vid");
      // } else if(player.playlist.currentItem(1))  {
      //   console.log("second vid");
      // }

      // player.dock({
      //   title: 'Bacon ipsum dolor amet ribeye',
      //   description: 'Doner shank pork loin sirloin, meatloaf shankle chicken bresaola cow shoulder cupim.'
      // });

      // overlays
      player.overlay({
        debug: false,
        overlays: [{
            content: '<div class="seek-back"></div>',
            showBackground: false,
            start: 'pause',
            end: 'play',
            align: 'left-middle'
          },
          {
            content: '<div class="seek-forward"></div>',
            showBackground: false,
            start: 'pause',
            end: 'play',
            align: 'right-middle'
          },
          {
            content: '',
            start: 'loadeddata',
            end: 'custom2',
            align: 'sy-bottom-left',
            showBackground: false,
            class: 'sy-slider animated fadeInLeft'
          },
          {
            content: '<img class="sy-video-logo" src="https://www.superyachts.com/resources/images/main_logo.gif">',
            start: 'loadeddata',
            end: 'custom2',
            align: 'top-right',
            showBackground: false,
            class: 'animated slideInRight'
          }
        ]
      });

      player.theaterToggle();
      
      player.on("theaterMode", function () {
        if (player.theaterToggle().isTheater()) {
          sy_videos_slider.hide();
        } else {
          sy_videos_slider.show();
        }
      });

      player.on("play", function () {
        $(sliderWrapper).css({
          'bottom': '30px',
          'transition': 'all 0.25s ease 0s'
        });

      });

      player.on("userinactive", function () {
        $(sliderWrapper).css({
          'bottom': '0',
          'transition': 'all 0.25s ease 0s'
        });
      });

      player.on("useractive", function () {
        $(sliderWrapper).css({
          'bottom': '30px',
          'transition': 'all 0.25s ease 0s'
        });
      });

      // button onclick
      $(".btn-next").click(function () {
        player.playlist.next();
        // player.playlist([3]);
      });

      $(".seek-back").click(function () {
        var currentTime = player.currentTime();
        currentTime = player.currentTime(currentTime - 30);
      });

      $(".seek-forward").click(function () {
        var currentTime = player.currentTime();
        currentTime = player.currentTime(currentTime + 30);
      });

      $.getJSON("test.json", function (json) {
        console.log(json); // this will show the info it in firebug console
      });


      const sliderContent = $('.sy-content');
      const sliderWrapper = $('.sy-slider');

      $(sliderContent).appendTo(sliderWrapper);

      const sy_videos = $(".sy-videos");
      const sy_videos_slider = $(".sy-videos-slider");

      sy_videos_slider.hide();

      sy_videos.click(function () {

        $('.sy-videos-slides').not('.slick-initialized').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 6,
          slidesToScroll: 2,
          variableWidth: false
        });

        sy_videos_slider.addClass("animated slideInUp").toggle();
      });

      function firstPlay() {
        player.on('firstplay', function () {
          console.log("only first played");

        });
      }

      function playCheck() {
        var isPlaying = false;

        player.on(['waiting', 'pause'], function () {
          isPlaying = false;
          console.log("false");
        });

        player.on('playing', function () {
          isPlaying = true;
          console.log("true");
        });
      }

      firstPlay();
      playCheck();

      const videoSwitch = $(".video-poster button");
      const videoCard = $(".full-width-card");
      const threeCard = $(".three-card");

      videoSwitch.click(function () {
        threeCard.addClass("animated fadeOut").hide();
        videoCard.addClass("animated fadeIn").show();
      });
    });
