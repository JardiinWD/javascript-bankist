'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/** Funzione che mostra a schermo i movimenti
 * 
 * @param {object} movements Array di movimenti 
 */
const displayMovement = function (movements) {
  // Svuotare il container dai dati iniziali
  containerMovements.innerHTML = '';
  movements.forEach((movement, index) => {

    // Decidere classi in caso di operazione positiva (deposito) o negativa
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal'

    const htmlMovement =
      `
      <div class="movements__row">
        <!-- /.movements__type movements__type--deposit -->
        <div class="movements__type movements__type--${typeMovement}">${index + 1} ${typeMovement}</div>
        <!-- /.movements__value -->
        <div class="movements__value">${movement}€</div>
      </div>
      `
    // Inietto nel Container le nuove Row dinamiche
    containerMovements.insertAdjacentHTML('afterbegin', htmlMovement)
  })
}
displayMovement(account1.movements)

/**
 * 
 * @param {object} accs Array di Account
 * @returns 
 */
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map((word) => word[0]).join('')
    // console.log(username); // output stw
    // ora rendo tutto in lowercase ed eseguo uno split in base agli spazi vuoti
    // Eseguo anche il map sull'array che viene generato tramite split
    // Selezionando la prima lettera di ogni parola. Poichè al metodo Map è ancora un array
    // tramite join trasformo in una singola parola con le sole iniziali
    console.log(acc.username);
  })
}

// Computing Username
console.log("Verifica degli username della funzione");
console.log(createUsernames(accounts))
console.log("--------------------");
console.log("Verifica del mio array di oggetti");
console.log(accounts);
console.log("--------------------");


const depositsFilter = movements.filter(element => element > 0)
console.log("Questo array filtrato per depositi");
console.log(depositsFilter);
console.log("-------------");
// Ora guardo i Ritiri da parte dell'utente
const withdrawlFilter = movements.filter(element => element < 0)
console.log("Questo array filtrato per Ritiri");
console.log(withdrawlFilter);
console.log("-------------");

// Mostro a display il mio current balance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = `${balance}€`
}
// Invoco la mia function
calcDisplayBalance(account1.movements)

const calcDisplaySummary = function (movements) {
  // Entrate
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  // Uscite  
  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  // Interesse
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2 / 100)
    // Solo se interessi maggiori o uguali a 1
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0)
  // Aggiungo la mia variabile incomes e la mostro nel DOM
  labelSumIn.textContent = `${incomes}€`
  labelSumOut.textContent = `${Math.abs(outcomes)}€`
  labelSumInterest.textContent = `${interest}€`
}
// Invoco funzione per i label
calcDisplaySummary(account1.movements)

const maxMovements = movements.reduce((acc, cur) => {
  // console.log(cur); // Questi i singoli valori dell'array
  // Se l'accumulator fosse più grande del current value
  if (acc > cur) {
    console.log(`Il valore accumulator (${acc}) è più alto del valore current (${cur})`);
    return acc // Return dell'accumulatore
  } else {
    console.log(`Il valore current (${cur}) è più alto del valore accumulator (${acc})`);
    return cur // Return del current
  }
  // Come valore iniziale prendiamo primo numero dell'array
}, movements[0])

console.log("Questo è il numero più alto nell'array di Movements");
console.log(maxMovements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



