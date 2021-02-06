var searchFormEl = document.querySelector("#user-form")
var artistInputEl = document.querySelector("#artist-search")
var eventContainerEl = document.querySelector("#event-container")
var artistSearchTerm = document.querySelector("#event-search-term")

function getEvents(keyword)
    {
        //format ticketmaster api url 
        var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&dmaId=343&apikey=OsK3mvfl7RepNMB8j29ox4Yz0DY3KYvU"

        //make a request to the url
        fetch(apiUrl).then(function(response)
            {
                if(response.ok)
                    {
                        response.json().then(function(response)
                            {
                                displayEvents(response, keyword);
                                displayTicketPricing(response);
                                //console.log(keyword, response);
                            });
                    }
                else(function(error)
                    {
                        alert("Unable to connect to TicketMaster site");
                    })
            })
        .catch(function(error)
            {
                alert("Unable to connect to TicketMaster");
            })
    }

function formSubmitHandler(event)
    {
        event.preventDefault();

        //get value from input element
        var artist = artistInputEl.value.trim();

        if(artist)
            {
                getEvents(artist);
                artistInputEl.value = "";
            }
        else
            {
                alert("Please enter an artist name");
            }
    };

function displayEvents(shows, searchTerm)
    {
        var showArr = shows._embedded.events;
        console.log(shows);
        eventContainerEl.textContent = "";
        artistSearchTerm.textContent = searchTerm;


        //check if api returned any events
        if(showArr.length === 0)
            {
                eventContainerEl.textContent = "No events found for this artist";
                return;
            }

        //loop over events
        for(var i = 0; i < showArr.length; i++)
            {
                var eventTitle = showArr[i].name;
                console.log(eventTitle);
                var showLink = showArr[i].url;
                var showPrice = showArr[i].priceRanges
                console.log(showPrice);

                //create a container for each event
                var eventEl = document.createElement("a");
                eventEl.classList = "event-list";
                eventEl.setAttribute("href", showLink,);
                eventEl.setAttribute("target", "_blank");
                
                //create a span element to hold event names
                var eventTitleEl = document.createElement("span");
                eventTitleEl.classList = "event-list";
                eventTitleEl.textContent = eventTitle;

                var priceEl = document.createElement("div")
                priceEl.classList = "event-list";

                if(showArr[i].priceRanges > 0)
                    {
                        priceEl.innerHTML = 
                        "<span>" + showPrice[i].min + "</span>"
                    }


                

                //append to container 
                eventEl.appendChild(eventTitleEl);

                eventContainerEl.appendChild(eventEl);

                
                

            }
            
            
    }

function displayTicketPricing(prices)
    {
        var priceArr = prices._embedded.events;
        eventContainerEl.textContent = displayEvents();

        

        //loop over prices for events
        for(i = 0; i < priceArr.length; i++)
            {
                var priceRange = priceArray[i].url;
                console.log(priceRange);
                
                //create a container for price
                var priceRangeEl = document.createElement("a");

                var priceRangeTitleEl = document.createElement("span");
                priceRangeTitleEl.textContent = priceRange;

                //append to container
                priceRangeEl.appendChild(priceRangeTitleEl);

                eventContainerEl.appendChild(priceRangeEl);

            }
        
        
    }


searchFormEl.addEventListener("submit", formSubmitHandler);


const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// Show song and artist in DOM
function showData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
            .map(
                song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
            )
            .join('')}
    </ul>
  `;

    if (data.prev || data.next) {
        more.innerHTML = `
      ${
            data.prev
                ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
                : ''
            }
      ${
            data.next
                ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
                : ''
            }
    `;
    } else {
        more.innerHTML = '';
    }
}

// Get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

    //more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target;

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});








//api key
//OsK3mvfl7RepNMB8j29ox4Yz0DY3KYvU

//nashville DMA
//343