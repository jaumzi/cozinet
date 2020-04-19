import React from 'react';


export const StringPrepare = string =>
  string
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');