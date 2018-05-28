const npsGroups = ["Detractor", "Passive", "Promoter"];
const prdGroups = ["A", "B", "C", "D"];
const hierarchies = [
  "Global",
  "EMEA",
  "Canada",
  "United States",
  "APAC",
  "S. America"
];
export const data = { npsGroups };
//{ id: “Identificator”, nps: “NPS”, easy: “Easy”, osat: “Overall Satisfaction”, ltr: “Likely to Renew”, rsp: “Responsiveness”,
// prd: “Product knowledge”, prd_group: “Product Group”, hier: “Hierarchy” },
//nps, easy, osat, ltr, rsp, prd – numbers from 0 to 10
// nps_group: “NPS Group” – based on NPS value: Detractor (nps=0-6), Passive (nps=7-8), Promoter (nps=9-10)
// prd_group: A, B, C, D
// hier: Global, EMEA, Canada, United States, APAC, S. America
export const generateJSON = size =>
  Array.apply(null, Array(size)).map((x, i) => {
    return generateRow(i);
  });
const generateRow = i => {
  const row = {
    id: i,
    prd_group: getRandomProductGroup(),
    hier: getRandomHierarchy()
  };
  ["nps", "easy", "osat", "ltr", "rsp", "prd"].forEach(
    key => (row[key] = getRandomInt())
  );
  return row;
};
const getRandomInt = (max = 11) => Math.floor(Math.random() * Math.floor(max));
const getRandomProductGroup = () => getRandomItemFromArray(prdGroups);
const getRandomHierarchy = () => getRandomItemFromArray(hierarchies);
const getRandomItemFromArray = array =>
  array[Math.floor(Math.random() * array.length)];
export const calculateNpsGroupList = json =>
  unique(json.map(row => getNpsGroupFromNps(row.nps))).sort();
const getNpsGroupFromNps = nps => {
  if (nps >= 0 && nps <= 6) return "Detractor";
  if (nps >= 7 && nps <= 8) return "Passive";
  if (nps >= 9 && nps <= 10) return "Promoter";
  throw "invalid NPS";
};
export const calculatePrdGroupList = json =>
  unique(json.map(row => row.prd_group)).sort();
const unique = array => [...new Set(array)];

export const filterByProductGroup = (prdGroup, array) => {
  if (prdGroup) return array.filter(row => row.prd_group === prdGroup);
  else return array;
};
export const filterByNpsGroup = (npsGroups, array) => {
  return array.filter(row => npsGroups.includes(getNpsGroupFromNps(row.nps)));
};
const mean = array => {
  const sum = array.reduce((acc, el) => acc + el, 0);
  return sum / array.length;
};
export const meanByKey = (array, key) => mean(array.map(row => row[key]));

const simpleTilesKeys = ["nps", "easy", "osat", "ltr"];
const simpleTilesTitle = {
  nps: "NPS",
  easy: "Easy",
  osat: "Overall Satisfaction",
  ltr: "Likely To Renew"
};
export const simpleTilesData = array =>
  simpleTilesKeys.map(key => ({
    value: meanByKey(array, key),
    title: simpleTilesTitle[key]
  }));

const getHierarchiesList = array => unique(array.map(row => row.hier)).sort();

const tableTileKeys = ["osat", "rsp", "prd"];
export const tableTileData = array =>
  getHierarchiesList(array).map(hierarchy => {
    const filtered = array.filter(row => row.hier === hierarchy);
    const result = {
      hier: hierarchy
    };
    tableTileKeys.forEach(key => (result[key] = meanByKey(filtered, key)));
    return result;
  });
