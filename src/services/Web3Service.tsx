import Web3 from "web3"

import FloodHelp from './FloodHelp.json'
//https://testnet.bscscan.com/address/0x1e5dbbe1eafc4b6dd581472982062902d953330c
const CONTRACT_ADDRESS = "0xac964DCA8965a27E815f02537A6832Ac5509aEDb"

export interface RequestType {
    id: number;
    author: string;
    title: string;
    description: string;
    contact: string;
    timestamp: number;
    goal: number;
    balance: number;
    open: boolean;
}

export async function doLogin(){
    if(!window.ethereum) throw new Error("Sem MetaMask instalada");

    const web3 = new Web3 (window.ethereum);

    const accounts = await web3.eth.requestAccounts();

    if(!accounts || !accounts.length) throw new Error("Carteira Não Permitida");

    localStorage.setItem("wallet", accounts[0].toLowerCase())

    return accounts[0];
}

export async function doLogout(){
    if(localStorage.getItem('wallet')){
        localStorage.removeItem("wallet")
    }       
}

function getContract(){

    if(!window.ethereum) throw new Error("Sem MetaMask instalada");

    const from = localStorage.getItem("wallet")

    if(from){
        const web3 = new Web3 (window.ethereum);
        return new web3.eth.Contract(FloodHelp.abi, CONTRACT_ADDRESS, { from })
    }
}

function filter(requests: RequestType[], title: string){
    let result: RequestType[] = [];

    for( let i = 0; i < requests.length; i++)
        if (requests[i].title != title) 
            result.push(requests[i])
    return result
}

export async function getOpenRequests(lastId = 0){

    const contract = getContract();

    if(contract){
        //const requests = await contract.methods.getOpenRequests(lastId + 1, 10).call()
        const requests: RequestType[] = await contract.methods.getOpenRequests(lastId + 1, 10).call()
        if(requests){
            
            return filter(requests, "")

        }                 
    }
}

//export async function openRequest({title = "", description = "", contact ="", goal = 0}){
export async function openRequest({title, description, contact, goal}: { 
    title: string; 
    description: string; 
    contact: string; 
    goal: number 
}){

    const contract = getContract();
    if(contract)
        return await contract.methods.openRequest(title, description, contact, Web3.utils.toWei(goal, "ether")).send()
}

export async function closeRequest(id = 0){

    const contract = getContract();
    if(contract)
        return await contract.methods.closeRequest(id).send()
}

export async function donate(id = 0, donationInBNB = 0){

    const contract = getContract();
    if(contract)
        return await contract.methods.donate(id, donationInBNB).send({
            value: Web3.utils.toWei(donationInBNB, "ether")
        })
}