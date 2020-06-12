axios.get('https://api.github.com/users/2cold2code')
     .then(response => {
       console.log(response)
       const {data} = response;
        }
      )
     .catch(err => console.log(err.errors))

     /*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/


/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const gitCall = (address) => axios.get(address);
function gitByUser(usrnm){
  gitCall(`https://api.github.com/users/${usrnm}`).then(response => userCards(response)).catch(e => console.log(e))
}
const me = "2Cold2Code";
const myGit = gitByUser(me);

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
*/

/*
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let followersArray = [];

/* Step 3: Create a function that accepts a single gitObject as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function userCards(gitObj) {
  const {data} = gitObj;
  
  const cards = document.querySelector(".cards");
  
  const card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);
  
  const img = document.createElement("img");
  img.setAttribute("src", data["avatar_url"]);
  card.appendChild(img);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  card.appendChild(cardInfo);
  
  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = data["name"];
  cardInfo.appendChild(name);
  
  const userName = document.createElement("p");
  userName.classList.add("username");
  userName.textContent = data["login"];
  cardInfo.appendChild(userName);
  
  const location = document.createElement("p");
  location.textContent = `Location: ${data["location"]}`;
  cardInfo.appendChild(location);
  
  const profile = document.createElement("p");
  cardInfo.appendChild(profile);
  
  const profileLink = document.createElement("a");
  profileLink.href = data["url"];
  profileLink.textContent = `Profile: ${profileLink.href}`;
  
  profile.appendChild(profileLink);
  
  const followers = document.createElement("p");
  followers.textContent = `Followers: ${data["followers"]}`;
  cardInfo.appendChild(followers);
  
  const followerURL = data["followers_url"];
  gitCall(followerURL).then((obj) => {
    obj.data.forEach((follower) => followersArray.push(follower.url))
  })
  .catch(error => console.log('Error \u{498f3}'));
  
  const following = document.createElement("p");
  following.textContent = `Following: ${data["following"]}`;
  cardInfo.appendChild(following);
}
