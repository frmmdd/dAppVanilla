import './style.css'

const app = document.querySelector('#app');

const heading = document.createElement('h1');
heading.textContent = 'This is my dApp!';

const paragraph = document.createElement('p');
paragraph.textContent = 'Here we can set or get the mood:';

const label = document.createElement('label');
label.className = 'mood';
label.textContent = 'Input Mood:';
label.style.display = 'block';

const input = document.createElement('input');
input.id = 'mood';
input.type = 'text';
input.style.display = 'block';
input.style.margin = 'auto';
input.style.marginTop = '16px';
input.style.outline = 'none';
input.style.paddingInline = '16px';
input.style.paddingBlock = '8px';

const getMood = document.createElement('button');
getMood.textContent = 'Get Mood';
getMood.style.margin = '16px 16px 16px 0';
getMood.style.padding = '16px';
getMood.style.backgroundColor = '#6507FF';
getMood.style.color = '#FCEAFF';
getMood.style.border = 'none';
getMood.style.borderRadius = '25px';

const setMood = document.createElement('button');
setMood.textContent = 'Set Mood';
setMood.style.padding = '16px';
setMood.style.backgroundColor = '#FF0075'
setMood.style.color = '#FCEAFF';
setMood.style.border = 'none';
setMood.style.borderRadius = '25px';

const MoodContractAddress = "0xea332f7eC8F800CeB96B75f3141d957a8CFCa925";
const MoodContractABI = [
            {
              "inputs": [],
              "name": "getMood",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_mood",
                  "type": "string"
                }
              ],
              "name": "setMood",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]
let MoodContract;
let signer;
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

getMood.addEventListener('click', () => {
  const getMoodPromise = MoodContract.getMood();
  const Mood = getMoodPromise;
  console.log(Mood);
});

setMood.addEventListener('click', () => {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  setMoodPromise;
});

app.appendChild(heading);
app.appendChild(paragraph);
app.appendChild(label);
app.appendChild(input);
app.appendChild(getMood);
app.appendChild(setMood);