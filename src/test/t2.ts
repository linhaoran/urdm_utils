interface Subjects {
    id: number;
    value: boolean
}

const subjects: Array<boolean> = Array(11).fill(true)

console.log(typeof subjects);
// console.log( subjects);
subjects[5] = false

subjects.forEach((x, i) => {
    console.log(i, x)
})
