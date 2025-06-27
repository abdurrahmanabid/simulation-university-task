let ranArrTime = [];
let ranSerTime = [];

const ranNumForAT = () => Math.floor(Math.random()*1000)
const ranNumForST = () => Math.floor(Math.random()*100)

for(let i =0;i<6;i++){
  ranArrTime.push(ranNumForAT())
  ranSerTime.push(ranNumForST())
}

let IAT = []
let arrivalTime = []
let serviceTime = []
let TSB = []
let TSE = []
let WT = []
let TSS = []
let ITS = []

function getValueOfIAT(value) {
  if (value >= 0 && value <= 125) {
    return 1;
  } else if (value >= 126 && value <= 250) {
    return 2;
  } else if (value >= 251 && value <= 375) {
    return 3;
  } else if (value >= 376 && value <= 500) {
    return 4;
  } else if (value >= 501 && value <= 625) {
    return 5;
  } else if (value >= 626 && value <= 750) {
    return 6;
  } else if (value >= 751 && value <= 875) {
    return 7;
  } else if (value >= 876 && value <= 1000) {
    return 8;
  } else {
    return null; // out of range
  }
}

function getValueOfST(R2) {
  if (R2 >= 0 && R2 <= 10) {
    return 1;
  } else if (R2 >= 11 && R2 <= 30) {
    return 2;
  } else if (R2 >= 31 && R2 <= 60) {
    return 3;
  } else if (R2 >= 61 && R2 <= 85) {
    return 4;
  } else if (R2 >= 86 && R2 <= 95) {
    return 5;
  } else if (R2 >= 96 && R2 <= 100) {
    return 6;
  } else {
    return null; // out of range
  }
}

for (let i = 0; i < ranArrTime.length; i++) {
  if (ranArrTime[i] === 0) {
    IAT.push(0)
  } else {
    IAT.push(getValueOfIAT(ranArrTime[i]))
  }
}

// console.log(IAT)

for (let i = 0; i < ranArrTime.length; i++) {
  if (arrivalTime.length === 0) {
    arrivalTime.push(0)
  } else {
    arrivalTime.push(arrivalTime[i - 1] + IAT[i])
  }
}
// console.log(arrivalTime)
ranSerTime.map((item => serviceTime.push(getValueOfST(item))))
// console.log(serviceTime)

//TSB and TSE

for (let i = 0; i < ranArrTime.length; i++) {
  TSB.length === 0 ? TSB.push(0) : TSB.push(Math.max(TSE[i - 1], arrivalTime[i]))
  WT.push(TSB[i] - arrivalTime[i])
  TSE.push(TSB[i]+serviceTime[i])
  ITS.length===0?ITS.push(0):ITS.push(TSB[i]-TSE[i-1])
}

// console.log('TSB:',TSB);
// console.log('WT:',WT);
// console.log('TSE:',TSE);

// Time Spend System
WT.map((item,index)=>TSS.push(item+serviceTime[index]))
// console.log('TSS:',TSS);


//Print
const evaluation = ranArrTime.map((item,index)=>({
  Customer: index + 1,
  ranArrTime:item,
  ranSerTime:ranSerTime[index],
  IAT: IAT[index],
  arrivalTime: arrivalTime[index],
  serviceTime: serviceTime[index],
  TSB:TSB[index],
  WT:WT[index],
  TSE:TSE[index],
  TSS:TSS[index],
  ITS : ITS[index]
}))

console.table(evaluation)
