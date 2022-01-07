const addStudentBtn = document.querySelector('#submit-name');
const submitSubjectBtn = document.querySelector('#submit-subject');
const studentsArray = [];
let subjectsArray = [];
let studentIndex = null;

addStudentBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const student = document.querySelector('#name');
    if (student.value.trim('') === '') {
        return false
    }
    const studentInfo = {
        name: student.value,
        minimumRating: '',
        MaximumRating: '',
        AverageRating: '',
    }
    studentsArray.push(studentInfo)
    appendStudent();
})

function appendStudent() {
    const studentTable = document.querySelector('#add-student');
    let studentRow = '';
    studentsArray.forEach((item, index) => {
        studentRow += `
        <tr class='student-info' data-index='${index}'>
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td><a href="#" class='open-modal' data-index='${index}' data-toggle="modal" data-target="#exampleModal">imtahan</a></td>
            <td>${item.minimumRating}</td>
            <td>${item.MaximumRating}</td>
            <td>${item.AverageRating}</td>
        </tr>`
    });

    studentTable.innerHTML = studentRow;
    getIndex();
}

submitSubjectBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const subject = document.querySelector('.subject__js')
    const subjectEstimation = document.querySelector('.subject-estimation__js')

    const studentInfo = {
        subject: subject.value,
        subjectEstimation: subjectEstimation.value,
    }
    for (let key of subjectsArray) {
        if (key.subject === studentInfo.subject) {
            return false
        }
    }
    subjectsArray.push(studentInfo);
    appendSubjects();
})

function appendSubjects() {
    const subjectTable = document.querySelector('#add-subject');
    let subjectRow = '';
    subjectsArray.forEach((item, index) => {
        subjectRow += `
        <tr class='student-info' data-index='${index}'>
            <th scope="row">${index + 1}</th>
            <td>${item.subject}</td>
            <td>${item.subjectEstimation}</td>
        </tr>`
    });
    subjectTable.innerHTML = subjectRow;
}

function getIndex() {
    let openModal = document.querySelectorAll('.open-modal');
    openModal.forEach((item) => {
        item.addEventListener('click', (e) => {
            studentIndex = e.target.dataset.index;
        })
    })
}

$('#exampleModal').on('hidden.bs.modal', function (e) {
    appendSubjects();
    const subjectTable = document.querySelector('#add-subject');
    const subject = document.querySelector('.subject__js');
    const subjectEstimation = document.querySelector('.subject-estimation__js');

    subjectTable.innerHTML = '';
    subjectEstimation.value = '';
    subject.selectedIndex = 0

    if (subjectsArray.length < 3) {
        subjectsArray = [];
        return false
    }

    const sum = []

    for (let i = 0; i < subjectsArray.length; i++) {
        sum.push(subjectsArray[i].subjectEstimation)
    }

    sum.sort((a, b) => { return a - b });

    addTotal(sum)
    subjectsArray = [];
    studentIndex = null;

})

function addTotal(array) {
    studentsArray[studentIndex].minimumRating = array[0]
    studentsArray[studentIndex].MaximumRating = array[2]
    studentsArray[studentIndex].AverageRating = array[1]

    appendStudent();
}