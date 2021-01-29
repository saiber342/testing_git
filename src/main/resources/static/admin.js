$(document).ready(function () {
    setTimeout(function () {
        showTable();
    }, 200);
    createRoles();
});


function showTable() {
    $("#myTable").empty();
    $.getJSON("http://localhost:8080/admin/users", function (data) {
        let content = '';
        let userId = '';

        $.each(data, function (index, user) {
            console.log(user);
            userId = user.id;
            content += '<tr id=' + user.id + '>';
            content += '<td class="text-center">' + user.id + '</td>>';
            content += '<td class="text-center">' + user.username + '</td>>';
            content += '<td class="text-center">' + user.password + '</td>>';
            content += '<td class="text-center">'
            $.each(user.roles, function (index, role) {
                content += role.role + '<br/>';
            });
            content += '</td>'
            content += '<td><button onclick="editUser(' + user.id + ')" type="button" class="btn btn-info" data-toggle="modal" data-target="#editModal">Edit</button></td>';
            content += '<td><button onclick="beDeleteUser(' + user.id + ')" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button></td>';
            content += '</tr>';
        });

        $('#myTable').empty().append(content);

    });


}


function getUserRoles(roles) {
    var userRoles = [];
    for (var i in roles) {
        userRoles[i] = roles[i].role;
    }
    return userRoles;
}

function deleteUser() {
    let userId = $("#deleteUserId").val();
    $.ajax({
        type: "DELETE",
        url: "/admin/users/delete/" + userId,
        contentType: "application/json",
        success: function (data) {
            $("#myTable #" + userId).remove();
            showTable();
            console.log(data)

        },
    });
}

function beDeleteUser(id) {
    $.ajax({
        type: "GET",
        url: "/admin/users/update/" + id,
        contentType: "application/json",
        success: function (data) {
            let user = JSON.parse(JSON.stringify(data));
            let rolesArr = getUserRoles(user.roles);
            $("#deleteUserId").val(user.id);
            $("#deleteUserUsername").val(user.username);
            $("#deleteUserPassword").val(user.password);
            $("#deleteUserRole").val(rolesArr);
        },
    })
}

function createRoles() {
    $.ajax({
        type: "GET",
        url: "/admin/users/roles",
        contentType: "application/json",
        success: function (data) {
            data.forEach(function (role) {
                $("#newUserRole, #userRole").append(
                    "<option role-id=" + role.id + " value=" + role.role + ">" + role.role + "</option>"
                );
            })
        },

    });
}

$(document).on('click', '#addBtn', function (event) {
    event.preventDefault();
    newUser();
    $('.tab-pane').hide().eq($(this).index()).show();

    $('#usersTable').addClass("show active").show();
    $('#tab-usersTable').addClass('active');
    $('#newUser').hide().removeClass("show active");
    $('#tab-newUser').removeClass("active");
    clearAddForm();
});

function clearAddForm() {
    console.log("clearAddForm(");
    $('#addUser').find('input, select').each(function () {
        $(this).val("");
    });
}

function newUser() {
    let roles = [];
    $("#newUserRole option:selected").each(function () {
        roles.push({id: $(this).attr("role-id"), role: $(this).attr("value")})
    });

    let json = {
        username: $("#newUserUsername").val(),
        password: $("#newUserPassword").val(),
        roles: JSON.parse(JSON.stringify(roles))
    };

    $.ajax({
        url: '/admin/users/add',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(json),
    });
}


function editUser(id) {
    $.ajax({
        type: "GET",
        url: "/admin/users/update/" + id,
        contentType: "application/json",
        success: function (data) {
            let user = JSON.parse(JSON.stringify(data));
            let rolesArr = getUserRoles(user.roles);
            $("#userId").val(user.id);
            $("#userUsername").val(user.username);
            $("#userPassword").val(user.password);
            $("#userRole option").each(function () {
                for (var i in rolesArr) {
                    if ($(this).text() === rolesArr[i]) {
                        $(this).prop('selected', true);
                    }
                    if ($(this).text() !== rolesArr[i]) {
                        $(this).prop('selected', false);
                    }
                }
            });
        },
    })
}

function updateUser() {
    let roles = [];
    let userId = $("#userId").val();

    $("#userRole option:selected").each(function () {
        roles.push({id: $(this).attr("role-id"), role: $(this).attr("value")})
    });

    let json = {
        username: $("#userUsername").val(),
        password: $("#userPassword").val(),
        roles: JSON.parse(JSON.stringify(roles))
    };

    $.ajax({
        type: "PUT",
        url: "/admin/users/update/" + userId,
        dataType: 'json',
        data: JSON.stringify(json),
        contentType: "application/json",
        success: function (data) {
            $("#myTable #" + userId).update();
            showTable();
            console.log(data);
        },

    });
}

$(document).ready(function () {
    $("#ul-menu-list").on('click', 'li', function (e) {
        $('.tab-pane').hide().eq($(this).index()).show();
    });
});

$(document).on('click', '#editBtn', function () {
    setTimeout(function () {
        showTable();
    }, 100)

});

$(document).on('click', '#addBtn', function () {
    setTimeout(function () {
        showTable();
    }, 100)

});