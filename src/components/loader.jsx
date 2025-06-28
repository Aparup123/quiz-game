'use client'
import React from 'react';
import styled from 'styled-components';
import {ScaleLoader} from "react-spinners";

export const Loader = () => {
  return (
      <div className="loader w-full h-full flex justify-center items-center">
        <ScaleLoader/>
      </div>
  );
}

export default Loader;
