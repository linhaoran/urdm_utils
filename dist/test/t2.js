"use strict";
// interface Subjects { id: number; value: boolean }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const subjects: Array<boolean> = Array(11).fill(true)
// console.log(typeof subjects);
// console.log( subjects);
// subjects[5] = false
// subjects.forEach((x, i) => {
//     console.log(i, x)
// })
const baseUrl = 'http://localhost:3001/model';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const a = yield fetch(baseUrl + '/reports/d/')
        .then(resp => resp.json())
        .then(data => data.map(i => i.id))
        .catch(error => console.error('Error fetching users:', error));
    // initReports = Array.from(new Set(reports))
    // console.log('initReports: ', reports);
    console.log(a);
    // return reports;
}))();
function getSubjects2() {
    return __awaiter(this, void 0, void 0, function* () {
        let a = yield fetch(baseUrl + '/reports/d/')
            .then(resp => resp.json())
            .then(data => {
            data.map(i => i.id);
            return data;
        })
            .catch(error => console.error('Error fetching users:', error));
        // initReports = Array.from(new Set(reports))
        // console.log('initReports: ', reports);
        console.log(a);
        return a;
    });
}
let a = getSubjects2();
