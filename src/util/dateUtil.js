import moment from 'moment';

export function toDisplayDate(date, format = 'yyyy-MM-DD') {
  if (!date) {
    return date;
  }
  return moment(date).format(format);
}

export function toApplicationLocalDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function toApplicationOffsetDateTime(date) {
  if (!date) {
    return;
  }
  const applicationDate = new Date(date);
  applicationDate.setSeconds(0);
  return applicationDate.toISOString();
}
