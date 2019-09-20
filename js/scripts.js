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
    var pokemonList = $('.pokemon-list');
    var listItem = $('<li></li>'); // Create li element containing a button forEach Pokémon
    var pokemonButton = $('<button class="pokemon-list__button">' + pokemon.name + '</button>');
    listItem.append(pokemonButton); // appendChild button to list
    pokemonList.append(listItem); // appendChild listItem to ul
    pokemonButton.on('click' , function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (response) { // Return key to fetch(GET) complete pokemon list
      $.each(response.results, function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); // Add each pokemon from results to repository variable
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) { // Expects parameter with pokemon object as parameter
    var url = item.detailsUrl;
    return $.ajax(url).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
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
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})(); // IIFE ends here!


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


var modalWindow = (function() {
  var modalContainer = $('#modal-container');

    // Modal content creation
    function showModal(title, img, text) {

      // Clear existing modal content
      modalContainer.innerHTML = '';

      // Create div element
      var modal = $('<div class="modal"></div>');

      // Create nameElement
      var nameElement = $('<h2>' + title + '</h2>');

      // Create heightElement
      var heightElement = $('<p>height: ' + text + '0 cm</p>');

      // Create imageElement
      var imageElement = $('<img class="pokemon-image"></img>');
      imageElement.attr('src', img);

      // Add new modal content
      // Create closeButton
      var closeButtonElement = $('<button class="modal-close">close</button>');
      closeButtonElement.on('click', hideModal); // EventListener to close/hideModal

      // Append allChildren to page
      modal.append(nameElement);
      modal.append(heightElement);
      modal.append(imageElement);
      modal.append(closeButtonElement);
      modalContainer.append(modal).addClass('is-visible'); // Add showModal class (visible)
    }

      // Hide modal when closeButton is clicked
      function hideModal() {
        modalContainer.removeClass('is-visible');
      }

      // hide Modal when ESC key pressed
      $(window).on('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.hasClass('is-visible')) {
            hideModal();
          }
      });

      // Hide modal if overlay is clicked. Currently not working properly due to size, could not find fix yet!
      modalContainer.on('click', (e) => {
        var target = $(e.target);
          if (target.is(modalContainer)) {
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
