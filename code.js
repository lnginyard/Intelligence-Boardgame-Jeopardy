

function main() {

    let questionBotton = document.getElementById("question_button");
    questionBotton.addEventListener(`click`, () => {
        fetchQuestion();
    });

}


function fetchQuestion() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://jservice.kenzie.academy/api/random-clue?valid=true", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result) 
            const para = document.createElement("p");
            para.innerText = result.question;
            document.body.appendChild(para);

        })



}

main()