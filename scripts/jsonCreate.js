const memberInfo = {
    familyName: "Salako", 
    dateMoved: "2023-04-03", 
    numberPeople: 20, 
    visitedBishop: true,
    familyMemData: [
        {
        "name": "Sola Dale",
        "gender": "Male",
        "birthday": "1990-05-12"},
        {
        "name": "Dada Dele",
        "gender": "Female",
        "birthday": "1998-05-12"
        },
        {
        "name": "Sola Jide",
        "gender": "Male",
        "birthday": "2000-05-12"
        },
        {
        "name": "Bola James",
        "gender": "Male",
        "birthday": "1980-11-15"
        }
    ] 
}

const memberInfoJsonString = JSON.stringify(memberInfo);