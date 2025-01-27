// interface Subjects { id: number; value: boolean }

// const subjects: Array<boolean> = Array(11).fill(true)

// console.log(typeof subjects);
// console.log( subjects);
// subjects[5] = false

// subjects.forEach((x, i) => {
//     console.log(i, x)
// })


const baseUrl = 'http://localhost:3001/model';

(async () => {
    const a = await fetch(baseUrl + '/reports/d/')
        .then(resp => resp.json())
        .then(data => data.map(i => i.id))
        .catch(error => console.error('Error fetching users:', error));
    // initReports = Array.from(new Set(reports))
    // console.log('initReports: ', reports);
    console.log(a)
    // return reports;
})()


async function getSubjects2() {

    let a = await fetch(baseUrl + '/reports/d/')
        .then(resp => resp.json())
        .then(data => {
            data.map(i => i.id)
            return data;
        })
        .catch(error => console.error('Error fetching users:', error));
    // initReports = Array.from(new Set(reports))
    // console.log('initReports: ', reports);
    console.log(a)
    return a;
}

let a = getSubjects2();
