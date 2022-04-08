import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

const getTimeago = (date) => {
  return moment(new Date()).diff(moment(date), 'days');
};

export default function LocaleTime({ date, timeago }) {
  return <time>{getTimeago(date)} 天前</time>;
}
