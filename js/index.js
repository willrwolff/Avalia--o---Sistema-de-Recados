document.querySelector("#entrar-login").addEventListener("click", (e) => {
    e.preventDefault();
  
    entrar();
  });
  
  function entrar() {
    const emailLogin = document.querySelector("#email-login");
    const senhaLogin = document.querySelector("#senha-login");
  
    let novoUsuario = [];
  
    novoUsuario = JSON.parse(localStorage.getItem("usuarios"));
  
    let usuario = { 
      email: " ",
      senha: " ",
    };
  
    novoUsuario.forEach((element) => {
      if (element.email === emailLogin.value && element.senha === senhaLogin.value) {
        usuario = {
          email: element.email,
          senha: element.senha,
        };
      }
    });
  
    if (usuario.email === emailLogin.value && usuario.senha === senhaLogin.value) {
        alert(`Seja bem vindo '${emailLogin.value}'!`)
        sessionStorage.setItem("logado", usuario.email);
        window.location.href = "recados.html";
    } else {
        alert("E-mail ou senha incorretos");
    }
}