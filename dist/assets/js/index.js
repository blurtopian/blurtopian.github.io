'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var scrollController = new ScrollMagic.Controller();

$(function () {
  // smoothscroll
  $('#navbar').find('.smoothscroll').on('click', function (e) {
    e.preventDefault();

    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top - 115
    }, 1000);
  });

  // navbar animation when scrolling down
  $(window).on('scroll', function () {
    var nav = $('#navbar');
    if ($(this).scrollTop() > 150) {
      nav.addClass('scrolled');
    } else {
      nav.removeClass('scrolled');
    }
  });
  $(window).scroll();

  /**
   * Animations
   */

  // waves in header
  var waveWhite = new TimelineMax();
  waveWhite.to($('#wave-white'), 20, { backgroundPositionX: -300, repeatDelay: 0, repeat: -1, yoyo: true, ease: Power1.easeInOut });
  waveWhite.play();

  var waveGrey1 = new TimelineMax();
  waveGrey1.to($('#wave-grey1'), 30, { backgroundPositionX: 300, repeatDelay: 0, repeat: -1, yoyo: true, ease: Power1.easeInOut });
  waveGrey1.play();

  var waveGrey2 = new TimelineMax();
  waveGrey2.to($('#wave-grey2'), 40, { backgroundPositionX: -250, repeatDelay: 0, repeat: -1, yoyo: true, ease: Power1.easeInOut });
  waveGrey2.play();

  // octocat
  var octocatTween = new TweenMax.from('#octocat', 1, { scale: 0, opacity: 0, ease: Back.easeInOut });
  new ScrollMagic.Scene({ triggerElement: '#github-trigger', offset: -300 }).setTween(octocatTween).reverse(false).addTo(scrollController);

  // github text
  var githubTextTween = new TweenMax.from('#github-text', 1, { delay: .3, scale: 0, opacity: 0, ease: Back.easeInOut });
  new ScrollMagic.Scene({ triggerElement: '#github-trigger', offset: -300 }).setTween(githubTextTween).reverse(false).addTo(scrollController);

  // projects headline
  var projectsHeadlineTween = new TweenMax.from('#projects > #projects-header', 1, { opacity: 0, top: -10, ease: Back.easeInOut });
  new ScrollMagic.Scene({ triggerElement: '#projects-trigger', offset: -100 }).setTween(projectsHeadlineTween).reverse(false).addTo(scrollController);

  // project carousel dots
  var projectsDotsTween = new TweenMax.staggerFrom('#projects .slick-dots li', 1, { opacity: 0, top: -50, ease: Back.easeInOut, delay: .3 }, .05);
  new ScrollMagic.Scene({ triggerElement: '#projects-trigger', offset: -50 }).setTween(projectsDotsTween).reverse(false).addTo(scrollController);

  // topics headline
  var topicsHeadlineTween = new TweenMax.from('#topics > #topics-header', 1, { opacity: 0, top: -10, ease: Back.easeInOut });
  new ScrollMagic.Scene({ triggerElement: '#topics', offset: -100 }).setTween(topicsHeadlineTween).reverse(false).addTo(scrollController);

  // topic items
  var topicTween = new TweenMax.staggerFrom('#topics .topic', 1, { opacity: 0, top: -50, ease: Back.easeInOut, delay: .3 }, .05);
  new ScrollMagic.Scene({ triggerElement: '#topics', offset: -100 }).setTween(topicTween).reverse(false).addTo(scrollController);

  // crowdsourcing headline
  var crowdsourcingHeadlineTween = new TweenMax.from('#crowdsourcing > #crowdsourcing-header', 1, { opacity: 0, top: -10, ease: Back.easeInOut });
  new ScrollMagic.Scene({ triggerElement: '#crowdsourcing', offset: -100 }).setTween(crowdsourcingHeadlineTween).reverse(false).addTo(scrollController);

  // crowdsourcing text
  var crowdsourcingTextTween = new TweenMax.from('#crowdsourcing > #crowdsourcing-text', 1, { opacity: 0, top: -10, ease: Back.easeInOut, delay: .3 });
  new ScrollMagic.Scene({ triggerElement: '#crowdsourcing', offset: -100 }).setTween(crowdsourcingTextTween).reverse(false).addTo(scrollController);

  // crowdsourcing items
  var crowdsourcingTween = new TweenMax.staggerFrom('#crowdsourcing .topic', 1, { opacity: 0, top: -50, ease: Back.easeInOut, delay: .3 }, .05);
  new ScrollMagic.Scene({ triggerElement: '#crowdsourcing', offset: -100 }).setTween(crowdsourcingTween).reverse(false).addTo(scrollController);

  // trigger rewards animation
  new ScrollMagic.Scene({ triggerElement: '#rewards', offset: -200 }).reverse(false).on('start', function () {
    app.getRewards();
    setInterval(app.getRewards, 30000);
  }).addTo(scrollController);

  // steem logo
  var steemTween = new TweenMax.from('#steem-logo-container', 1.5, { opacity: 0, bottom: -50, ease: Power2.easeInOut }, .05);
  new ScrollMagic.Scene({ triggerElement: '#steem' }).setTween(steemTween).reverse(false).addTo(scrollController);

  // generate upvotes on steem logo...
  for (var i = 0; i < 6; i++) {
    var bubble = document.createElement('i');
    TweenLite.set(bubble, { attr: { class: 'fa fa-angle-up upvote' }, left: randomNumberBetween(0, 100) + '%', bottom: randomNumberBetween(0, 100) + '%', scale: randomNumberBetween(.5, 2) });
    $('#steem-logo-container').append(bubble);
  }

  // ...and animate them
  var upvotesTimeline = new TimelineMax({ repeat: -1 });
  upvotesTimeline.staggerFrom('.upvote', .5, { scale: 0, opacity: 0, ease: Back.easeOut.config(4) }, 1).staggerTo('.upvote', 2, { bottom: "+=25", opacity: 0, ease: Power1.easeInOut }, 1, '-=5');

  // blog
  steemitWidgets.blog({
    element: 'utopian-steemit-blog',
    user: 'utopian-io',
    limit: 10,
    template: 'blog-template',
    dateCallback: function dateCallback(date) {
      return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
    }
  });
});

var app = new Vue({
  el: '#app',
  data: {
    lang: 'en',
    langswitch: true,
    languages: ['en', 'cn', 'es', 'de'],
    messages: {},
    rewards: {
      authors: 0,
      curators: 0,
      pending: 0,
      total: 0,
      moderators: {
        pending: 0,
        previous: 0
      }
    },
    moderators: []
  },
  created: function created() {
    this.getMessages(this.lang);
    this.getProjects();
    this.getModerators();
  },
  methods: {
    getMessages: function getMessages(lang) {
      var _this = this;

      $.getJSON('translations/' + lang + '.json', function (messages) {
        _this.messages = messages;
        _this.lang = lang;
      });
    },
    trans: function trans(id) {
      var path = id.replace('messages.', '').split('.');
      if (path.length && this.messages.hasOwnProperty(path[0])) {
        var message = this.messages[path[0]];
        for (var i = 1; i < path.length; i++) {
          if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object' && message.hasOwnProperty([path[i]])) {
            message = message[path[i]];
          }
        }
        return message;
      }
    },
    getProjects: function getProjects() {
      $.ajax({
        url: 'projects.json',
        success: function success(projects) {
          var projectsContainer = $('#projects-container');
          var contributionsContainer = $('#contributions-container');

          // projects carousel
          projectsContainer.slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            infinite: true,
            focusOnSelect: true,
            responsive: [{
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }]
          }).on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
              new TweenMax.to('#contributions-loader', 2, { opacity: .5 });
              new TweenMax.staggerTo('#contributions-container .slick-dots li', .5, { opacity: 0, top: -10, ease: Back.easeInOut }, .05);
              new TweenMax.staggerTo('#contributions-container .contribution', .5, { opacity: 0, top: -50, ease: Back.easeInOut }, .05, function () {
                contributionsContainer.slick('slickRemove', null, null, true);
                contributionsContainer.find('.slick-dots').css('display', 'none');
                $.ajax({
                  url: 'https://api.utopian.io/api/posts/?limit=10&section=project&sortBy=votes&platform=github&projectId=' + $(slick.$slides[nextSlide]).data('githubid'),
                  success: function success(data) {
                    var contributions = data.results;
                    for (var i = 0; i < contributions.length; i++) {
                      contributionsContainer.slick('slickAdd', getContributionHtml(contributions[i]));
                    }
                    contributionsContainer.find('.slick-dots').css('display', 'block');
                    new TweenMax.to('#contributions-loader', .5, { opacity: 0 });
                    new TweenMax.staggerFrom('#contributions-container .slick-dots li', .5, { opacity: 0, top: -10, ease: Back.easeInOut }, .05);
                    new TweenMax.staggerFrom('#contributions-container .contribution', .5, { opacity: 0, top: -50, ease: Back.easeInOut }, .05);
                  }
                });
              });
            }
          });

          // add projects
          for (var i = 0; i < projects.length; i++) {
            projectsContainer.slick('slickAdd', '<div class="project" data-githubid="' + projects[i].github.id + '"><img class="cover-image" src="' + projects[i].image + '"/><h4>' + projects[i].name + '</h4><p>' + projects[i].teaser + '</p></div>');
          }

          // animate projects
          var projectsTween = new TweenMax.staggerFrom('#projects-container .project', .5, { opacity: 0, top: -50, ease: Back.easeInOut, delay: .3 }, .05);
          new ScrollMagic.Scene({ triggerElement: '#projects-trigger', offset: -100 }).setTween(projectsTween).reverse(false).addTo(scrollController);

          // contributions
          $.ajax({
            url: 'https://api.utopian.io/api/posts/?limit=10&section=project&sortBy=votes&platform=github&projectId=' + projects[0].github.id,
            success: function success(data) {
              var contributions = data.results;

              contributionsContainer.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
                responsive: [{
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2
                  }
                }, {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 1
                  }
                }]
              });

              for (var _i = 0; _i < contributions.length; _i++) {
                contributionsContainer.slick('slickAdd', getContributionHtml(contributions[_i]));
              }

              // contributions items
              var contributionsTween = new TweenMax.staggerFrom('#contributions-container .contribution', .5, { opacity: 0, top: -50, ease: Back.easeInOut, delay: .3 }, .05);
              new ScrollMagic.Scene({ triggerElement: '#projects-trigger', offset: -100 }).setTween(contributionsTween).reverse(false).addTo(scrollController);

              var contributionsDotsTween = new TweenMax.staggerFrom('#contributions-container .slick-dots li', .5, { opacity: 0, top: -10, ease: Back.easeInOut, delay: .3 }, .05);
              new ScrollMagic.Scene({ triggerElement: '#projects-trigger', offset: -100 }).setTween(contributionsDotsTween).reverse(false).addTo(scrollController);
            }
          });
        }
      });

      function getContributionHtml(contribution) {
        var categoryLabel = '',
            icon = '';
        switch (contribution.json_metadata.type) {
          case 'ideas':
          case 'task-ideas':
            categoryLabel = 'Suggestion';
            icon = 'bulb1';
            break;
          case 'sub-projects':
          case 'task-sub-projects':
            categoryLabel = 'Sub-Project';
            icon = 'copy1';
            break;
          case 'development':
          case 'task-development':
            categoryLabel = 'Development';
            icon = 'codesquare';
            break;
          case 'bug-hunting':
          case 'task-bug-hunting':
            categoryLabel = 'Bug Hunting';
            icon = 'eyeo';
            break;
          case 'translations':
          case 'task-translations':
            categoryLabel = 'Translation';
            icon = 'flag';
            break;
          case 'graphics':
          case 'task-graphics':
            categoryLabel = 'Graphics';
            icon = 'layout';
            break;
          case 'analysis':
          case 'task-analysis':
            categoryLabel = 'Analysis';
            icon = 'dotchart';
            break;
          case 'social':
          case 'task-social':
            categoryLabel = 'Visibility';
            icon = 'sharealt';
            break;
          case 'documentation':
          case 'task-documentation':
            categoryLabel = 'Documentation';
            icon = 'book';
            break;
          case 'tutorials':
          case 'task-tutorials':
            categoryLabel = 'Tutorials';
            icon = 'unknowfile1';
            break;
          case 'video-tutorials':
          case 'task-video-tutorials':
            categoryLabel = 'Video-Tutorials';
            icon = 'videocamera';
            break;
        }

        if (contribution.json_metadata.type.indexOf('task-') !== -1) {
          categoryLabel += ' Request';
        }

        return '<div class="contribution"><div class="contribution-inner">\n    <div class="category ' + contribution.json_metadata.type + '">\n        <i class="anticon icon-' + icon + '"></i>\n        ' + categoryLabel + '\n    </div>\n    <div class="user clearfix">\n        <img class="profile-image" src="https://img.busy.org/@' + contribution.author + '?s=30"/>\n        <a class="username" href="https://utopian.io/@' + contribution.author + '">' + contribution.author + '</a>\n        <span class="reputation">' + calculateReputation(contribution.author_reputation) + '</span>\n        <span class="date">' + moment.utc(contribution.created).from(moment.utc().format('YYYY-MM-DD HH:mm:ss')) + '</span>\n    </div>\n    <div class="title">\n        <a href="https://utopian.io' + contribution.url + '">' + contribution.title + '</a>\n    </div>\n    <div class="stats clearfix">\n        <div class="float-left mr-2">\n            <i class="anticon icon-like1"></i>\n            ' + contribution.net_votes + '\n        </div>\n        <div class="float-left">\n            <i class="anticon icon-message1"></i>\n            ' + contribution.children + '        \n        </div>\n        <div class="float-right">\n            $' + getPostPayout(contribution) + '        \n        </div>\n    </div>\n</div></div>';
      }
    },
    getRewards: function getRewards() {
      var _this2 = this;

      $.ajax({
        url: 'https://api.utopian.io/api/stats',
        success: function success(data) {
          var that = _this2;
          $({
            authors: _this2.rewards.authors,
            curators: _this2.rewards.curators,
            pending: _this2.rewards.pending,
            total: _this2.rewards.total
          }).animate({
            authors: parseInt(data['stats']['total_paid_authors']),
            curators: parseInt(data['stats']['total_paid_curators']),
            pending: parseInt(data['stats']['total_pending_rewards']),
            total: parseInt(data['stats']['total_paid_rewards'] + data['stats']['total_pending_rewards'])
          }, {
            duration: 5000,
            step: function step() {
              that.rewards.authors = this.authors;
              that.rewards.curators = this.curators;
              that.rewards.pending = this.pending;
              that.rewards.total = this.total;
            }
          });
        }
      });
    },
    getModerators: function getModerators() {
      var _this3 = this;

      $.ajax({
        url: 'https://api.utopian.io/api/moderators',
        success: function success(data) {
          _this3.moderators = data.results;
          for (var i = 0; i < _this3.moderators.length; i++) {
            _this3.rewards.moderators.pending += _this3.moderators[i].should_receive_rewards;
            _this3.rewards.moderators.previous += _this3.moderators[i].total_paid_rewards;
          }
        }
      });
    }
  },
  filters: {
    currency: function currency(number) {
      return number.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    payout: function payout(post) {
      if (post.last_payout === '1970-01-01T00:00:00') {
        var payout = post.pending_payout_value.replace(' SBD', '');
        return parseFloat(payout);
      }

      var authorPayout = post.total_payout_value.replace(' SBD', '');
      var curatorPayout = post.curator_payout_value.replace(' SBD', '');

      return (parseFloat(authorPayout) + parseFloat(curatorPayout)).toFixed(2);
    }
  }
});

function getPostPayout(post) {
  if (post.last_payout === '1970-01-01T00:00:00') {
    var payout = post.pending_payout_value.replace(' SBD', '');
    return parseFloat(payout);
  }

  var authorPayout = post.total_payout_value.replace(' SBD', '');
  var curatorPayout = post.curator_payout_value.replace(' SBD', '');

  return (parseFloat(authorPayout) + parseFloat(curatorPayout)).toFixed(2);
}

function calculateReputation(rep) {
  var reputation = (Math.log10(Math.abs(rep)) - 9) * 9 + 25;

  return (rep < 0 ? '-' : '') + Math.floor(reputation);
}

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}
//# sourceMappingURL=index.js.map