
//https://shields.io/badges/static-badge
//https://img.shields.io/badge/TextOfBadge-%23BackgoundColorCode?style=StyleOfBadge&logo=LogoName&logoColor=LogoColor
//https://img.shields.io/badge/Express.js-%23404d59?style=flat-square&logo=amazon-aws&logoColor=white
//List of Logo - https://github.com/simple-icons/simple-icons/blob/master/slugs.md

import { differenceInMonths, differenceInYears } from "date-fns";

export const badgeImage:{[badge:string]:string}={
    "javascript": "https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E",
    "typescript": "https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white",
    "flutter": "https://img.shields.io/badge/flutter-%2302569B.svg?style=flat-square&logo=flutter&logoColor=white",
    "react": "https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB",
    "stripe": "https://img.shields.io/badge/stripe-%23635bff.svg?style=flat-square&logo=stripe&logoColor=white",
    "next.js": "https://img.shields.io/badge/next.js-%23000000.svg?style=flat-square&logo=nextdotjs&logoColor=white",
    "vercel": "https://img.shields.io/badge/vercel-%23000000.svg?style=flat-square&logo=vercel&logoColor=white",
    "sqlite": "https://img.shields.io/badge/sqlite-%23039BE5.svg?style=flat-square&logo=sqlite&logoColor=%23FFCC2E",
    "firebase": "https://img.shields.io/badge/sqlite-%23039BE5.svg?style=flat-square&logo=firebase&logoColor=%23FFCC2E",
    "firebase authentication": "https://img.shields.io/badge/firebase_auth-%23039BE5.svg?style=flat-square&logo=firebase&logoColor=%23FFCC2E",
    "firestore database": "https://img.shields.io/badge/firestore_db-%23039BE5.svg?style=flat-square&logo=firebase&logoColor=%23FFCC2E",
    "firebase hosting": "https://img.shields.io/badge/firebase_hosting-%23039BE5.svg?style=flat-square&logo=firebase&logoColor=%23FFCC2E",
    "tailwind css": "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white"
}

export const calculateYears = (date: Date): number => {
    const today = new Date();
    const ageYears = differenceInYears(today, date);
    return ageYears;
}