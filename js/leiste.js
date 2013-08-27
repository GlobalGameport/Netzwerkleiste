(function ($) {

	var settings = {
			//'code'    : '',
			//'adcont'	: '',
			'promoUrl'		: 'http://static.globalgameport.com/network/promo.php',
			'sitesUrl' 	: 'http://static.globalgameport.com/network/sites.php',
		};


	var methods = {
		init : function( options ) {
			if ( options ) {
				$.extend( settings, options );
			}

				

			$("head").append($("<link>").attr("rel", "stylesheet").attr("href", "http://static.globalgameport.com/coin-slider-styles.css").attr("type", "text/css"));
			/* var structure = '<div align="center" id="ggp_leiste">
			<div id="nl_bg">
				<div id="nl_top">
					<a id="nl_logo" href="http://www.globalgameport.com"><img src="http://static.globalgameport.com/network/ggp_logo.png" alt="Global Gameport - We Gather Worlds" /></a>
					<div id="nl_promo">
						<a href="#" id="nl_promo_load"><img style="margin:30px auto;" align="center" src="http://static.globalgameport.com/network/200x90/load.gif"/></a>
					</div>
					<div id="nl_leaderboard">
						<div id="nl_lba" class="cf"></div>
					</div>
				</div>
				<div id="nl_menu">
					<div id="nl_netzwerkseiten"><a href="javascript:void(0);"></a></div>
					<div id="nl_forum"><a target="_blank" href="http://www.globalgameport.com"></a></div>
					<div id="nl_store"><a target="_blank" href="http://shop.globalgameport.com"></a></div>
					<div id="social_networks">
						<a id="ggp_fb" target="_blank" href="http://www.facebook.com/globalgameport"></a>
						<a id="ggp_twitter" target="_blank" href="http://twitter.com/globalgameport"></a>
						<a id="ggp_yt" target="_blank" href="http://www.youtube.com/user/globalgameport"></a>
					</div>
				</div>
			</div></div>';*/
			var structure = '<div align="center" id="ggp_leiste"><div id="nl_bg"><div id="nl_top"><a id="nl_logo" href="http://www.globalgameport.com"><img src="http://static.globalgameport.com/network/ggp_logo.png" alt="Global Gameport - We Gather Worlds" /></a><div id="nl_promo"><a href="#" id="nl_promo_load"><img style="margin:30px auto;" align="center" src="http://static.globalgameport.com/network/200x90/load.gif"/></a></div><div id="nl_leaderboard"><div id="nl_lba" class="cf"></div></div></div><div id="nl_menu"><div id="nl_netzwerkseiten"><a href="javascript:void(0);"></a></div><div id="nl_forum"><a target="_blank" href="http://www.globalgameport.com"></a></div><div id="nl_store"><a target="_blank" href="http://shop.globalgameport.com"></a></div><div id="social_networks"><a id="ggp_fb" target="_blank" href="http://www.facebook.com/globalgameport"></a><a id="ggp_twitter" target="_blank" href="http://twitter.com/globalgameport"></a><a id="ggp_yt" target="_blank" href="http://www.youtube.com/user/globalgameport"></a></div></div></div></div>';
			$("body").prepend(structure);
			var leiste = $("#ggp_leiste");
			leiste.slideDown();
			console.log(leiste);

			var nl_promo = leiste.find("#nl_promo");

			$(document).ready(function(){

			if (typeof settings.ad != 'undefined') {
				postscribe('#ad', '<script src="'+settings.ad+'"><\/script>');
			} else if(typeof settings.adcont != 'undefined') {
				var off = $('#nl_lba').offset();
				$('#'+settings.adcont).css({left: off.left, top: off.top});
				$(window).resize(function() {
					$('#'+settings.adcont).css({left: off.left, top: off.top});
				});
				var reposition = window.setInterval(function() {
					$('#'+settings.adcont).css({left: off.left, top: off.top});
				}, 1000);
			}
			nl_promo.find("#nl_promo_load").remove();
			if ( $.browser && $.browser.msie && parseInt($.browser.version, 10) <= 7 ) {
				nl_promo.append('<a><img src="http://static.globalgameport.com/network/200x90/ggp_slider_fehler.jpg"></a>');
			} else {
				$.ajax({
					url: settings.promoUrl,
					dataType: 'jsonp',
					success: function(data){

						$.each(data, function(i, e) {
							var tmp = nl_promo.append('<a target="_blank" href="' + e.href + '"><img src="http://static.globalgameport.com/network/200x90/' +e.img + '"/></a>');
						});
						nl_promo.coinslider({ width:200,height:90, navigation: false, delay: 3500 });

					},
					jsonp: 'jsonp'
				});
			}
				$.ajax({
					url: settings.sitesUrl,
					dataType: 'jsonp',
					success: function(data){
						var container = $('<div id="nl_dropdown" class="dropdown" style="display: none; position: absolute; z-index: 999900;"><div id="nl_our_sites"><span>UNSERE AKTUELLEN NETZWERKSEITEN:</span><div id="nl_topsites"><div id="nl_sites_more"><a href="javascript:void(); id="moresites" style="text-align:center;"">Weitere Seiten<span>&raquo;</span></a></div></div></div><div id="nl_our_partner"><span>UNSERE PARTNER:</span><ul id="nl_partner></ul></div>');

						var seiten = "";
						$.each(data.topsites, function(i, e) {
							if(i == 0) 
								seiten += '<ul id="nl_sites" class="nl_topsites">';
							if (i == 15)
								seiten += '<ul id="nl_sites2" class="nl_topsites">';
							
							seiten += '<li><a href="' + e.href + '" target="_blank">' + e.name + '</a>'

							// Social Links der Seiten hinzufügen
							if(typeof e.tw != 'undefined' && e.tw != "") {
								seiten += '<a class="nl_site_ico nl_site_ico_tw" href="http://twitter.com/' + e.tw + '" target="_blank">';
							}
							if(typeof e.fb != 'undefined' && e.fb!= "") {
								seiten += '<a class="nl_site_ico nl_site_ico_fb" href="https://facebook.com/' + e.fb + '" target="_blank">';
							}
							if(typeof e.yt != 'undefined' && e.yt != "") {
								seiten += '<a class="nl_site_ico nl_site_ico_yt" href="http://www.youtube.com/' + e.yt + '" target="_blank">';
							}
							if(typeof e.rs != 'undefined' && e.rs != "") {
								seiten += '<a class="nl_site_ico nl_site_ico_rs" href="' + e.href+e.rs + '" target="_blank">';
							}
							if(typeof e.bd != 'undefined' && e.bd != "") {
								seiten += '<a class="nl_site_ico nl_site_ico_bd" href="http://www.globalgameport.com/' + e.bd + '" target="_blank">';
							}

						});
						container.find("#nl_topsites").prepend(seiten);
						

						var weitere = "";
						var z = 0;
						$.each(data.weitere, function(i, e) {
							z++;
							if(i % 20 == 0) 
								weitere += '<ul>';
							weitere += '<li><a href="' + e.href + '" target="_blank">' + e.name + '</a></li>';

							// Social Links der Seiten hinzufügen
							if(typeof e.tw != 'undefined' && e.tw != "") {
								weitere += '<a class="nl_site_ico nl_site_ico_tw" href="http://twitter.com/' + e.tw + '" target="_blank">';
							}
							if(typeof e.fb != 'undefined' && e.fb!= "") {
								weitere += '<a class="nl_site_ico nl_site_ico_fb" href="https://facebook.com/' + e.fb + '" target="_blank">';
							}
							if(typeof e.yt != 'undefined' && e.yt != "") {
								weitere += '<a class="nl_site_ico nl_site_ico_yt" href="http://www.youtube.com/' + e.yt + '" target="_blank">';
							}
							if(typeof e.rs != 'undefined' && e.rs != "") {
								weitere += '<a class="nl_site_ico nl_site_ico_rs" href="' + e.href+e.rs + '" target="_blank">';
							}
							if(typeof e.bd != 'undefined' && e.bd != "") {
								weitere += '<a class="nl_site_ico nl_site_ico_bd" href="http://www.globalgameport.com/' + e.bd + '" target="_blank">';
							}

						});
						container.find("#nl_sites_more").width(240*Math.ceil(z/20)).height((20 * 21)+5).append(weitere);

						var partner = "";
						$.each(data.partner, function(i, e) {
							partner += '<li><a href="' + e.href +'" target="_blank">';
							if(typeof e.ico != 'undefined') {
								partner += '<img src="http://static.globalgameport.com/network/icons/' + e.ico + '" />';
							}
							partner += e.name + '</a><li>'
						});
						container.find("#nl_sites_more").append(partner);

						leiste.find('#nl_netzwerkseiten').after(container);



						//Events Setzten
						//Level 1 öffnen
						leiste.find('#nl_netzwerkseiten a').toggle(function(event) {
							container.show().toggleClass('nl_sites_open').offset({left: $(this).offset().left});
							$(this).toggleClass('nl_netzwerkseiten_active');
							return false;
						}, function() {
							container.hide().toggleClass('nl_sites_open');
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
							if ( (clicked.parents("#nl_dropdown").length == 0 ) ) {
								if(container.hasClass("nl_sites_open"))
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

	}
})(jQuery);

