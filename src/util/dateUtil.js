import moment from 'moment';

export function toDisplayDate(date, format = 'yy-MM-DD hh:mm') {
  if (!date) {
    return date;
  }
  return moment(date).format(format);
}

export function toDisplayDateFromDouble(doubleDate, format) {
  if (!doubleDate) {
    return doubleDate;
  }
  return toDisplayDate(doubleDate * 1000, format);
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

export function getDate(addSubstractNumberOfDate = 0) {
  if (addSubstractNumberOfDate === 0) {
    return moment();
  } else if (addSubstractNumberOfDate > 0) {
    return moment().add(addSubstractNumberOfDate, 'days');
  } else {
    return moment().subtract(Math.abs(addSubstractNumberOfDate), 'days');
  }
}
