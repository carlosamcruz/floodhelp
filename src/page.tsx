//"use client"
import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Request from "./components/Request";
import { getOpenRequests, RequestType } from "./services/Web3Service";

export default function Home() {

  //const [requests, setRequests] = useState([])
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(()=>{

    loadRequests(0)

  }, [])

  async function loadRequests(lastId: number){

    try{

      //const result = await getOpenRequests()
      //const result: RequestType[] = await getOpenRequests()
      let result: RequestType[] | undefined;
      result = await getOpenRequests()

      if(result){

        console.log("Requests: ", result)
        if(lastId === 0)
          setRequests(result)
        else{
          requests.push(...result)
          setRequests(requests)
        } 
      }
    }
    catch(err){

      console.error(err)
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  
  }

  return (

    <>

      <Header/>

      <div className="container">

        <div className="row ps-5">
          <p className="lead m-4"> Ajude vítimas de desastres natuais </p>

        </div>
        <div className="p-4 mx-5">

          <div className="list-group ">

            {
              requests && requests.length > 0
              ?
              //requests.map( (rq: RequestType) => <Request key={rq.id} data={rq}/>)
              //requests.map( (rq: RequestType) => <Request key={rq.id} data={rq}/>)
              requests.map( (rq: RequestType) => 
              <Request id={rq.id} 
                        author={rq.author} 
                        title={rq.title} 
                        description={rq.description} 
                        contact={rq.contact} 
                        timestamp={rq.timestamp} 
                        goal={rq.goal} 
                        balance={rq.balance} 
                        open={rq.open}/>)
              //<>Conect sua carteira MetaMask para pedir ajuda!!!</>
              :
              <>Conect sua carteira MetaMask para pedir ajuda!!!</>
            }

          </div>

        </div>

        <Footer/>

      </div>

    </>

 
  );
}