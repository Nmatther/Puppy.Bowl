const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2308-acc-et-web-pt-a';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const mainEL = document.querySelector('main');
const formEl = document.querySelector('form');
const dogName = document.querySelector('#dogName'); 
const dogBreed = document.querySelector('#dogBreed'); 
const dogTeam = document.querySelector('#teamId'); 
const dogStatus = document.querySelector('#status'); 
const dogImgUrl = document.querySelector('#imgUrl'); 

const state = {playerList: [],
};
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();
        console.log(data.data);
        return data.data;

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`);
        const data = await response.json();
        return data.data.player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

mainEL.addEventListener('click', async (event) => {
    if(event.target.matches(".deleteButton")){
        const id = event.target.dataset.id;
        await fetch (`${APIURL}/${id}`, {
            method: 'DELETE',
        });
        init();
    }
});

mainEL.addEventListener('click', async (event) => {
    if(event.target.matches(".moreDetails")){
        const id = event.target.dataset.id;
        const singlePlayer = await fetchSinglePlayer(id);
        renderSinglePlayer(singlePlayer);
    }
})

mainEL.addEventListener('click', async (event) => {
    if(event.target.matches(".returnButton")){
        init();
    }
})
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
function renderAllPlayers(playerList)  {
    try {
        const template = playerList.players.map(list => {
            return (

                `<div class="card">
                    <h3>${list.name}</h3>
                    <div class="image">
                        <img id="pic" src="${list.imageUrl}">
                    </div>

                    <div class="Dog-info">
                        <span class="info" id="Breed">${list.breed}</span>
                        <span class="info" id="teamId">Team: ${list.teamId} </span>
                        <span class="info" id="Status">Status: ${list.status}</span>
                    </div>

                    <div class="Button">
                    <button class="moreDetails" data-id="${list.id}">More Details</button>
                    <button data-id="${list.id}" class="deleteButton">Delete</button>
                    </div>
                </div>`
            )
        }).join('');
        mainEL.innerHTML = template;

        
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

function renderSinglePlayer(singlePlayer){
    try {
        const singleTemplate = 
                `<div class="card">
                    <h3>${singlePlayer.name}</h3>
                    <div class="image">
                        <img id="pic" src="${singlePlayer.imageUrl}">
                    </div>
                    <div class="Dog-info">
                        <span class="info" id="Breed">${singlePlayer.breed}</span>
                        <span class="info" id="teamId">Team: ${singlePlayer.teamId} </span>
                        <span class="info" id="Status">Status: ${singlePlayer.status}</span>
                        <span class="info" id="createdAt">Created at: ${singlePlayer.createdAt}</span>
                        <span class="info" id="updatedAt">Updated at: ${singlePlayer.updatedAt}</span>

                    </div>
                    <div class="Button">
                    <button class= "returnButton">Return</Button>
                    </div>

                </div>`
        mainEL.innerHTML = singleTemplate;
    } catch (err) {
        console.error('Uh oh, trouble rendering Single player!', err);
    }

    }



const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

}

init();

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        await fetch(APIURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: dogName.value,
              breed: dogBreed.value,
              imageUrl: dogImgUrl.value,
              teamId: teamId.value,
              status: Status.value,
            })
          });
        
          dogName.value = '';
          dogBreed.value = '';
          imgUrl.value = '';
          teamId.value = '';
          Status.value = '';
        
          init();
        } catch (err) {
          console.error(err);
        }
      });


 


