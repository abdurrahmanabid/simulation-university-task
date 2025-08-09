type TypeOfNews = "poor" | "fair" | "good";
type NumberAndDash = number | "-";
const STOCK = 70,
  buyingPriceInCent = 33,
  sellingPriceInCents = 50,
  buyingPrice = buyingPriceInCent / 100,
  sellingPrice = sellingPriceInCents / 100,
  singleProfit = sellingPrice - buyingPrice,
  salvageScrap = 0.05;

//Random Digit for type of Newspaper
const RDN: number[] = [94, 77, 49, 45, 43, 32, 49];
// Random Digit for Demand
const RDD: number[] = [80, 20, 15, 88, 98, 64, 73];

const getDemand = (randNumber: number, type: TypeOfNews): number => {
  if (type === "good") {
    if (randNumber <= 3) {
      return 40;
    } else if (randNumber <= 8) {
      return 50;
    } else if (randNumber <= 23) {
      return 60;
    } else if (randNumber <= 43) {
      return 70;
    } else if (randNumber <= 78) {
      return 80;
    } else if (randNumber <= 93) {
      return 90;
    } else return 100;
  } else if (type === "fair") {
    if (randNumber <= 10) {
      return 40;
    } else if (randNumber <= 28) {
      return 50;
    } else if (randNumber <= 68) {
      return 60;
    } else if (randNumber <= 88) {
      return 70;
    } else if (randNumber <= 96) {
      return 80;
    } else return 90;
  } else {
    if (randNumber <= 44) {
      return 40;
    } else if (randNumber <= 66) {
      return 50;
    } else if (randNumber <= 94) {
      return 60;
    } else return 70;
  }
};

const getTypeOfNews = (randomNumber: number): TypeOfNews => {
  if (randomNumber <= 35) return "good";
  else if (randomNumber <= 80) return "fair";
  else return "poor";
};

const probability: TypeOfNews[] = RDN.map(
  (val) => getTypeOfNews(val) as TypeOfNews
);

const demand: number[] = RDD.map((val, index) =>
  getDemand(val, probability[index])
);

const revinueFromSell = demand.map((val) => val * sellingPrice);

const getLostProfit = (demand: number): NumberAndDash => {
  if (demand > STOCK) {
    return parseFloat(((demand - STOCK) * singleProfit).toFixed(2));
  } else return "-";
};

const lostProfit = demand.map((demand) => getLostProfit(demand));

const getSalvage = (demand: number): NumberAndDash => {
  if (demand < STOCK) {
    return (STOCK - demand) * salvageScrap;
  } else return "-";
};

const salvage = demand.map((demand) => getSalvage(demand));
const checkValue = (value: NumberAndDash): number =>
  typeof value === "number" ? value : 0;
const calculateProbability = (
  revinueFromSell: number,
  costProfit: NumberAndDash,
  salvageScrap: NumberAndDash
): number => {
  return (
    revinueFromSell -
    STOCK * buyingPrice -
    checkValue(costProfit) +
    checkValue(salvageScrap)
  );
};

const profit:number[] = revinueFromSell.map((r,i)=>parseFloat(calculateProbability(r,lostProfit[i],salvage[i]).toFixed(2)))

console.table({
  Day:Array.from({ length: RDD.length }, (_, index) => index + 1),
  'Random Digit For Newspaper':RDN,
  'Type Of Newspaper':probability,
  'Random Digit For Demand':RDD,
  Demand:demand,
  "Revinue From Sell" : revinueFromSell,
  "Lost Proit":lostProfit,
  "Salvage From Sell of Scrap": salvage,
  "Daily Profit":profit
})
