const maiusculoStr = "ABCDEFGHIJLMNOPQRSTUVWXYZ";
const minusculoStr = "abcdefghijklmnopqrstuvwxyz";
const numeroStr = "0123456789";

export function criaSenha(tamanho = 6) {
  const padrao = maiusculoStr + minusculoStr + numeroStr;
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const numeroRandomico = Math.floor(Math.random() * padrao.length);
    senha += padrao.substring(numeroRandomico, numeroRandomico + 1);
  }

  return senha;
}