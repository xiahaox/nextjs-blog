import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

const getTimeago = (date) => {
  return moment(new Date()).diff(moment(date), 'days');
};
const getTimeago1 = (date) => {
  return moment(date).format('MM-DD');
};

export const LocaleTime_1 = ({ date, timeago }) => {
  return <time>{getTimeago(date)} 天前</time>;
};
export const LocaleTime_2 = ({
  date,
  timeago,
  format = 'yyyy-MM-dd HH:mm:ss',
}) => {
  return <time>{getTimeago1(date)}</time>;
};
