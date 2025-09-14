const axios = require('axios');

// Teste de UTF-8 com caracteres especiais
const testData = {
  id: 1,
  name: "Tema Padrão",
  mainColor: "#007bff",
  primaryColor: "#007bff",
  secondaryColor: "#6c757d",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  logo: "https://example.com/logo.png",
  menuLinks: JSON.stringify([
    { name: "Início", url: "/", icon: "home" },
    { name: "Imóveis", url: "/imoveis", icon: "building" }
  ]),
  services: JSON.stringify([
    { title: "Consultoria", description: "Serviços de consultoria imobiliária", icon: "consulting" }
  ]),
  socialLinks: JSON.stringify([
    { platform: "Facebook", url: "https://facebook.com", icon: "facebook" }
  ]),
  tenantId: 1
};

axios.put('http://localhost:8080/api/themes/1', testData, {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
.then(response => {
  console.log('Sucesso:', response.data);
})
.catch(error => {
  console.error('Erro:', error.response ? error.response.data : error.message);
});