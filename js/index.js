const GITHUBUSERAPI = "https://api.github.com/users";

function asynchronousRequestProcessing(generator, prevValue) {
  const functionGenerator = generator.next(prevValue);

  if (!functionGenerator.done) {
    functionGenerator.value
      .then((res) => {
        asynchronousRequestProcessing(generator, res);
      })
      .catch((err) => {
        generator.throw(new Error(err));
      });
  }
}

function getGithubData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

function* getAsynchronouslyGithubUserData() {
  const userData = yield getGithubData(`${GITHUBUSERAPI}/ikrom-murodov`);
  console.log(userData);

  const userFollowersData = yield getGithubData(userData.followers_url);
  console.log(userFollowersData);

  const userFollowingData = yield getGithubData(`${userData.url}/following`);
  console.log(userFollowingData);
}

asynchronousRequestProcessing(getAsynchronouslyGithubUserData());
