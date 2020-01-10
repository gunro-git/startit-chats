
const ATJAUNOT=5000;

async function lasiChatu(){

    const atbilde=await fetch('/chats/lasi');
    const datuObjekts= await atbilde.json();
    raadiChatuVienkaarsi(datuObjekts);

    await new Promise(resolve => setTimeout(resolve,ATJAUNOT));
    await lasiChatu();

}

function raadiChatuVienkaarsi(dati){
    const jaunaRinda= "</br>";
    let chats="";
    let chataDiv=document.getElementById("chats");

    for(let rinda of dati['chats']){
        chats=chats+rinda+jaunaRinda;
    }
    chataDiv.innerHTML=chats;
}

async function suutiZinju(){

    let zinjasElements=document.getElementById('zinja');
    let zinja=zinjasElements.value;
    zinjasElements.value="";

    const atbilde = await fetch('/chats/suuti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"chats": zinja})
    });

    const datuObjekts= await atbilde.json();

    raadiChatuVienkaarsi(datuObjekts);

}

let ievadesLauks = document.getElementById("zinja");
ievadesLauks.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        suutiZinju();
    }
})