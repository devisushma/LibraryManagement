export const todayDate = '2022-12-31'
export const fineRules = (days) => {
  if(days<=12) return 0
  else return (days/2)*5
}

