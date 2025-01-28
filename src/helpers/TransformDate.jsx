export default function (date) {
  const selectDate = new window.Date(date);
  const getYear = selectDate.getFullYear();
  const getMonth = (selectDate.getMonth() + 1).toString().padStart(2, '0');
  const getDay = selectDate.getDate().toString().padStart(2, '0');
  return `${getYear}-${getMonth}-${getDay}`
}