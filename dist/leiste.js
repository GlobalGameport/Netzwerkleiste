/**
 * Coin Slider - Unique jQuery Image Slider
 * @version: 1.0 - (2010/04/04)
 * @requires jQuery v1.2.2 or later
 * @author Ivan Lazarevic
 * Examples and documentation at: http://workshop.rs/projects/coin-slider/

 * @license
 * Licensed under MIT licence:
 *   http://www.opensource.org/licenses/mit-license.php
**/

(function ($) {

	var	params		= [],
		order		= [],
		images		= [],
		links		= [],
		linksTarget	= [],
		titles		= [],
		interval	= [],
		imagePos	= [],
		appInterval	= [],
		squarePos	= [],
		reverse		= [],
		uniqueIDPrefix	= "coinsliderUniqueID",
		uniqueIDCounter	= 0;

	$.fn.coinslider = $.fn.CoinSlider = function (options) {

		// squares positions
		var setFields = function (el) {

			var	tWidth	= parseInt(params[el.id].width / params[el.id].spw),
				sWidth	= tWidth,
				tHeight	= parseInt(params[el.id].height / params[el.id].sph),
				sHeight	= tHeight,
				counter	= 0,
				sLeft	= 0,
				sTop	= 0,
				i,
				j,
				tgapx	= params[el.id].width - params[el.id].spw * sWidth,
				gapx	= tgapx,
				tgapy	= params[el.id].height - params[el.id].sph * sHeight,
				gapy	= tgapy;

			for (i = 1; i <= params[el.id].sph; i++) {
				gapx = tgapx;

				if (gapy > 0) {
					gapy--;
					sHeight = tHeight + 1;
				} else {
					sHeight = tHeight;
				}

				for (j = 1; j <= params[el.id].spw; j++) {

					if (gapx > 0) {
						gapx--;
						sWidth = tWidth + 1;
					} else {
						sWidth = tWidth;
					}

					order[el.id][counter] = i + "" + j;
					counter++;

					if (params[el.id].links) {
						$('#' + el.id).append("<a href='" + links[el.id][0] + "' class='cs-" + el.id + "' id='cs-" + el.id + i + j + "' style='width:" + sWidth + "px; height:" + sHeight + "px; float: left; position: absolute;'></a>");
					} else {
						$('#' + el.id).append("<div class='cs-" + el.id + "' id='cs-" + el.id + i + j + "' style='width:" + sWidth + "px; height:" + sHeight + "px; float: left; position: absolute;'></div>");
					}

					// positioning squares
					$("#cs-" + el.id + i + j).css({
						'background-position': -sLeft + 'px ' + (-sTop + 'px'),
						'left' : sLeft,
						'top': sTop
					});

					sLeft += sWidth;
				}

				sTop += sHeight;
				sLeft = 0;

			}

			if (!params[el.id].navigationPrevNextAlwaysShown) {

				$('.cs-' + el.id).mouseover(function(){
					$('#cs-navigation-' + el.id).show();
				});

				$('.cs-' + el.id).mouseout(function(){
					$('#cs-navigation-' + el.id).hide();
				});

				$('#cs-title-' + el.id).mouseover(function(){
					$('#cs-navigation-' + el.id).show();
				});

				$('#cs-title-' + el.id).mouseout(function(){
					$('#cs-navigation-' + el.id).hide();
				});
			}

			if (params[el.id].hoverPause) {
				$('.cs-' + el.id).mouseover(function(){
					params[el.id].pause = true;
				});

				$('.cs-' + el.id).mouseout(function(){
					params[el.id].pause = false;
				});

				$('#cs-title-' + el.id).mouseover(function(){
					params[el.id].pause = true;
				});

				$('#cs-title-' + el.id).mouseout(function(){
					params[el.id].pause = false;
				});
			}

		};

		var transitionCall = function (el) {

			clearInterval(interval[el.id]);
			var delay = params[el.id].delay + params[el.id].spw * params[el.id].sph * params[el.id].sDelay;
			interval[el.id] = setInterval(function() { transition(el);  }, delay);

		};

		// transitions
		var transition = function (el, direction) {

			if(params[el.id].pause === true){
				return;
			}

			effect(el);

			squarePos[el.id] = 0;
			appInterval[el.id] = setInterval(function() { appereance(el,order[el.id][squarePos[el.id]]);  },params[el.id].sDelay);

			$(el).css({ 'background-image': 'url(' + images[el.id][imagePos[el.id]] + ')' });

			if (typeof(direction) == "undefined") {
				imagePos[el.id]++;
			} else {
				if (direction == 'prev') {
					imagePos[el.id]--;
				} else {
					imagePos[el.id] = direction;
				}
			}

			if (imagePos[el.id] == images[el.id].length) {
				imagePos[el.id] = 0;
			}

			if (imagePos[el.id] == -1) {
				imagePos[el.id] = images[el.id].length-1;
			}

			$('.cs-button-' + el.id).removeClass('cs-active');
			$('#cs-button-' + el.id + "-" + (imagePos[el.id] + 1)).addClass('cs-active');

			if (titles[el.id][imagePos[el.id]]) {
				$('#cs-title-' + el.id).css({ 'opacity' : 0 }).animate({ 'opacity' : params[el.id].opacity }, params[el.id].titleSpeed);
				$('#cs-title-' + el.id).html(titles[el.id][imagePos[el.id]]);
			} else {
				$('#cs-title-' + el.id).css('opacity',0);
			}

		};

		var appereance = function (el, sid) {

			$('.cs-' + el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);

			if (squarePos[el.id] == params[el.id].spw * params[el.id].sph) {
				clearInterval(appInterval[el.id]);
				return;
			}

			$('#cs-' + el.id + sid).css({ opacity: 0, 'background-image': 'url(' + images[el.id][imagePos[el.id]] + ')' });
			$('#cs-' + el.id + sid).animate({ opacity: 1 }, 300);
			squarePos[el.id]++;

		};

		// navigation
		var setNavigation = function (el) {
			// create prev and next
			if (params[el.id].showNavigationPrevNext) {
				$(el).append("<div id='cs-navigation-" + el.id + "'></div>");

				if (!params[el.id].navigationPrevNextAlwaysShown) {
					$('#cs-navigation-' + el.id).hide();
				}

				$('#cs-navigation-' + el.id).append("<a href='#' id='cs-prev-" + el.id + "' class='cs-prev'>"+params[el.id].prevText+"</a>");
				$('#cs-navigation-' + el.id).append("<a href='#' id='cs-next-" + el.id + "' class='cs-next'>"+params[el.id].nextText+"</a>");
				$('#cs-prev-' + el.id).css({
					'position'		: 'absolute',
					'top'			: params[el.id].height / 2 - 15,
					'left'			: 0,
					'z-index'		: 1001,
					'line-height'	: '30px',
					'opacity'		: params[el.id].opacity
				}).click( function(e){
					e.preventDefault();
					transition(el,'prev');
					transitionCall(el);
				}).mouseover( function(){ $('#cs-navigation-' + el.id).show(); });

				$('#cs-next-' + el.id).css({
					'position'		: 'absolute',
					'top'			: params[el.id].height / 2 - 15,
					'right'			: 0,
					'z-index'		: 1001,
					'line-height'	: '30px',
					'opacity'		: params[el.id].opacity
				}).click( function(e){
					e.preventDefault();
					transition(el);
					transitionCall(el);
				}).mouseover( function(){ $('#cs-navigation-' + el.id).show(); });

				$('#cs-navigation-' + el.id + ' a').mouseout(function(){
					if (!params[el.id].navigationPrevNextAlwaysShown)
						$('#cs-navigation-' + el.id).hide();

					params[el.id].pause = false;
				});
			}

			// image buttons
			if (params[el.id].showNavigationButtons) {
				$("<div id='cs-buttons-" + el.id + "' class='cs-buttons'></div>").appendTo($('#coin-slider-' + el.id));

				var k;
				for (k = 1; k < images[el.id].length + 1; k++){
					$('#cs-buttons-' + el.id).append("<a href='#' class='cs-button-" + el.id + "' id='cs-button-" + el.id + "-" + k + "'>" + k + "</a>");
				}

				$.each($('.cs-button-' + el.id), function(i,item){
					$(item).click( function(e){
						$('.cs-button-' + el.id).removeClass('cs-active');
						$(this).addClass('cs-active');
						e.preventDefault();
						transition(el,i);
						transitionCall(el);
					});
				});

				$("#cs-buttons-" + el.id).css({
					'left'			: '50%',
					'margin-left'	: -images[el.id].length * 15 / 2 - 5,
					'position'		: 'relative'
				});
			}

		};

		// effects
		var effect = function (el) {
			var effA = ['random','swirl','rain','straight'],
				i,
				j,
				counter,
				eff;

			if (params[el.id].effect === '') {
				eff = effA[Math.floor(Math.random() * (effA.length))];
			} else {
				eff = params[el.id].effect;
			}

			order[el.id] = [];

			if (eff == 'random') {
				counter = 0;
					for (i = 1; i <= params[el.id].sph; i++) {
						for (j = 1; j <= params[el.id].spw; j++) {
							order[el.id][counter] = i + "" + j;
							counter++;
						}
					}
				randomEffect(order[el.id]);
			}

			if (eff == 'rain') {
				rain(el);
			}

			if (eff == 'swirl') {
				swirl(el);
			}

			if (eff == 'straight') {
				straight(el);
			}

			reverse[el.id] *= -1;

			if (reverse[el.id] > 0) {
				order[el.id].reverse();
			}

		};

		// shuffle array function
		var randomEffect = function (arr) {

			var i = arr.length,
				j,
				tempi,
				tempj;

			if ( i === 0 ) {
				return false;
			}

			while ( --i ) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				tempi = arr[i];
				tempj = arr[j];
				arr[i] = tempj;
				arr[j] = tempi;
			}
		};

		//swirl effect by milos popovic
		var swirl = function (el) {

			var n = params[el.id].sph,
				m = params[el.id].spw,
				x = 1,
				y = 1,
				going = 0,
				num = 0,
				c = 0,
				check,
				dowhile = true,
				i;

			while (dowhile) {

				num = (going === 0 || going === 2) ? m : n;

				for (i = 1; i <= num; i++){

					order[el.id][c] = x + "" + y;
					c++;

					if (i != num) {
						switch(going){
							case 0 : y++; break;
							case 1 : x++; break;
							case 2 : y--; break;
							case 3 : x--; break;

						}
					}
				}

				going = (going + 1) % 4;

				switch (going) {
					case 0 : m--; y++; break;
					case 1 : n--; x++; break;
					case 2 : m--; y--; break;
					case 3 : n--; x--; break;
				}

				check = max(n,m) - min(n,m);
				if (m <= check && n <= check) {
					dowhile = false;
				}

			}
		};

		// rain effect
		var rain = function (el) {

			var n = params[el.id].sph,
				m = params[el.id].spw,
				c = 0,
				to = 1,
				to2 = 1,
				from = 1,
				dowhile = true;

			while (dowhile) {

				for (i = from; i <= to; i++) {
					order[el.id][c] = i + '' + parseInt(to2 - i + 1);
					c++;
			}

				to2++;

				if (to < n && to2 < m && n < m) {
					to++;
				}

				if (to < n && n >= m) {
					to++;
				}

				if (to2 > m) {
					from++;
				}

				if (from > to) {
					dowhile= false;
				}

			}

		};

		// straight effect
		var straight = function (el) {
			var counter = 0,
				i,
				j;

			for (i = 1; i <= params[el.id].sph; i++) {
				for (j = 1; j <= params[el.id].spw; j++) {
					order[el.id][counter] = i + '' + j;
					counter++;
				}
			}
		};

		var min = function (n,m) {
			if (n > m) {
				return m;
			} else {
				return n;
			}
		};

		var max = function (n,m) {
			if (n < m) {
				return m;
			} else {
				return n;
			}
		};

		var init = function (el) {

			if( el.id === '' ){
				el.id = uniqueIDPrefix + uniqueIDCounter++;
			}

			order[el.id]		= [];	// order of square appereance
			images[el.id]		= [];
			links[el.id]		= [];
			linksTarget[el.id]	= [];
			titles[el.id]		= [];
			imagePos[el.id]		= 0;
			squarePos[el.id]	= 0;
			reverse[el.id]		= 1;

			params[el.id] = $.extend({}, $.fn.coinslider.defaults, options);

			// create images, links and titles arrays
			$.each($('#' + el.id + ' img'), function (i, item) {
				images[el.id][i]		= $(item).attr('src');
				links[el.id][i]			= $(item).parent().is('a') ? $(item).parent().attr('href') : '';
				linksTarget[el.id][i]	= $(item).parent().is('a') ? $(item).parent().attr('target') : '';
				titles[el.id][i]		= $(item).next().is('span') ? $(item).next().html() : '';
				$(item).hide();
				$(item).next().hide();
			});

			// set panel
			$(el).css({
				'background-image': 'url(' + images[el.id][0] + ')',
				'width': params[el.id].width,
				'height': params[el.id].height,
				'position': 'relative',
				'background-position': 'top left'
			}).wrap("<div class='coin-slider' id='coin-slider-" + el.id + "' />");

			// create title bar
			$('#' + el.id).append("<div class='cs-title' id='cs-title-" + el.id + "' style='position: absolute; bottom:0; left: 0; z-index: 1000;'></div>");

			setFields(el);

			if(params[el.id].navigation){
				setNavigation(el);
			}

			transition(el,0);
			transitionCall(el);

		};

		this.each (
			function () {
				init(this);
			}
		);
	};

	// default values
	$.fn.coinslider.defaults = {
		width: 565, // width of slider panel
		height: 290, // height of slider panel
		spw: 7, // squares per width
		sph: 5, // squares per height
		delay: 3000, // delay between images in ms
		sDelay: 30, // delay beetwen squares in ms
		opacity: 0.7, // opacity of title and navigation
		titleSpeed: 500, // speed of title appereance in ms
		effect: '', // random, swirl, rain, straight
		links : true, // show images as links
		hoverPause: true, // pause on hover
		prevText: 'prev',
		nextText: 'next',
		navigation: true, // show/hide prev, next and buttons
		showNavigationPrevNext: true,
		showNavigationButtons: true,
		navigationPrevNextAlwaysShown: false
	};

})(jQuery);
;/**
 * GGP Netzwerkleiste
 * @requires jQuery v1.7 or later
 * @author valkum & vandit

 * @license All rights reserved.
**/
(function ($) {

  var settings = {
      'promoUrl'  : 'http://static.globalgameport.com/network/promo.php',
      'sitesUrl'  : 'http://static.globalgameport.com/network/sites.php',
      'hide_top'  : false
    };


  var methods = {
    init : function( options ) {
      if ( options ) {
        $.extend( settings, options );
      }
      $("head").append($("<link>").attr("rel", "stylesheet").attr("href", "http://static.globalgameport.com/coin-slider-styles.css").attr("type", "text/css"));

      var leiste = $("<div id='ggp_leiste'/>");
      var wrap1 = $('<div align="center">').prependTo(leiste);
      var nl = $('<div id="nl_bg">');
      wrap1.append(nl);
      var row1 = $('<div id="nl_top"></div>');
      if(!settings.hide_top) {
        nl.append(row1);
        } else {
          nl.css({'height':'25px'});
        }
      var row2 = $('<div id="nl_menu"></div>');
      nl.append(row2);

      if(!settings.hide_top) {
        var logo = $('<div id="nl_logo"></div>');
        row1.append(logo);
        logo.append($('<a>')
        .attr("href", "http://www.globalgameport.com")
        .html(
        $("<img>").width(194).height(92)
        .attr('src','http://static.globalgameport.com/network/ggp_logo.png')
        .attr('alt', 'Global Gameport - We Gather Worlds')
        ));

        var promo = $('<div id="nl_promo">');
        row1.append(promo);
        promo.append($('<a href="#" id="nl_promo_load">').html('<img style="margin:30px auto;" align="center" src="http://static.globalgameport.com/network/200x90/load.gif"/>'));

        var lb = $('<div id="nl_werlead">');
        row1.append(lb);
        var nl_lba = $('<div id="nl_lba" class="cf">');
        lb.append(nl_lba);
      }
      row2.append($('<div id="nl_netzwerkseiten">').html('<a href="javascript:void(0);"></a>'));
      row2.append($('<div id="nl_forum">').html('<a target="_blank" href="http://www.globalgameport.com"></a>'));
      row2.append($('<div id="nl_store">').html('<a target="_blank" href="http://shop.globalgameport.com"></a>'));
                  /*$("<div id='menu_portal'>")
      .html('<a target="_blank" href="http://portal.globalgameport.com"></a>')
      .appendTo(row2);*/


      row2.append($('<div id="social_networks">')
        .append($('<a id="ggp_fb" target="_blank" href="http://www.facebook.com/globalgameport"></a>'))

        .append($('<a id="ggp_twitter" target="_blank" href="http://twitter.com/globalgameport"></a>'))
        .append($('<a id="ggp_yt" target="_blank" href="http://www.youtube.com/user/globalgameport"></a>'))

      );



      leiste.hide();
      $("body").prepend(leiste);
      leiste.slideDown();

      $(document).ready(function(){
        if(!settings.hide_top) {
          if (typeof settings.code != 'undefined') {
            $('#nl_lba').writeCapture().html('<script src="'+settings.code+'" type="text/javascript"></script>');
          } else if(typeof settings.adcont != 'undefined') {
            var off = $('#nl_lba').position();
            $('#'+settings.adcont).css({left: off.left, top: off.top});
            $(window).resize(function() {
              $('#'+settings.adcont).css({left: off.left, top: off.top});
            });
            var reposition = window.setInterval(function() {
              $('#'+settings.adcont).css({left: off.left, top: off.top});
            }, 1000);
          }
          if ( $.browser.msie && parseInt($.browser.version, 10) <= 7 ) {
            var tmp = $("<a>");
            $("#nl_promo").append(tmp);
            tmp.append( $("<img>").attr("src", "http://static.globalgameport.com/network/200x90/ggp_slider_fehler.jpg")  );
            $("#nl_promo_load").remove();
          } else {
            $.ajax({
              url: settings.promoUrl,
              dataType: 'jsonp',
              success: function(data){

                $.each(data, function(i, e) {
                  var tmp = $("<a>").attr("href", e.href).attr("target","_blank");
                  $("#nl_promo").append(tmp);

                  tmp.append( $("<img>").attr("src", "http://static.globalgameport.com/network/200x90/"+e.img)  );
                  if(typeof e.desc != "undefined") {
                    tmp.append( $("<span>").text(e.desc) );
                  }
                });

                function isCoinLoad (t) {
                  if (typeof $.fn.CoinSlider == "undefined") { // if jQuery isn't loaded yet...
                    if (t <= 5000) {setTimeout("isCoinLoad(" + (t + 200) + ")", 200); }
                  } else {
                    $("#nl_promo_load").remove();
                    $("#nl_promo").coinslider({ width:200,height:90, navigation: false, delay: 3500 });
                  }
                }
                isCoinLoad(0);

              },
              jsonp: 'jsonp'
            });
          }
        }
        $.ajax({
          url: settings.sitesUrl,
          dataType: 'jsonp',
          success: function(data){
            var container = $('<div id="nl_dropdown" class="dropdown" style="display: none; position: absolute; z-index: 999900;">');
            var sites = $('<div id="nl_topsites">');
            container.append($('<div id="nl_our_sites">').append(sites));
            var partner = $("<ul id='nl_partner'>");
            container.append($('<div id="nl_our_partner">').append(partner));

            $("#nl_our_sites", container).prepend($("<span>").text("UNSERE AKTUELLEN NETZWERKSEITEN:"));
            $("#nl_our_partner", container).prepend($("<span>").text("UNSERE PARTNER:"));
            var ul;
            $.each(data.topsites, function(i, e) {
              if(i === 0) {
                ul = $('<ul id="nl_sites" class="nl_topsites">');
                sites.append(ul);
                //$("#nl_sites2", sites).width(237*d).height((20 * 21)+5);
              }
              if (i == 15){
                ul = $('<ul id="nl_sites2" class="nl_topsites">');
                sites.append(ul);
              }
              // Internet Explorer Problem
              var seite = $("<li>").html($("<a>").attr("href", e.href).attr("target","_blank").text(e.name));
              ul.append(seite);



              if(typeof e.tw !== 'undefined' && e.tw !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_tw'>").attr("href", "http://twitter.com/"+e.tw).attr("target","_blank"));
              }
              if(typeof e.yt !== 'undefined' && e.yt !== "") {
              seite.prepend($("<a class='nl_site_ico nl_site_ico_yt'>").attr("href", "http://www.youtube.com/"+e.yt).attr("target","_blank"));
              }

              if(typeof e.rs !== 'undefined' && e.rs !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_rs'>").attr("href", e.href+e.rs).attr("target","_blank"));
              }
              if(typeof e.bd !== 'undefined' && e.bd !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_bd'>").attr("href", "http://www.globalgameport.com/"+e.bd).attr("target","_blank"));
              }

            });
            var weitere = $("<a href='#' id='moresites' style='text-align:center;'></a>").html("Weitere Seiten<span>&raquo;</span>");
            sites.append($("<div id='nl_sites_more' >"));
            sites.append(weitere);


            // Berechnung der NL2 Breite
            var z = 0;
            $.each(data.weitere, function(i, e){z++;});
            d = Math.ceil(z/20);
                        //---
            ul = '';
            $.each(data.weitere, function(i, e) {

              if(i % 20 === 0) {
                ul = $("<ul>");
                $("#nl_sites_more", sites).append(ul);
                $("#nl_sites_more", sites).width(240*d).height((20 * 21)+5);



              }
              var seite = $("<li>")
              .html(
                $("<a>")
                .attr("href", e.href)
                .attr("target","_blank")
                .text(e.name)
              );
              ul.append(seite);

              if(typeof e.tw !== 'undefined' && e.tw !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_tw'>").attr("href", "http://twitter.com/"+e.tw).attr("target","_blank"));
              }
              if(typeof e.yt !== 'undefined' && e.yt !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_yt'>").attr("href", "http://www.youtube.com/"+e.yt).attr("target","_blank"));
              }
              if(typeof e.rs !== 'undefined' && e.rs !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_rs'>").attr("href", e.href+e.rs).attr("target","_blank"));
              }
              if(typeof e.bd !== 'undefined' && e.bd !== "") {
                seite.prepend($("<a class='nl_site_ico nl_site_ico_bd'>").attr("href", "http://www.globalgameport.com/"+e.bd).attr("target","_blank"));
              }

            });

            $.each(data.partner, function(i, e) {
              var p  = $("<a>").attr("href", e.href).attr("target","_blank").text(" "+e.name);
              partner.append($("<li>").append(p));
              if(typeof e.ico != 'undefined') {
                p.prepend(
                  $("<img>").attr("src", "http://static.globalgameport.com/network/icons/"+e.ico));
                }
            });
            $('#nl_netzwerkseiten').after(container);



            //Events Setzten
            //Level 1 öffnen
            $("#nl_netzwerkseiten a").toggle(function(event) {
              $("#nl_dropdown").show().toggleClass('nl_sites_open').offset({left: $(this).offset().left});
              $(this).toggleClass('nl_netzwerkseiten_active');
              return false;
            }, function() {
              $("#nl_dropdown").hide().toggleClass('nl_sites_open');
              $(this).toggleClass('nl_netzwerkseiten_active');
              return false;
            });
            //
            $("#moresites").click(function() {
              $(this).parent().toggleClass("nl_sites_more_open");
              return false;
            });
            $(document).bind('click', function(e) {
              var clicked = $(e.target);
              if ( (clicked.parents("#nl_dropdown").length === 0 ) ) {
                if($("#nl_dropdown").hasClass("nl_sites_open"))
                  $( "#nl_netzwerkseiten a" ).click();

                if ($("#nl_sites_more").parent().hasClass("nl_sites_more_open") )
                  $("#moresites").click();
              }

            });

          },
          jsonp:'jsonp'
        });
      });
    }
  };


  $.ggpleiste = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.ggpleiste' );
    }
  };
})(jQuery);

