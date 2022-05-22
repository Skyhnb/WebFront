import React, { Component,useState } from 'react';
import { parsePath } from 'react-router-dom';
//*************废弃代码*********************


 let menulist = [
    {
        name: "cocodimama",
        number: 1,
        dish: "pasta",
        price: 10,
        amount:0,
    },
    {
        name: "name2",
        number: 2,
        dish: "rice",
        price: 20,
        amount:0,
    },

    {
        name: "name3",
        number: 3,
        dish: "pepper",
        price: 30,
        amount:0,
    },
];




  export function getMenuList(){

    return menulist;

}

export function deleteRestaurant(number) {
    menulist = menulist.filter(menu => menu.number !== number);
  }

