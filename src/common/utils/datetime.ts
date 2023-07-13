import moment from "moment";

//TODO: không phải là giải pháp hay để xử lý convert date => tìm cách khác
export const convertDateToDateString = (date: Date | string | undefined) => {
  if (!date) {
    return "";
  }
  const momentDate = moment(date);
  return momentDate.format("DD/MM/YYYY");
};
