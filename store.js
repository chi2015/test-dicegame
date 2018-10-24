const { createStore } = Redux;

/* --- DATA FOR STORE ---*/

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const FREE_CREDITS_AMOUNT = 100.00;

const data = {
    bet : { amount : 0.0, number: 25, type : ''/* bet type hi or lo */ },
    result: 0,
    nextResult: generateNextResult(MIN_NUMBER, MAX_NUMBER),
    balance: 0,
    MIN: MIN_NUMBER,
    MAX: MAX_NUMBER
}

/* --- COMPUTED PROPERTIES --- */
function getWinRatio(state) {
    let percents = {hi: (state.MAX - state.bet.number*100/state.MAX).toFixed(0), lo: (state.bet.number*100/state.MAX).toFixed(2)};
    let payouts = {hi: (100/percents.hi).toFixed(2), lo: (100/percents.lo).toFixed(2)};
    return { percents, payouts };
}

function getWinOrLose(state) {
    return state.bet.type ? ( betWin(state.bet.type, state.bet.number, state.result) ? 'WIN' : 'LOSE' ) : '';
}

function betWin(type, number, result) {
    return (type == 'hi' && result >= number) ||
    (type == 'lo' && result <= number);
}

function getFairHash(state) {
    return md5(state.nextResult);
}

/* --- GENERATE NEXT RESULT --- */

function generateNextResult(MIN, MAX) {
    return chance.integer({ min: MIN, max: MAX });
}

/* --- ACTIONS --- */

const actions = {
    /* PLAY BET */
    play: (betType) => {
        return {
            type: 'PLAY',
            betType: betType
        }
    },
    /* GET FREE CREDITS */
    freeCredits: (amount) => {
        return {
            type: 'FREE_CREDITS',
            amount: amount
        }
    },
    /* CHANGE BET AMOUNT */
    changeAmount: (amount) => {
        return {
            type: 'CHANGE_AMOUNT',
            amount: amount
        }
    },
    /* CHANGE BET NUMBER */
    changeNumber: (number) => {
        return {
            type: 'CHANGE_NUMBER',
            number: number
        }
    },
    /* CHANGE BALANCE WHEN RESTORE FROM LOCAL STORAGE */
    changeBalance: (balance) => {
        return {
            type: 'CHANGE_BALANCE',
            balance: balance
        }
    }
}

/* --- REDUCERS --- */

function reducer(state = data, action) {
    switch (action.type) {
        case 'PLAY':
            let pay = 0, newBalance = state.balance - state.bet.amount, amount = state.bet.amount;
            if (betWin(action.betType, state.bet.number, state.nextResult)) 
                pay = getWinRatio(state).payouts[action.betType]*state.bet.amount;
            newBalance += pay;
            newBalance = newBalance.toFixed(2);
            if (amount > newBalance) amount = newBalance;
            return {...state, bet: {...state.bet, type: action.betType, amount: +amount}, balance: +newBalance, result: state.nextResult, nextResult: generateNextResult(state.MIN, state.MAX)}
        case 'FREE_CREDITS':
            return {...state, balance: state.balance + FREE_CREDITS_AMOUNT}
        case 'CHANGE_AMOUNT':
            return {...state, bet : {...state.bet, amount: +action.amount}}
        case 'CHANGE_NUMBER': 
            return {...state, bet: {...state.bet, number: +action.number}}
        case 'CHANGE_BALANCE':
            return {...state, balance: +action.balance}
    }
    return state;
}

/*--- STORE ---*/

const store = createStore(reducer, data);