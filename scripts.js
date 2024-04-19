/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/reservas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.reservas.forEach(item => insertList(item.nome, item.email, item.cpf, item.dataReserva, item.telefone, item.nasc))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputNome, inputEmail, inputCpf, inputDataReserva, inputTelefone, inputNasc) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('email', inputEmail);
    formData.append('cpf', inputCpf);
    formData.append('reserva', inputDataReserva);
    formData.append('telefone', inputTelefone);
    formData.append('dataNasc', inputNasc);

    let url = 'http://127.0.0.1:5000/reserva';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/reserva?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputNome = document.getElementById("inome").value;
    let inputEmail = document.getElementById("iemail").value;
    let inputDataReserva = document.getElementById("idataReserva").value;
    let inputCpf = document.getElementById("icpf").value;
    let inputTelefone = document.getElementById("itelefone").value;
    let inputNasc = document.getElementById("idataNasc").value;
  
    if (inputNome === '' || inputCpf === '' || inputEmail === '' || inputDataReserva === '' || inputTelefone === '' || inputNasc === '') {
      alert("Preencha todos os campos!");
    } else {
      insertList(inputNome, inputEmail, inputCpf, inputDataReserva, inputTelefone, inputNasc)
      postItem(inputNome, inputEmail, inputCpf, inputDataReserva, inputTelefone, inputNasc)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nome, email, cpf, dataReserva, telefone, dataNasc) => {
    var item = [cpf, nome, dataReserva]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))

    document.getElementById("inome").value = "";
    document.getElementById("iemail").value = "";
    document.getElementById("idataReserva").value = "";
    document.getElementById("icpf").value = "";
    document.getElementById("itelefone").value = "";
    document.getElementById("idataNasc").value = "";
  
    removeElement()
  }