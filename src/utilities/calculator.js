import { gamma } from 'mathjs'

const SOFT_PITY = 73, HARD_PITY = 90;

//Calculates raw rate of any 5 star on xth roll
function rollRate(x) {
    let rate;

    if (x <= SOFT_PITY - 1) rate = 0.006;
    else rate = 0.006 + (x - SOFT_PITY)*0.06;

    rate = Math.min(1, rate);
    return rate;
}

//Calculates f(x): probability on rolling any 5 star on xth roll
function getRates1() {
    let ret = [];

    let notRolled = 1;
    for (let i = 0; i < HARD_PITY; i++) {
        let rolledI = rollRate(i, true);
        ret.push(notRolled * rolledI);
        notRolled *= 1 - rolledI;
    }

    return ret;
}

function getIndividualRates(pityCtr, guaranteed) {
    //Calculate first 5* roll rates if uninitialised
    if (typeof getIndividualRates.rates1 == 'undefined')
        getIndividualRates.rates1 = getRates1();
    
    //If guaranteed,return single window rates
    //TODO: trim to [pityCtr : 89]
    //if (guaranteed) return this.rates1;

    let successRates = [];

    for (let i = pityCtr + 1; i <= 178; i++) {
        let prob = i < HARD_PITY ? getIndividualRates.rates1[i - 1] / 2 : 0;

        for (let j = Math.max(pityCtr + 1, i - HARD_PITY); j < i && j <= HARD_PITY; j++) {
            let p = getIndividualRates.rates1[j - 1] / 2; //probability of rolling off-banner in jth roll
            let q = getIndividualRates.rates1[i - j - 1];  //probability of rolling character given event p
            prob += p*q;
        }
        successRates.push(prob);
    }

    return successRates;
}

//Returns array of cumulative rates
const Calculate = (rolls, guaranteed) => {
    console.log("Calculating...");
    let startTime = new Date().getTime();

    const individualRates = getIndividualRates(rolls, guaranteed);

    let cumulativeRates = [];

    let rolled = 0;
    for (let i = 0; i < individualRates.length; i++) {
        rolled += individualRates[i];
        cumulativeRates.push(rolled);
    }

    cumulativeRates[cumulativeRates.length - 1] = 1;

    let timeTaken = new Date().getTime() - startTime;
    console.log("Calculation complete, time: " + timeTaken + "ms");

    return cumulativeRates;
}

export default Calculate;