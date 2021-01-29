function getUser() {

    fetch("http://localhost:8080/user/infoPage").then((res) => res.json())
        .then((user) => {
            let userRoles = " ";
            for (let i = 0; i < user.roles.length; i++) {
                userRoles += `${user.roles[i].role} `
            }

            let output = "<tr>";
            output += `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${userRoles}</td>
            `;
            output += "<tr>";

            document.getElementById("userInf").innerHTML = output;
        })
}

function nameTable() {
    fetch("http://localhost:8080/user/infoPage").then((response) => response.json())
        .then((user) => {
            let userRoles = " ";
            for (let i = 0; i < user.roles.length; i++) {
                userRoles += `${user.roles[i].role} `
            }

            let output = `${user.username}` + " with roles: " + userRoles;

            document.getElementById("str").innerHTML = output;
        })
}

nameTable();
getUser();