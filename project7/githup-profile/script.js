const APIURL = "https://api.github.com/users/";

let main = document.getElementById("main");
let form = document.getElementById("form");
let search = document.getElementById("search");

async function getUser(user) {
  const resp = await fetch(APIURL + user);
  const respData = await resp.json();

  createUserCard(respData);
}

function createUserCard(user) {
  const userHTML = `<div class="card">
    <div class="user-image">
      <img
        src="https://thumbs.dreamstime.com/b/cute-vector-girl-avatar-icon-happy-woman-red-lips-pretty-cute-vector-girl-avatar-icon-happy-woman-red-lips-pretty-lady-108313736.jpg"
        alt=""
        class="avatar"
      />
    </div>
    <div class="user-info">
      <div class="name">
        <h4>Zehra Kocairi</h4>
        <p>Frontend software developer</p>
      </div>
      <div class="desc">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </div>
      <div class="movements">
        <p>464 <strong>Followers</strong></p>
        <p>462 <strong>Following</strong></p>
        <p>24 <strong>Repos</strong></p>
      </div>
      <div>
        <h5>Repos:</h5>
      </div>
    </div>
  </div>`;
  main.innerHTML = userHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
