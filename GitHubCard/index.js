const followersArray = [];

function gitByUser(usrnm) {
  axios
    .get(`https://api.github.com/users/${usrnm}`)
    .then((response) => userCards(response))
    .catch((e) => console.log(e));
}
const me = "2Cold2Code";
const myGit = gitByUser(me);

let followersArray = [];

function userCards(gitObj) {
  const { data } = gitObj;

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
  gitByUser(followerURL)
    .then((obj) => {
      obj.data.forEach((follower) => followersArray.push(follower.url));
    })
    .catch((error) => console.log("Error \u{498f3}"));

  const following = document.createElement("p");
  following.textContent = `Following: ${data["following"]}`;
  cardInfo.appendChild(following);

  const bio = document.createElement("p");
  bio.textContent = `Bio: ${data["bio"]}`;
  cardInfo.appendChild(bio);

  return cards;
}

myGit
  .then((response) => userCards(response))
  .catch((err) => console.log("error \u{02970}\u{02964} ", err));

myGit
  .then((myGitObject) => gitByUser(myGitObject.data.followers_url))
  .then((urls) =>
    urls.data.forEach((URL) =>
      gitByUser(URL.url)
        .then((usernameURL) => {
          userCards(usernameURL);
          followersArray.forEach((name) =>
            gitByUser(name)
              .then((nameObj) => userCards(nameObj.data))
              .catch((error) => console.log("error \u{0f98a}"))
          );
        })
        .catch((e) => console.log(e))
    )
  )
  .catch((err) => console.log(err))
  .catch((e) => console.log("inner error: \u{04f348} ", e))
  .catch((e) => console.log("Error \u{02970}\u{02964}", e));

let TLs = ["dustinmyers", "tetondan", "justsml", "luishrd", "bigknell"];
TLs.forEach((tl) => gitByUser(tl));
