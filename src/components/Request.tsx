import { generateAvatarURL } from "@cfx-kit/wallet-avatar"
import { closeRequest, donate, RequestType} from "../services/Web3Service";
import Web3 from "web3"

export default function Request ( data: RequestType ){    

    function btnCloseClick(){
        if(!window.confirm("Tem certeza que deseja fechar este pedido?")) return;
        else{
            closeRequest(data.id)
            .then(result => {
                alert("Pedido fechado com sucesso. Em alguns minuto deixará de ser exibio no site")
                window.location.reload()
            })
            .catch(err => {
                console.error(err)
                alert(err.message)
            })
        }
    }
    function btnHelpClick(){
        const donationInBNB = prompt("O quanto deseja doar (em BNB)?", "0")
        if(donationInBNB !== null && parseFloat(donationInBNB) > 0){
            donate(data.id, parseFloat(donationInBNB))
            .then(result => {
                alert("Doação efetuada com sucesso. Em alguns minuto deixará de ser exibio no site")
                window.location.reload()
            })
            .catch(err => {
                console.error(err)
                alert(err.message)
            })
        }
        else return

    }
    return(
        <>
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                <img src={generateAvatarURL(data.author)} width = "32" height = "32" className="rounded-circle" />
                <div className="d-flex gap-2 w-100 justify-content-between ">
                    <div className="w-100">
                        <div className="row">
                            <div className="col-10">
                                <h6 className="mb-0">
                                    {data.title}
                                    &rsaquo;&rsaquo; 
                                    Contato: {data.contact}
                                </h6>
                            </div>
                            <div className="col-2">
                                <div className="text-end">
                                    {
                                        localStorage.getItem("wallet") == data.author.toLowerCase()
                                        ?<button type="button" className="btn btn-danger btn-sm" onClick={btnCloseClick}>Fechar</button>
                                        :<button type="button" className="btn btn-success btn-sm" onClick={btnHelpClick}>&#36; Ajudar</button> 
                                    }
                                </div>
                            </div>

                        </div>
                        <p className="opacity-75 pe-5 mb-0 me-5">{data.description}</p>
                        <div className="row">
                            <div className="col">
                                <span className="me-1 opacity-75">Meta:</span>
                                <span className="opacity-50">
                                    {
                                        data.balance > 0
                                        ? `BNB ${Web3.utils.fromWei(data.balance, "ether")} obtidos de ${Web3.utils.fromWei(data.goal, "ether")}`
                                        : `BNB ${Web3.utils.fromWei(data.goal, "ether")}`
                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )

}