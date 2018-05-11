(function(netzwerkleiste) {
  if (netzwerkleiste.hasInitialised) return
  var defaultOptions = {
    enabled: true,
    container: null,

    sitesURL: 'https://static.globalgameport.com/network/sites2.php',

    content: {
      dropdownTitle: 'Global Gameport',
      currentGamesTitle: 'Aktuelle Games',
      archivedPagesTitle: 'Games-Archiv',
      infoPagesTitle: 'Infoseiten',
      socialLinks: {
        fb: 'https://www.facebook.com/globalgameport',
        tw: 'https://twitter.com/globalgameport',
        yt: 'https://www.youtube.com/user/globalgameport'
      }
    },
    elements:{
      leiste: (content) => {return `<div class="ggpleiste"><div class="ggp_navbar">${content}</div></div>`},
      dropdown: (openButton, closeButton) => {return `<div class="ggp_dropdown_container"> ${openButton}<div id="ggp_dropdown" class="ggp_dropdown-content">${closeButton}<div class="ggp_row"><div class="ggp_row_space"></div></div></div></div>`},
      dropdownOpenButton: (title) => {return `<button class="ggp_dropbtn ggp_pfeil_u">${title}</button>`},
      dropdownCloseButton: '<a href="javascript:void(0)" class="ggp_closebtn" >&times;</a>',
      ggp_col: (title, elements) => {return `<div class="ggp_column">
          <h3>${title}</h3>
          ${elements.map(el => `<a target="_blank" href="${el.href}">${el.name}</a>`).join('')}
        </div>`
      },
      buttonNews: '<a target="_blank" href="http://news.globalgameport.com/">News</a>',
      buttonForum: '<a target="_blank" href="https://www.globalgameport.com/forum.php">Forum</a>',
      buttonAmazon: '<a class="ggp_partner" target="_blank" href="https://www.amazon.de/?&tag=globalgamepor-21"><img src="https://static.globalgameport.com/block_logos/a_logo.png" alt="Amazon.de Link"> </a>',
      socials: (links) => {return `<div id="ggp_social_networks">
          <a id="ggp_fb" target="_blank" href="${links.fb}">&nbsp;</a>
          <a id="ggp_twitter" target="_blank" href="${links.tw}">&nbsp;</a>
          <a id="ggp_yt" target="_blank" href="${links.yt}">&nbsp;</a>
        </div>`
      }




    }
  }
  var util = {
    deepExtend: function(target, source) {
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          if (prop in target && this.isPlainObject(target[prop]) && this.isPlainObject(source[prop])) {
            this.deepExtend(target[prop], source[prop]);
          } else {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    },
    isPlainObject: function(obj) {
      // The code "typeof obj === 'object' && obj !== null" allows Array objects
      return typeof obj === 'object' && obj !== null && obj.constructor == Object;
    },
  }

  netzwerkleiste.initialise = function(options, complete, error) {
    
    util.deepExtend(this.options = {}, defaultOptions);
    if (util.isPlainObject(options)) {
      util.deepExtend(this.options, options);
    }

    var opts = this.options

    var style = document.createElement('style');
    document.head.appendChild(style);

    const styles = `
    <!-- inject:css -->
    <!-- endinject -->
    `

    style.innerHTML = styles

    if(util.isPlainObject(options)) {
      for (var prop in options.style) {
        if (options.style.hasOwnProperty(prop)) {
          style.sheet.insertRule(prop + '{' + options.style[prop].join(';') + '}', style.sheet.cssRules.length);
        }
      }
    }

    var div = document.createElement('div');
    var cont = (opts.container && opts.container.nodeType === 1) ? opts.container : document.body;


    let social = opts.elements.socials(opts.content.socialLinks)
    let dropdown = opts.elements.dropdown(opts.elements.dropdownOpenButton(opts.content.dropdownTitle), opts.elements.dropdownCloseButton)
    let markup = opts.elements.leiste(dropdown + opts.elements.buttonNews + opts.elements.buttonForum + opts.elements.buttonAmazon + social)
    div.innerHTML = markup;
    var el = div.children[0];

    if (!cont.firstChild) {
      cont.appendChild(el);
    } else {
      cont.insertBefore(el, cont.firstChild)
    }

    document.querySelector(".ggp_dropbtn").addEventListener('click', (event) => {
      document.querySelector("#ggp_dropdown").classList.toggle("ggp_show");
    })

    window.addEventListener('click', (event) => {
      if (!event.target.matches('.ggp_dropbtn')) {
    
        var dropdowns = document.getElementsByClassName("ggp_dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('ggp_show')) {
            openDropdown.classList.remove('ggp_show');
          }
        }
      }
    })

    // document.querySelector('.ggp_closebtn').addEventListener('click', (event) => {
    //   document.querySelector("#myNav").style.width = "0%";
    // })


    fetch(opts.sitesURL)
      .then((resp) => resp.json())
      .then(function(data) {

        let markup = opts.elements.ggp_col(opts.content.currentGamesTitle, data.currentSites)
        div.innerHTML = markup
        document.querySelector(".ggp_row_space").appendChild(div.children[0])

        markup = opts.elements.ggp_col(opts.content.archivedPagesTitle, data.archivedSites)
        div.innerHTML = markup
        document.querySelector(".ggp_row_space").appendChild(div.children[0])

        markup = opts.elements.ggp_col(opts.content.infoPagesTitle, data.infoSites)
        div.innerHTML = markup
        document.querySelector(".ggp_row_space").appendChild(div.children[0])
      })
      .catch(function(err){
        console.log(`Error during fetch of networksites: ${err}`)
      })


    netzwerkleiste.hasInitialised = true
  }
  
  window.ggp_leiste = netzwerkleiste
}(window.ggp_leiste || {}))