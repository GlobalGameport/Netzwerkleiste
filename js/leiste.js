(function ($) {

	var settings = {
			'promoUrl'		: 'http://static.globalgameport.com/network/promo.php',
			'sitesUrl' 	: 'http://static.globalgameport.com/network/sites.php',
			'version'	: '1.4.2'
		};


	var methods = {
		init : function( options ) {
			if ( options ) { 
				$.extend( settings, options );
			}
			
			var stylesheet = 'img{border:0;outline:0}.cf:after{content:".";display:block;clear:both;font-size:0;height:0;visibility:hidden}#nl_bg{background:url(http://static.globalgameport.com/network/bg.jpg) repeat-x scroll center top transparent;display:block;height:117px}#nl_top{width:1125px;height:92px;margin:0 auto;display:block;overflow:hidden;background:url(http://static.globalgameport.com/network/bg_balken.png) no-repeat right top}#nl_menu{width:1125px;height:25px;margin:0 auto;display:block;overflow:hidden}#nl_logo{width:194px;height:92px;float:left;display:block}#nl_promo{width:200px;height:92px;float:left;display:block;margin-top:1px}#nl_promo_load{display:block;height:90px;width:200px}#coin-slider-nl_promo{width:200px;float:left;overflow:hidden}#nl_werlead{width:728px;height:90px;float:right;display:block;padding-top:1px}#nl_netzwerkseiten a:link,#nl_netzwerkseiten a:visited{background:url(http://static.globalgameport.com/network/link_netzwerkseiten.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:25px;margin:0 70px 0 10px;width:155px}#nl_forum a:link,#nl_forum a:visited{background:url(http://static.globalgameport.com/network/link_forum.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:25px;margin:0 50px 0 0;width:155px}#nl_store a:link,#nl_store a:visited{background:url(http://static.globalgameport.com/network/link_astore.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:25px;margin:0 50px 0 0;width:155px}#nl_portal a:link,#nl_portal a:visited{background:url(http://static.globalgameport.com/network/link_portal.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:25px;margin:0 82px 0 0;width:155px}#nl_login a:link,#nl_login a:visited{background:url(http://static.globalgameport.com/network/link_userlogin.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:25px;margin:0 50px 0 0;width:155px}#nl_login.logged_in a:link,#nl_login.logged_in a:visited{background:0;font-family:Arial,Helvetica;color:#ccc;text-decoration:none}#ggpUserDropdown{background:#0a0a0a;border-bottom-left-radius:5px;border-bottom-right-radius:5px;opacity:.7;padding:3px}#ggpUserDropdown ul{padding:0;margin:0}#ggpUserDropdown li{list-style:none;text-align:left}#ggpUserDropdown li:hover{background:#2a2a2a}#ggpUserDropdown li a{font-family:Arial,Helvetica;color:#ccc;text-decoration:none}#nl_netzwerkseiten a:hover,#nl_netzwerkseiten a.nl_netzwerkseiten_active,#nl_forum a:hover,#nl_store a:hover,#nl_portal a:hover,#nl_login a:hover{background-position:center bottom}#social_networks{background:url(http://static.globalgameport.com/network/txt_ggp_folgen.png) no-repeat scroll left top transparent;display:block;float:right;height:25px;margin:0 50px 0 0;width:150px}a#ggp_fb:link,a#ggp_fb:visited{background:url(http://static.globalgameport.com/network/link_social_buttons.png) no-repeat scroll 0 0 transparent;display:block;float:left;height:20px;margin:2px 0 0 75px;width:19px}a#ggp_fb:hover{background-position:0 -20px;text-decoration:none}a#ggp_twitter:link,a#ggp_twitter:visited{background:url(http://static.globalgameport.com/network/link_social_buttons.png) no-repeat scroll -19px 0 transparent;display:block;float:left;height:20px;margin:2px 0 0 1px;width:20px}a#ggp_twitter:hover{background-position:-19px -20px;text-decoration:none}a#ggp_yt:link,a#ggp_yt:visited{background:url(http://static.globalgameport.com/network/link_social_buttons.png) no-repeat scroll -39px 0 transparent;display:block;float:left;height:20px;margin:2px 0 0 1px;width:20px}a#ggp_yt:hover{background-position:-39px -20px;text-decoration:none}#nl_dropdown,#nl_sites_more{opacity:.9;background:#111;display:block;padding-left:4px;width:738px;margin-top:25px;margin-left:15px;font-family:arial,helvetica}#nl_dropdown img{outline:0}#nl_dropdown>div{float:left;margin:3px 0}#nl_our_sites span,#nl_our_partner span{color:#eee}#nl_dropdown ul{padding:0;margin:3px 7px 3px 0;background:url(http://static.globalgameport.com/network/nl_menu_grafiken.png) repeat-y left top}#nl_dropdown ul>span{text-align:center;font:10pt arial,helvetica,clean;color:#eee;background:#111;font-weight:700;padding:2px 0 3px;width:100%;display:block;letter-spacing:-1px}#nl_dropdown li{list-style:none;display:block;margin:1px 0 1px 3px;background:url(http://static.globalgameport.com/network/nl_menu_link_bg.png) repeat-x left top}#nl_dropdown a,#nl_topsites.nl_sites_more_open{color:#eee;display:block;font-size:11px;line-height:20px;padding:0 0 0 5px;text-decoration:none;text-transform:uppercase;text-align:left;cursor:pointer}#nl_topsites{width:534px;position:relative}.nl_topsites{width:260px;float:left}.nl_sites_open{display:block}.nl_sites a{padding:0 0}#nl_partner{width:180px}#nl_partner a{padding:0 5px}#nl_dropdown img{vertical-align:middle}#nl_dropdown li:hover,#nl_topsites.nl_sites_more_open #moresites{background:#b40404}#nl_dropdown li:hover a,#nl_topsites li:hover #nl_sites_more li:hover a{color:#fff;cursor:pointer}#nl_dropdown a.nl_site_ico{width:20px;height:20px;float:right;padding:0;margin:0;background:url(http://static.globalgameport.com/network/link_social_buttons.png) no-repeat scroll transparent;display:block;border-left:1px solid #111}#nl_dropdown a.nl_site_ico_tw{background-position:-88px top}#nl_dropdown a.nl_site_ico_tw:hover{background-position:-88px bottom}#nl_dropdown a.nl_site_ico_yt{background-position:-128px top}#nl_dropdown a.nl_site_ico_yt:hover{background-position:-128px bottom}#nl_dropdown a.nl_site_ico_rs{background-position:-108px top}#nl_dropdown a.nl_site_ico_rs:hover{background-position:-108px bottom}#nl_dropdown a.nl_site_ico_bd{background-position:-59px top;width:29px}#nl_dropdown a.nl_site_ico_bd:hover{background-position:-59px bottom}#nl_dropdown a.nl_site_ico_fb{background-position:-148px top}#nl_dropdown a.nl_site_ico_fb:hover{background-position:-148px bottom}#nl_sites_more{display:none;z-index:999901;padding:5px 0 5px 5px}#nl_sites_more ul{float:left}#nl_sites_more li{width:230px}#nl_topsites.nl_sites_more_open #nl_sites_more{display:block;position:absolute;top:0;margin-top:-10px;left:130px}#moresites{background:#5a5a5a;font-size:9.5pt!important;font-weight:700;display:block;clear:both}a#moresites:hover{background:#06c}#moresites>span{width:20px;display:inline;background:0;font-size:1.5em}';
		
			if(typeof $.fn.CoinSlider == 'undefined') {
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
			
			

			//$('head').append('<style>' + stylesheet + '</style>');		
			var promoleiste = $("<div>").attr({id: "ggp_promo_leiste", align:"center"});
			var seitenleiste = $("<footer>");
			
			var row1 = $('<div id="nl_top"></div>');
			promoleiste.append(row1);

			var nl_footer = $('<div id="nl_footer"></div>');
			seitenleiste.append(nl_footer);
			
			
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
			
			var nl_menu = $("<nav>");
			nl_menu.append($('<a>').addClass("linkNetzwerkseiten").attr({href:"javascript:void(0);"}).text("Netzwerkseiten"));
			nl_menu.append($('<a>').addClass("linkBoard").attr({href:"http://www.globalgameport.com", target:"_blank"}).text("Forum"));
			nl_menu.append($('<a>').addClass("linkShop").attr({href:"http://shop.globalgameport.com", target:"_blank"}).text("Shop"));
            //nl_menu.append($('<a>').addClass("linkPortal").html("http://portal.globalgameport.com").attr({target:"_blank"}));
            nl_footer.append(nl_menu);

            var userDiv = $('<div>').addClass('userDiv');
            nl_footer.append(userDiv);
            if(user = userLoggedIn()){
				var container = $('<ul id="ggpUserDropdown" style="display: none; position: absolute; z-index: 999999;">')
					.append($('<li><a target="_blank" href="'+Drupal.settings.ggp_user.profile+'">Edit Profile</a></li>'))
					.append($('<li><a href="/logout">Logout</a></li>'));
					
				userDiv.append(
					$('<div>').addClass("user").append(
						$('<a>').text(user.username).attr({href:user.profile, target:"_blank"})
					)

				); //.append(container);
					
				$(".linkLogin", nl_menu).toggle(function() {
					$("#ggpUserDropdown").show();
					$(this).addClass("opened");
				},function(){
					$("#ggpUserDropdown").hide();
					$(this).removeClass("opened");
				});
				$(document).bind('click', function(e) {
					var clicked = $(e.target);
					if($(".linkLogin").hasClass("opened"))
						$( ".linkLogin" ).click();
					});
			} else {
				nl_menu.append($('<a>').addClass("linkLogin").attr({href:Drupal.settings.ggp_user.log_in_link}));
			}
			function userLoggedIn() {
				if(typeof Drupal !== "undefined" && Drupal.settings.ggp_user) {
					if ( Drupal.settings.ggp_user.logged_in) {
						var user = Drupal.settings.ggp_user;
						return user;
					}
				}
				return false;
			}
			nl_footer.append($('<div id="social_networks">')
				.append($('<a id="ggp_fb" target="_blank" href="http://www.facebook.com/globalgameport"></a>'))

				.append($('<a id="ggp_twitter" target="_blank" href="http://twitter.com/globalgameport"></a>'))
				.append($('<a id="ggp_yt" target="_blank" href="http://www.youtube.com/user/globalgameport"></a>'))
				
			);
			
			
			
			
			
			$(document).ready(function(){
				$("body").prepend(promoleiste);
				$("body").append(seitenleiste);


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
						error: function(){
							console.log("error");
						},
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
				console.log("test");
				$.ajax({
					url: settings.sitesUrl,
					dataType: 'jsonp',
					success: function(data){
						console.log("Adding Sites START");
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
							var seite = $("<li>").html($("<a>").addClass('siteLink').attr("href", e.href).attr("target","_blank").text(e.name));
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
								//$("#nl_sites_more", sites).width(240*d).height((20 * 21)+5);	
							
							}
							var seite = $("<li>")
							.html(
								$("<a>")
								.attr("href", e.href)
								.attr("target","_blank")
								.text(e.name)
								.addClass('siteLink')
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
						console.log($('#nl_footer').after(container));
						
					
						
						//Events Setzten
						//Level 1 öffnen
						$(".linkNetzwerkseiten").toggle(function(event) {
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
									$( ".linkNetzwerkseiten" ).click();
								
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

