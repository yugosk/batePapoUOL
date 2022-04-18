let usuario
pedirNome();
function pedirNome() {
    usuario = prompt("Qual o seu lindo nome?");
    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: usuario
    });
    request.then(mensagensAntigas);
    request.catch(usuarioInvalido);
}

function usuarioInvalido() {
    alert("Usuário já conectado, digite outro nome");
    pedirNome();
}

function mensagensAntigas() {
    console.log("carregando chat")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarChat);
};

function carregarChat(promise) {
    const chat = document.querySelector("ul");
    for (let i=0; i<promise.data.length; i++) {
        switch(promise.data[i].type) {
            case("status"):
            chat.innerHTML += `<li class="status"> 
            <p> <em>(${promise.data[i].time})</em>  <strong>${promise.data[i].from}</strong> ${promise.data[i].text}</p>
            </li>`;
            break;
            case("message"):
            chat.innerHTML += `<li class="publica">
            <p> <em>(${promise.data[i].time})</em>  <strong>${promise.data[i].from}</strong> para <strong>${promise.data[i].to}</strong>: ${promise.data[i].text}</p>
            </li>`;
            break;
            case("private_message"):
            if (promise.data[i].to === usuario && promise.data[i].from === usuario)
            chat.innerHTML += `<li class="reservada">
            <p> <em>(${promise.data[i].time})</em>  <strong>${promise.data[i].from}</strong> para <strong>${promise.data[i].to}</strong>: ${promise.data[i].text}</p>
            </li>`;
            break;
        }
    }
    chat.lastChild.scrollIntoView();
    console.log(promise.data)
}
