export type Items = {
  id: string;
  key: string;
  name: string;
  type: string;
  section: string;
  status: string;
  workspace: string;
  fzr: string[];
  sjxt: string[];
  sjxt2: any[];
  bgxt: any[];
  numFzr: number;
  responsible: string[];
  numSjxt: number;
  numSjxt2: number;
  numBgxt: number;
  singleSystem: boolean;
  xqjl: string;
  user_dr: string;
  bbh: string;
}

export type Payload = {
  count: number;
  items: Items[];
}

export type almList = {
  code: number;
  payload: Payload;
  iql: string;
  updateDateTime: string;
}


export interface Items {
  id: string;
  key: string;
  name: string;
  type: string;
  section: string;
  status: string;
  workspace: string;
  fzr: string[];
  sjxt: string[];
  sjxt2: any[];
  bgxt: any[];
  numFzr: number;
  responsible: string[];
  numSjxt: number;
  numSjxt2: number;
  numBgxt: number;
  singleSystem: boolean;
  xqjl: string;
  user_dr: string;
  bbh: string;
}

export interface Payload {
  count: number;
  items: Items[];
}

export interface almlist2 {
  code: number;
  payload: Payload;
  iql: string;
  updateDateTime: string;
}

function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

// greeter(printToConsole);
// var path = require("path");
import * as path from "path";
console.log(path.resolve("./"));
