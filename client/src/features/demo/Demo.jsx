import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, postData, selectError } from './demoSlice';

const Demo = () => {

  return (
    <>
      <h1 className="text-5xl">Hello</h1>
    </>
  );
};

export default Demo;
