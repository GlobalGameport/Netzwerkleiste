
;(function ($, window, document, undefined) {
  "use strict";

/**
 * GGP Netzwerkleiste
 * @requires jQuery v1.7 or later
 * @author valkum & vandit

 * @license All rights reserved.
**/
  var pluginName = "ggpleiste",
      defaults = {
        promoUrl : "http://static.globalgameport.com/network/promo.php",
        sitesUrl : "http://static.globalgameport.com/network/sites.php",
        cssUrl: "http://static.globalgameport.com/network/1.6.0/ggp_network.css",
        hide_top : false
  };

  function Plugin( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();

/*  if ( this[options] ) {
      return this[options].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.ggpleiste' );
    }*/
  }

  $.extend(Plugin.prototype, {
    
    init : function() {
      var _this = this;

      $("head").append($("<link>").attr({
        rel: "stylesheet",
        href: this.settings.cssUrl,
        type: "text/css"
      }));

      $(this.element).addClass('ggp_leiste');
      var wrap1 = $('<div align="center">').prependTo(this.element);
      var nl = $('<div id="nl_bg">');
      wrap1.append(nl);
      var row1 = $('<div id="nl_top"></div>');
      if(!this.settings.hide_top) {
        nl.append(row1);
      } else {
        nl.css({'height':'25px'});
      }
      var row2 = $('<div id="nl_menu"></div>');
      nl.append(row2);

      if(!this.settings.hide_top) {
        var logo = $('<div id="nl_logo"></div>');
        row1.append(logo);
        logo.append($('<a>')
        .attr("href", "http://www.globalgameport.com")
        .html(
          $("<img>").attr({
            src: 'http://static.globalgameport.com/network/ggp_logo.png',
            alt: 'Global Gameport - We Gather Worlds',
            width: 194,
            height: 92
          })
        ));

        var promo = $('<div id="nl_promo"><a href="#" id="nl_promo_load"><img style="margin:30px auto;" align="center" src="http://static.globalgameport.com/network/200x90/load.gif"/></a></div>');
        row1.append(promo);
        row1.append('<div id="nl_werlead"><div id="nl_lba" class="cf"></div></div>');
      }
      row2.append('<div id="nl_netzwerkseiten"><a href="javascript:void(0);"></a></div><div id="nl_forum"><a target="_blank" href="http://www.globalgameport.com"></a></div><div id="nl_store"><a target="_blank" href="http://shop.globalgameport.com"></a></div>');
      row2.append('<div id="social_networks"><a id="ggp_fb" target="_blank" href="http://www.facebook.com/globalgameport"></a><a id="ggp_twitter" target="_blank" href="http://twitter.com/globalgameport"></a><a id="ggp_yt" target="_blank" href="http://www.youtube.com/user/globalgameport"></a><a id="ggp_yt2" target="_blank" href="http://www.youtube.com/user/GlobalGameportLive"></a></div>');



      $(this.element).hide();
      wrap1.appendTo(this.element);
      $(this.element).slideDown();

      $(document).ready(function(){
        if(!_this.settings.hide_top) {
          if (typeof _this.settings.code != 'undefined') {
            postscribe("#nl_lba", _this.settings.code);
          } else if(typeof _this.settings.adcont != 'undefined') {
            var off = $('#nl_lba').position();
            $(_this.settings.adcont).css({left: off.left, top: off.top});
            $(window).resize(function() {
              $(_this.settings.adcont).css({left: off.left, top: off.top});
            });
            var reposition = window.setInterval(function() {
              $(_this.settings.adcont).css({left: off.left, top: off.top});
            }, 1000);
          }
          if ( $.browser.msie && parseInt($.browser.version, 10) <= 7 ) {
            var tmp = "<a><img src=http://static.globalgameport.com/network/200x90/ggp_slider_fehler.jpg /></a>";
            $("#nl_promo").append(tmp);
            $("#nl_promo_load").remove();
          } else {
            _this.loadPromos(this.element, this.settings);
          }
        }
        _this.loadSites(this.element, this.settings);
        $("body").addClass("ggp_network_loaded");
      });
    },
    loadSites: function() {
      $.ajax({
        url: this.settings.sitesUrl,
        dataType: 'jsonp',
        success: function(data){
          var container = $('<div id="nl_dropdown" class="dropdown" style="display: none; position: absolute; z-index: 999900;">');

          var html ="<div id='nl_our_sites'><div id='nl_topsites'>";
          html += '<ul id="nl_sites" class="nl_topsites">';
          $.each(data.topsites, function(i, e) {
            if (i === 15){
              html += '</ul><ul id="nl_sites2" class="nl_topsites">';
            }

            var seite = "<li>";
            if(typeof e.tw !== 'undefined' && e.tw !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_tw' href='http://twitter.com/" + e.tw + "'' target='_blank'></a>";
            }
            if(typeof e.yt !== 'undefined' && e.yt !== "") {
            seite += "<a class='nl_site_ico nl_site_ico_yt' href='http://www.youtube.com/" + e.yt + "'' target='_blank'></a>";
            }
            if(typeof e.rs !== 'undefined' && e.rs !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_rs' href='" + e.href + e.rs + "'' target='_blank'></a>";
            }
            if(typeof e.bd !== 'undefined' && e.bd !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_bd' href='http://www.globalgameport.com/" + e.bd + "'' target='_blank'></a>";
            }
            seite += "<a href='" + e.href + "' target='_blank'>" + e.name + "</a></li>";
            html += seite;
          });
          html += "</ul>";
          html += "<div id='nl_sites_more' >";

          html += '<ul>';
          $.each(data.weitere, function(i, e) {
            if(i>0 && i % 20 === 0) {
              html += '</ul><ul>';
            }
            var seite = "<li>";
            if(typeof e.tw !== 'undefined' && e.tw !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_tw' href='http://twitter.com/" + e.tw + "'' target='_blank'></a>";
            }
            if(typeof e.yt !== 'undefined' && e.yt !== "") {
            seite += "<a class='nl_site_ico nl_site_ico_yt' href='http://www.youtube.com/" + e.yt + "'' target='_blank'></a>";
            }
            if(typeof e.rs !== 'undefined' && e.rs !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_rs' href='" + e.href + e.rs + "'' target='_blank'></a>";
            }
            if(typeof e.bd !== 'undefined' && e.bd !== "") {
              seite += "<a class='nl_site_ico nl_site_ico_bd' href='http://www.globalgameport.com/" + e.bd + "'' target='_blank'></a>";
            }
            seite += "<a href='" + e.href + "' target='_blank'>" + e.name + "</a></li>";
            html += seite;

          });
          html += "</div>"; //Close #nl_sites_more
          html += "<a href='#' id='moresites' style='text-align:center;'>Weitere Seiten <span>&raquo;</span></a>";
          html += "</div></div>"; //Close #nl_our_sites and #nl_topsites
          container.append(html);
          // Berechnung der Weitere Seiten Breite
          var z = data.weitere.length;
          var d = Math.ceil(z/20);
          $("#nl_sites_more").width(240*d).height((20 * 21)+5);


          html = "<div id='nl_our_partner'><ul id='nl_partner'>";
          $.each(data.partner, function(i, e) {
            var seite = "<li>";
            seite += "<a href='" + e.href + "' target='_blank'>";
            if(typeof e.ico != 'undefined') {
              seite += "<img src='http://static.globalgameport.com/network/icons/" + e.ico +"'/>";
              }
            seite += " " + e.name + "</a></li>";
            html += seite;
          });
          container.append(html);
          $("#nl_our_sites", container).prepend("<span>UNSERE AKTUELLEN NETZWERKSEITEN:</span>");
          $("#nl_our_partner", container).prepend("<span>UNSERE PARTNER:</span>");
          $('#nl_netzwerkseiten').after(container);



          //Events Setzten
          //Level 1 öffnen
          var dropdown = $("#nl_dropdown");
          $("#nl_netzwerkseiten a").click(function(event) {
            if(!dropdown.hasClass("nl_sites_open")) {
              dropdown.show().addClass('nl_sites_open').offset({left: $(this).offset().left});
              $(this).addClass('nl_netzwerkseiten_active');
              return false;
            }else{
              dropdown.hide().removeClass('nl_sites_open');
              $(this).removeClass('nl_netzwerkseiten_active');
              return false;
            }
          });
          //
          $("#moresites").click(function() {
            $(this).parent().toggleClass("nl_sites_more_open");
            return false;
          });
          $(document).bind('click', function(e) {
            var clicked = $(e.target);
            console.log(clicked.parents);
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
    },
    loadPromos: function() {
      $.ajax({
        url: this.settings.promoUrl,
        dataType: 'jsonp',
        success: function(data){
          var tmp = "";
          $.each(data, function(i, e) {
            tmp += "<a href=" + e.href +" target=_blank><img src=http://static.globalgameport.com/network/200x90/" + e.img + " /></a>";
          });
          $("#nl_promo").append(tmp);

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
  });



  $.fn[ pluginName ] = function( options ) {
    this.each(function(){
      if(!$.data( this, "plugin_" + pluginName ) ) {
        $.data(this, "plugin_" + pluginName, new Plugin( this, options ) );
      }
    });
    //chaining
    return this;
  };
})(jQuery, window, document);

