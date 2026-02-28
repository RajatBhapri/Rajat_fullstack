import debug from "debug";

const usersLog = debug("app:users");
const repoLog = debug("app:repo");

function updateUser() {
  usersLog("updating user");
  save();
}

function save() {
  repoLog("saving to db");
}

updateUser();