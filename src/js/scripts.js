const pokemonRepository = (function () {
    const repository = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        const pokemonList = $('.pokemon-list');
        const listItem = $(
            `<button type="button" class="pokemon-list-btn list-group-item 
            ist-group-item-action" data-toggle="modal" data-target="#modal-item"> 
            ${pokemon.name} </button>`
        );
        pokemonList.append(listItem);
        listItem.on('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return $.ajax(apiUrl, { dataType: 'json' })
            .then(function (response) {
                // Return key to fetch(GET) complete pokemon list
                $.each(response.results, function (index, item) {
                    const pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon); // Add each pokemon from results to repository
                });
            })
            .catch(function (e) {
                /* eslint-disable no-console */
                console.error(e);
                /* eslint-enable no-console */
            });
    }

    function loadDetails(item) {
        // Expects parameter with pokemon object as parameter
        const url = item.detailsUrl;
        return $.ajax(url)
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types.map((pokemon) => pokemon.type.name).join(", ");
            })
            .catch(function (e) {
                /* eslint-disable no-console */
                console.error(e);
                /* eslint-enable no-console */
            });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            // Modal content creation
            const modalContainer = $('.modal-body');
            // NameElement
            const nameElement = $('.modal-title').text(
                item.name.charAt(0).toUpperCase() + item.name.slice(1)
            );
            // HeightElement
            const heightElement = $('<p class="pokemon-height"></p>').text(
                'Height: ' + item.height + '0 cm'
            );
            //TypeElement
            const typeElement = $('<p class="pokemon-type"></p>').text(
                'Type: ' + item.types
            );
            // ImageElement
            const imageElement = $('<img class="pokemon-img">');
            imageElement.attr('src', item.imageUrl);
            // Remove content once modal is closed
            if (modalContainer.children().length) {
                modalContainer.children().remove();
            }

            //Append all items to modalBody
            modalContainer.append(nameElement);
            modalContainer.append(heightElement);
            modalContainer.append(typeElement);
            modalContainer.append(imageElement);
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
})();

pokemonRepository.loadList().then(function () {
    const pokemonAll = pokemonRepository.getAll();
    $.each(pokemonAll, function (index, pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

//Pokemon filter
$(document).ready(function () {
    $('#search-pokemon').on('keyup', function () {
        const value = $(this)
            .val()
            .toLowerCase();
        $('.pokemon-list-btn').filter(function () {
            $(this).toggle(
                $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(value) > -1
            );
        });
    });
});
