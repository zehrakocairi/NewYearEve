const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = search.value;

  if (username) {
    getUser(username);
    getRepos(username);
  } else alert("Please enter user");

  search.value = "";
});

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const user = await resp.json();

  showUser(user);
}

function showUser(user) {
  if (user.bio == null) {
    user.bio = "";
  }

  if (user.message !== "Not Found") {
    main.innerHTML = `<div class="card">
<div class="user-image">
  <img
    src=${user.avatar_url}
    alt=""
    class="avatar"
  />
</div>
<div class="user-info">
  <div class="name">
    <h4>${user.name}</h4>
    </div>
  <div class="desc">
  <p>${user.bio}</p>
  </div>
  <div class="movements">
    <p><strong>${user.followers}</strong> Followers</p>
    <p><strong>${user.following}</strong> Following</p>
    <p><strong>${user.public_repos}</strong> Repos</p>
  </div>
  <div id="repos">
  <div>
    <h5>Repos:</h5>
  </div>
  <div id="repoEls">
  </div>
  </div>
</div>
</div>`;
  } else alert("There is no such user");
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const repos = await resp.json();

  showRepos(repos);
}

function showRepos(repos) {
  const reposEls = document.getElementById("repoEls");

  repos.slice(0, 10).forEach((repo) => {
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.innerHTML = `${repo.name}`;
    reposEls.appendChild(link);
  });
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let user = search.value;
//   if (user) {
//     getUser(user);
//
//   }
// });
