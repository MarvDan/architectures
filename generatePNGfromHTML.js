const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function selectChangedFiles() {
    let pr = process.env.PR_NUMBER;
    let arr = [];
    try {
        let get = await octokit.request('GET /target/generated-docs/website/pages/architectures/solutions/{solution}', {
            owner: process.env.PR_SOLUTION,
            repo:  process.env.PR_REPO,
            pull_number: pr
        });
        let files = get.data;
        files.forEach(file => {
            arr.push(file.filename)
        });
        
       core.info(`Changed Files1: ${get}`);
       core.setOutput('changedFiles1', get);
        
       core.info(`Changed Files2: ${files}`);
       core.setOutput('changedFiles2', files);
        
    } catch(e) {
        throw e;
    }
    let output = arr.join(' ');
    core.info(`Changed Files: ${output}`);
    core.setOutput('changedFiles', output);
}

selectChangedFiles().catch(err => {
    console.log(err);
    process.exit(1); 
});

/*
async function selectChangedFiles() {
    let pr = process.env.PR_NUMBER;
    let arr = [];
    try {
        let get = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
            owner: process.env.PR_OWNER,
            repo:  process.env.PR_REPO,
            pull_number: pr
        });
        let files = get.data;
        files.forEach(file => {
            arr.push(file.filename)
        });
        
       core.info(`Changed Files1: ${get}`);
       core.setOutput('changedFiles1', get);
        
       core.info(`Changed Files2: ${files}`);
       core.setOutput('changedFiles2', files);
        
    } catch(e) {
        throw e;
    }
    let output = arr.join(' ');
    core.info(`Changed Files: ${output}`);
    core.setOutput('changedFiles', output);
}

selectChangedFiles().catch(err => {
    console.log(err);
    process.exit(1); 
});
*/

//const image = fs.readFileSync('./image.jpg');
//const base64Image = new Buffer.from(image).toString('base64');
//const dataURI = 'data:image/jpeg;base64,' + base64Image

//nodeHtmlToImage({
  //output: './TEST.png',
  //html: '<html><body><img src="{{imageSource}}" /></body></html>',
  //content: { imageSource: dataURI }
//})






/*
const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const image = fs.readFileSync('./hexagonal-as-onion.png');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/png;base64,' + base64Image

async function selectChangedFiles() {
let pr = process.env.PR_NUMBER;
let arr = [];
try {
      let get = await octokit.request('GET /target/generated-docs/website/pages/architectures/solutions/{solution}', {
            solution: process.env.PR_SOLUTION,
            pull_number: pr
        });
  
       let files = get.data;
  
       files.forEach(file => {
            arr.push(file.filename)
        });
  
    } catch(e) {
      throw e;
}
}
nodeHtmlToImage({
  output: './TEST.png',
  html: '<html><body><img src="{{imageSource}}" /></body></html>',
  content: { imageSource: dataURI }
})
*/
