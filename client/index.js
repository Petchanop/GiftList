const axios = require('axios');
const url = require('url');
const niceList = require('../utils/niceList.json');
const fakeProof = require('../utils/fakeproof');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);
const fakeTree = new MerkleTree(fakeProof);

const name = 'Norman Block'
const fakeName = 'Norman Blocky'

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const index = niceList.findIndex(n => n === name)
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift/`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name,
  });
  console.log({ gift });

  //Test for fakeIndex and fakeproof
  fakeIndex = fakeProof.findIndex(n => n === name)
  fakeproof = fakeTree.getProof(fakeIndex);
  const { data : fake } = await axios.post(`${serverUrl}/gift/`, {
    proof: fakeproof,
    name: name,
  });
  console.log({ fake });

  //Implement handle name not in the list later
}

main();