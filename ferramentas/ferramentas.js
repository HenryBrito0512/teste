// 1. Metro e Pés (1m = 3.28084ft)
function metroParaPes(m) {
  return m * 3.28084;
}

function pesParaMetro(p) {
  return p / 3.28084;
}

// 2. Km e Milha (1km = 0.621371mi)
function kmParaMilha(km) {
  return km * 0.621371;
}

function milhaParaKm(mi) {
  return mi / 0.621371;
}

// 3. Cm e Polegada (1in = 2.54cm)
function cmParaPolegada(cm) {
  return cm / 2.54;
}

function polegadaParaCm(pol) {
  return pol * 2.54;
}

// 4. Kg e Libra (1kg = 2.20462lb)
function kgParaLibra(kg) {
  return kg * 2.20462;
}

function libraParaKg(lb) {
  return lb / 2.20462;
}

// 5. Fahrenheit e Celsius
function fahrParaCels(f) {
  return ((f - 32) * 5) / 9;
}

function celsParaFahr(c) {
  return (c * 9) / 5 + 32;
}

// 6. Kelvin e Celsius
function kelvinParaCels(k) {
  return k - 273.15;
}

function celsParaKelvin(c) {
  return c + 273.15;
}

// 7. Real e Dólar (Fixado a R$ 5.00 para teste)
function realParaDolar(brl) {
  return brl / 5.0;
}

function dolarParaReal(usd) {
  return usd * 5.0;
}

// 8. Real e Euro (Fixado a R$ 5.40 para teste)
function realParaEuro(brl) {
    return brl / 5.4;
}

function euroParaReal(eur) {
    return eur * 5.4;


}

// 9. Real e Won (Fixado: R$ 1 = 260 KRW)
function realParaWon(brl) {
  return brl * 260;
}

function wonParaReal(krw) {
  return krw / 260;
}

// 10. Horas e Milissegundos
function horasParaMs(h) {
  return h * 3600000;
}

function msParaHoras(ms) {
  return ms / 3600000;
}

// 11. Decimal e Binário
function decParaBin(dec) {
  return dec.toString(2);
}

function binParaDec(bin) {
  return parseInt(bin, 2);
}

// 12. Decimal e Hexadecimal
function decParaHex(dec) {
  return dec.toString(16).toUpperCase();
}

function hexParaDec(hex) {
  return parseInt(hex, 16);
}

// 13. Timestamp para Data/Hora amigável
function tsParaData(ts) {
  return new Date(ts).toLocaleString("pt-BR");
}

// 14. Rachador de contas
function racharConta(total, pessoas) {
  return total / pessoas;
}

// 15. Calculadora de percentual
function calcularPercentual(valor, porcentagem) {
  return (valor * porcentagem) / 100;
}

// 16. Aplicador de desconto
function aplicarDesconto(valor, descontoPct) {
  return valor - (valor * descontoPct) / 100;
}

// 17. Arredondador
function arredondar(valor, casas) {
  return Number(valor.toFixed(casas));
}

// 18. Diferença entre datas (retorna string amigável de dias)
function diferencaDatas(data1, data2) {
  const diffMs = Math.abs(new Date(data1) - new Date(data2));
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${dias} dia(s) de diferença`;
}

// Exportando as funções para o arquivo de testes
module.exports = {
  metroParaPes,
  pesParaMetro,
  kmParaMilha,
  milhaParaKm,
  cmParaPolegada,
  polegadaParaCm,
  kgParaLibra,
  libraParaKg,
  fahrParaCels,
  celsParaFahr,
  kelvinParaCels,
  celsParaKelvin,
  realParaDolar,
  dolarParaReal,
  realParaEuro,
  euroParaReal,
  realParaWon,
  wonParaReal,
  horasParaMs,
  msParaHoras,
  decParaBin,
  binParaDec,
  decParaHex,
  hexParaDec,
  tsParaData,
  racharConta,
  calcularPercentual,
  aplicarDesconto,
  arredondar,
  diferencaDatas,
};
