const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getArtifact() {
    let pr = process.env.PR_NUMBER;
    let arr = [];
    try {
        let get = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts', {
            owner: process.env.PR_OWNER,
            repo:  process.env.PR_REPO,
            run_id: process.env.PR_RUN_ID
            pull_number: pr
        });
        let files = get.data;
        files.forEach(file => {
            arr.push(file.filename)
        });
    } catch(e) {
        throw e;
    }
    let output = arr.join(' ');
    core.info(`Artifacts: ${output}`);
    core.setOutput('artifacts', output);
}

getArtifact().catch(err => {
    console.log(err);
    process.exit(1); 
});
