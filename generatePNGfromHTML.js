const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');

const image = fs.readFileSync('./image.jpg');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image

nodeHtmlToImage({
  output: './image.png',
  html: '<html><body><img src="{{imageSource}}" /></body></html>',
  content: { imageSource: dataURI }
})




/*
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const image = fs.readFileSync('./hexagonal-as-onion.png');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/png;base64,' + base64Image


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

nodeHtmlToImage({
  output: './TEST.png',
  html: '<html><body><img src="{{imageSource}}" /></body></html>',
  content: { imageSource: dataURI }
})
*/
