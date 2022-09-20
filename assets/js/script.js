'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
const displayMovement = function (acc, sort = false) {
  // Svuotare il container dai dati iniziali
  containerMovements.innerHTML = '';
  // Ordinamento ascendente dei valori (depositi e ritiri)
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements
  movs.forEach((movement, index) => {

    // Decidere classi in caso di operazione positiva (deposito) o negativa
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal'

    // prendo le date dall'array con il suo Indice
    const date = new Date(acc.movementsDates[index])
    const day = `${date.getDate()}`.padStart(2, 0)
    const month = `${date.getMonth() + 1}`.padStart(2, 0)
    const year = date.getFullYear()
    const displayDate = `${day}/${month}/${year}`

    const htmlMovement =
      `
      <div class="movements__row">
        <!-- /.movements__type movements__type--deposit -->
        <div class="movements__type movements__type--${typeMovement}">${index + 1} ${typeMovement}</div>
        <!-- /.movements__date -->
        <div class="movements__date">${displayDate}</div>
        <!-- /.movements__value -->
        <div class="movements__value">${movement.toFixed(2)}€</div>
      </div>
      `
    // Inietto nel Container le nuove Row dinamiche
    containerMovements.insertAdjacentHTML('afterbegin', htmlMovement)
  })
}

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
// console.log("Verifica degli username della funzione");
console.log(createUsernames(accounts))
// console.log("--------------------");
// console.log("Verifica del mio array di oggetti");
// console.log(accounts);
// console.log("--------------------");

// Ora guardo i depositi sul conto dell'utente
const depositsFilter = movements.filter(element => element > 0)
// Ora guardo i Ritiri da parte dell'utente
const withdrawlFilter = movements.filter(element => element < 0)
// console.log("Questo array filtrato per depositi");
// console.log(depositsFilter);
// console.log("-------------");
// console.log("Questo array filtrato per Ritiri");
// console.log(withdrawlFilter);
// console.log("-------------");

// Mostro a display il mio current balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0)
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`
}

const calcDisplaySummary = function (acc) {
  // Entrate
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  // Uscite  
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  // Interesse
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    // Solo se interessi maggiori o uguali a 1
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0)
  // Aggiungo la mia variabile incomes e la mostro nel DOM
  labelSumIn.textContent = `${incomes.toFixed(2)}€`
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
}

const maxMovements = movements.reduce((acc, cur) => {
  // console.log(cur); // Questi i singoli valori dell'array
  // Se l'accumulator fosse più grande del current value
  if (acc > cur) {
    // console.log(`Il valore accumulator (${acc}) è più alto del valore current (${cur})`);
    return acc // Return dell'accumulatore
  } else {
    // console.log(`Il valore current (${cur}) è più alto del valore accumulator (${acc})`);
    return cur // Return del current
  }
  // Come valore iniziale prendiamo primo numero dell'array
}, movements[0])

// onsole.log("Questo è il numero più alto nell'array di Movements");
// console.log(maxMovements);

const updateUI = (acc) => {
  // Mostra Movimenti per il singolo account
  displayMovement(acc)
  // Mostra il bilancio
  calcDisplayBalance(acc)
  // Mostra il sommario
  calcDisplaySummary(acc)
}

// Evento al Click per il login
let currentAccount; // Dichiaro senza assegnare

// Fake always login
currentAccount = account1
updateUI(currentAccount)
containerApp.style.opacity = 100;

// Button al Login iniziale
btnLogin.addEventListener('click', (e) => {
  e.preventDefault() // Previene il reload al click
  console.log("Login"); // Verifica in console
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) // Verifica se Owner sia uguale al login
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log("Si, il pin è giusto");
    labelWelcome.textContent = `Benvenuto, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100; // Metti opacità a 100

    // Data Corrente
    const now = new Date()
    // Giorno corrente (x padStart da trasformare prima in stringa)
    // Tramite PadStart evito ogni volta di scrivere 0 di fronte a un numero
    // Quindi se sarà una sola cifra, sarà accompagnata dallo 0 iniziale
    // altrimenti, se già ha due cifre, non sarà presente lo 0
    const day = `${now.getDate()}`.padStart(2, 0)
    // Mese corrente
    // + 1 perchè i mesi partono dal n°0,
    const month = `${now.getMonth() + 1}`.padStart(2, 0)
    // Anno corrente
    const year = now.getFullYear()
    // Ora corrente
    const hour = `${now.getHours()}`.padStart(2, 0)
    // Minuto Corrente
    const minute = `${now.getMinutes()}`.padStart(2, 0)
    // Day/Month/Year
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`

    // Pulisci i campi
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur() // Per rimuovere il Focus

    // Update dell'UI
    updateUI(currentAccount)
  }
})

// Evento per trasferire denaro
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault() // Blocco il Refresh
  const amountTransfer = +inputTransferAmount.value // Quanto ammonta il trasferimento
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value) // A chi devo trasferire
  // console.log(amountTransfer);
  // console.log(receiverAccount);

  // Verifica se ho abbastanza soldi
  if (amountTransfer > 0 && receiverAccount && currentAccount.balance >= amountTransfer && receiverAccount?.username !== currentAccount.username) {
    // Rimuovo dall'account di chi spedisce
    currentAccount.movements.push(-amountTransfer)
    // Aggiungo all'account di chi riceve
    receiverAccount.movements.push(amountTransfer)
    // Aggiungere data del trasferimento ( chi invia)
    currentAccount.movementsDates.push(new Date().toISOString())
    // Aggiungere data del trasferimento ( chi riceve)
    receiverAccount.movementsDates.push(new Date().toISOString())

    // Update dell'UI
    updateUI(currentAccount)
  }
  // Ripulisco i campi
  inputTransferAmount.value = inputTransferTo.value = ''
})

// Condizione con Some
btnLoan.addEventListener('click', (e) => {
  e.preventDefault() // Tolgo il Refresh
  const amountLoan = Math.floor(inputLoanAmount.value)

  if (amountLoan > 0 && currentAccount.movements.some(mov => mov >= amountLoan * 0.1)) {
    // Aggiungi il movement ai movimenti
    currentAccount.movements.push(amountLoan)
    // Aggiungere data della richiesta prestito
    currentAccount.movementsDates.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount)
    // Pulizia Campi
    inputLoanAmount.value = ''
  }
})

// Evento per chiudere account
btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  const confirmUser = inputCloseUsername.value
  const confirmPin = +inputClosePin.value
  if (confirmUser === currentAccount.username && currentAccount.pin === confirmPin) {
    // console.log("Puoi cancellare Account");
    const indexAccount = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(indexAccount); // Output 0
    // Cancellare Account
    accounts.splice(indexAccount, 1)
    // Nascondere l'UI
    containerApp.style.opacity = 0
  } else {
    console.log("Non puoi cancellare Account");
  }
  // Pulire i Campi 
  inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false // State iniziale False
btnSort.addEventListener('click', (e) => {
  e.preventDefault() // Rimuovo il refresh
  displayMovement(currentAccount, !sorted) // Ora lo lascio a true
  sorted = !sorted // Al click continuo a cambiare lo State
  // Serve apposta
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



