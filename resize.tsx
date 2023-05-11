
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

import React from "react";


const FIGMA_WINDOW_WIDTH = 390;
const FIGMA_WINDOW_HEIGHT = 844;


export const widthpercentage=(width:number):number =>{
    const percentage =(width / FIGMA_WINDOW_WIDTH) * 100;
    return responsiveWidth(percentage);
}
export const heightpercentage=(height:number):number=>{
    const percentage =(height / FIGMA_WINDOW_HEIGHT) * 100;
    return responsiveHeight(percentage);
}
export const fontpercentage=(size:number):number=>{
    const percentage = size *0.135;
    return responsiveFontSize(percentage);
}