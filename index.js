const { Bitbucket } = require("bitbucket");
const yargs = require("yargs");

const { getNewPackageJson } = require("./utils.js");
const { auth, workspace, repo_slug } = require("./config");

const bitbucket = new Bitbucket({ auth });

const options = yargs
  .usage("Usage: -n <name>")
  .option("n", {
    alias: "name",
    describe: "Name of the app with optional version after @",
    type: "string",
    demandOption: true,
  }).argv;

const setPackageJSONContent = async (options) => {
  const { data } = await bitbucket.repositories.get({
    workspace,
    repo_slug: `${repo_slug}/src/master/package.json`,
  });
  console.log("Package.json updating...");
  return getNewPackageJson(data, options);
};

const createACommit = async (JSONContent) => {
  const option = {
    _body: {
      "package.json": await JSONContent,
      branch: "updateDependency",
    },
    workspace,
    repo_slug: "firect",
  };
  console.log("Package.json updated");
  console.log("Committing changes...");
  await bitbucket.repositories.createSrcFileCommit(
    option
  );
  console.log("Changes committed");
};

const createPullRequest = async () => {
    await createACommit(setPackageJSONContent(options));
    console.log("Creating Pull Request");
    const body = {
        title: "Update some dependencies",
        source: {
            branch: {
                name: "updateDependency",
            }
        }
    }
    const {data} = await bitbucket.repositories.createPullRequest({ _body: body, repo_slug, workspace });
    console.log("Pull request created successfully");
    console.log("Go to your PR", data.links.self.href);
    return data.links.self.href;
}


createPullRequest();