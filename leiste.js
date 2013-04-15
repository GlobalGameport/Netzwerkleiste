(function ($) {

	var settings = {
			//'code'    : '',
			//'adcont'	: '',
			'promoUrl'	: 'http://static.globalgameport.com/network/promo.php',
			'sitesUrl' 	: 'http://static.globalgameport.com/network/sites.php',
			'style'	: 'http://static.globalgameport.com/network/style.min.css',
			'version'	: '1.4.3',
			'hide_top'  : false
		};


	var methods = {
		init : function( options ) {
			if ( options ) { 
				$.extend( settings, options );
			}
			if(!settings.hide_top && typeof $.fn.CoinSlider == 'undefined') {
				// load coin slider js (getscript of jQuery prevents caching so using ajax)
				jQuery.ajax({
					type: "GET",
					url: "http://static.globalgameport.com/coin-slider.min.js",
					cache: true,
					dataType: "script",
					data: null
				});
				$("head").append($("<link>").attr("rel", "stylesheet").attr("href", "http://static.globalgameport.com/coin-slider-styles.css").attr("type", "text/css"));
			}
			
			

			$('head').append($('<link>').attr("rel", "stylesheet").attr("href", settings.style).attr("type", "text/css"));
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
						tmp.append( $("<img>").attr("src", "http://static.globalgameport.com/network/200x90/ggp_slider_fehler.jpg")	);
						$("#nl_promo_load").remove();
					} else {
						$.ajax({
							url: settings.promoUrl,
							dataType: 'jsonp',
							success: function(data){

								$.each(data, function(i, e) {
									var tmp = $("<a>").attr("href", e.href).attr("target","_blank");
									$("#nl_promo").append(tmp);

									tmp.append( $("<img>").attr("src", "http://static.globalgameport.com/network/200x90/"+e.img)	);
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
							if(i == 0) {
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
						
						
						
							if(typeof e.tw != 'undefined' && e.tw != "") {
								seite.prepend($("<a class='nl_site_ico nl_site_ico_tw'>").attr("href", "http://twitter.com/"+e.tw).attr("target","_blank"));
							}
							if(typeof e.yt != 'undefined' && e.yt != "") {
							seite.prepend($("<a class='nl_site_ico nl_site_ico_yt'>").attr("href", "http://www.youtube.com/"+e.yt).attr("target","_blank"));
							}

							if(typeof e.rs != 'undefined' && e.rs != "") {
								seite.prepend($("<a class='nl_site_ico nl_site_ico_rs'>").attr("href", e.href+e.rs).attr("target","_blank"));
							}
							if(typeof e.bd != 'undefined' && e.bd != "") {
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
						var ul;
						$.each(data.weitere, function(i, e) {		
							
							if(i % 20 == 0) {
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
							
							if(typeof e.tw != 'undefined' && e.tw != "") {
								seite.prepend($("<a class='nl_site_ico nl_site_ico_tw'>").attr("href", "http://twitter.com/"+e.tw).attr("target","_blank"));
							}
							if(typeof e.yt != 'undefined' && e.yt != "") {
								seite.prepend($("<a class='nl_site_ico nl_site_ico_yt'>").attr("href", "http://www.youtube.com/"+e.yt).attr("target","_blank"))
							}						
							if(typeof e.rs != 'undefined' && e.rs != "") {
								seite.prepend($("<a class='nl_site_ico nl_site_ico_rs'>").attr("href", e.href+e.rs).attr("target","_blank"));
							}
							if(typeof e.bd != 'undefined' && e.bd != "") {
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
							if ( (clicked.parents("#nl_dropdown").length == 0 ) ) {
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
		
	}
})(jQuery);

