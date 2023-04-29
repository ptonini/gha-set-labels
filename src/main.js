require('dotenv-expand').expand(require('dotenv').config())
const core = require("@actions/core");
const {GitHub, context} = require("@actions/github");

async function main() {
    const octokit = new GitHub(core.getInput('github_token'));
    const {owner, repo} = context.repo;
    const issue_number = context.payload.number
    const labels = core.getInput("labels").split("\n").filter((x) => x !== "");
    labels.forEach(label => core.info(`adding label: ${label}`))
    await octokit.issues.addLabels({owner, repo, labels, issue_number});
}

main().catch(err => core.setFailed(err));