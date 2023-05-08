require('dotenv-expand').expand(require('dotenv').config())
const core = require("@actions/core");
const {context} = require('@actions/github')
const {Octokit} = require('@octokit/rest')

async function main() {
    const octokit = new Octokit({auth: core.getInput('github_token')});
    const {owner, repo} = context.repo;
    const issue_number = context.payload.number
    const labels = core.getInput("labels").split("\n").filter((x) => x !== "")
    const overwrite = core.getInput('overwrite') === 'true'
    overwrite && await octokit.issues.removeAllLabels({owner, repo, issue_number})
    core.info(`adding labels: ${labels.join('; ')}`)
    await octokit.issues.addLabels({owner, repo, labels, issue_number});
}

main().catch(err => core.setFailed(err));