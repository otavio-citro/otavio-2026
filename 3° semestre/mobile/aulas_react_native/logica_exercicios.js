// Exercícios de Lógica de Programação
// Arquivo separado para praticar lógica em JavaScript (compatível com React Native)

// Exercício 1: Verificar se um número é par ou ímpar
export function isParOuImpar(numero) {
  return numero % 2 === 0 ? 'Par' : 'Ímpar';
}

// Exercício 2: Calcular fatorial de um número
export function fatorial(n) {
  if (n < 0) return 'Número inválido';
  if (n === 0 || n === 1) return 1;
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

// Exercício 3: Verificar se é palíndromo
export function isPalindromo(str) {
  const limpa = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return limpa === limpa.split('').reverse().join('');
}

// Exercício 4: FizzBuzz (1 a 100)
export function fizzBuzz() {
  const resultado = [];
  for (let i = 1; i <= 100; i++) {
if (i % 3 === 0 && i % 5 === 0) {
      resultado.push('FizzBuzz');
    } else if (i % 3 === 0) {
      resultado.push('Fizz');
    } else if (i % 5 === 0) {
      resultado.push('Buzz');
    } else {
      resultado.push(i.toString());
    }
  }
  return resultado;
}

// Exercício 5: Inverter string sem reverse()
export function inverterString(str) {
  let resultado = '';
  for (let i = str.length - 1; i >= 0; i--) {
    resultado += str[i];
  }
  return resultado;
}

// Exercício 6: Encontrar maior número em array
export function maiorNumero(arr) {
  if (arr.length === 0) return null;
  let maior = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maior) {
      maior = arr[i];
    }
  }
  return maior;
}

// Exercício 7: Somar números pares em array
export function somaPares(arr) {
  let soma = 0;
  for (let num of arr) {
    if (num % 2 === 0) {
      soma += num;
    }
  }
  return soma;
}

// Exemplos de uso (rode no console ou integre no App.js)
// console.log(isParOuImpar(5)); // 'Ímpar'
// console.log(fatorial(5)); // 120
// console.log(isPalindromo('radar')); // true
// console.log(fizzBuzz().slice(0, 10)); // Primeiros 10
// console.log(inverterString('olá')); // 'aló'
// console.log(maiorNumero([1, 5, 3, 9, 2])); // 9
// console.log(somaPares([1, 2, 3, 4, 5, 6])); // 12

// Para testar no React Native, importe e use em um componente:
// import { isParOuImpar, fatorial } from './logica_exercicios';
