// IIFE begins here!
var pokemonRepository = (function () {
  var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // Data from external source

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    var $pokemonList = $('.pokemon-list');
    var $listItem = $('<li></li>');
    //create button element and add innerText
    var $pokemonButton = $('<button class="pokemon-list__button">' + item.name + '</button>');
    //append button
    $listItem.append($pokemonButton);
    //select list and append listItem
    $pokemonList.append($listItem);
    //event listener for button
    $pokemonButton.on('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    $.ajax(apiUrl, {dataType: 'json'}).then(function(response) {
      $.each(result, function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(err) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function (response) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(err) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      modalWindow.showModal(item.name, item.imageUrl, item.height);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})(); // IIFE ends here!


/*******************
UNABLE TO SOLVE ERROR: Uncaught TypeError: Cannot read property 'then' of undefined at scripts.js:73
********************/
pokemonRepository.loadList().then(function() {
  var pokemonItem = pokemonRepository.getAll();
  $.each(pokemonItem, function(pokemon) {
    addListItem(pokemon);
  });
});

var modalWindow = (function() {
  var $modalContainer = $('#modal-container');
    // Modal content creation
    function showModal(title, img, text) {

      // Clear existing modal content
      $modalContainer.innerHTML = '';

      // Create div element and class
      var modal = $('<div class="modal"></div>');

      // Create nameElement and innerText
      var nameElement = $('<h2>' + title + '</h2>');

      // Create heightElement and innerText
      var heightElement = $('<p>Height: ' + text + '0 cm</p>')

      // Create imageElement and class
      var imageElement = $('<img class="pokemon-image" alt="pokemon image">');
      imageElement.attr('src', img);

      // Add new modal content
      // Create closeButton
      var closeButtonElement = $('<button class="modal-close">close</button>')
      closeButtonElement.on('click', hideModal);

      // Append children
      modal.append(nameElement).append(heightElement).append(imageElement).append(closeButtonElement);
      //Add class and append modal
      $modalContainer.append(modal).addClass('is-visible');
    }

      // Hide modal when closeButton is clicked
      function hideModal() {
        $modalContainer.removeClass('is-visible');
      }

      // hide Modal when ESC key pressed
      $(window).on('keydown', (e) => {
          if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
            hideModal();
          }
      });

      // Hide modal if overlay is clicked. Currently not working properly due to size, could not find fix yet!
      $modalContainer.on('click', (e) => {
        var target = e.target;
          if (target === $modalContainer) {
            hideModal();
          }
      });

      return {
        showModal: showModal,
        hideModal: hideModal
      };
})(); // IIFE ends here!








//Use when needed
/* javascript: (function() {
	var elements = document.body.getElementsByTagName('*');
	var items = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.indexOf('* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }') != -1) {
			items.push(elements[i]);
		}
	}
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
			items[i].innerHTML = '';
		}
	} else {
		document.body.innerHTML +=
			'<style>* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\
            * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * { background-color: rgba(0,0,255,.2) !important; }\
            * * * * { background-color: rgba(255,0,255,.2) !important; }\
            * * * * * { background-color: rgba(0,255,255,.2) !important; }\
            * * * * * * { background-color: rgba(255,255,0,.2) !important; }\
            * * * * * * * { background-color: rgba(255,0,0,.2) !important; }\
            * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }</style>';
	}
})();
*/
