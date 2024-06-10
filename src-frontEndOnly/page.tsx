import Footer from "./components/Footer";
import Header from "./components/Header";

//import { DefaultProvider, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString } from "scrypt-ts";

export default function Home() {


  //let homenetwork = bsv.Networks.testnet;

  return (
    <>
      <Header/>

      <div className="container">

        <div className="row ps-5">
          <p className="lead m-4"> Ajude vítimas de desastres natuais </p>

        </div>
        <div className="p-4 mx-5">

        </div>

        <Footer/>

      </div>

    </> 
  );
}