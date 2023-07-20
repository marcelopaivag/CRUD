function validateForm(){

    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let date = (document.getElementById('inputDate').value).toString()
    let time = (document.getElementById('inputTime').value).toString()

    if (name == "") {
        alert('El nombre es requerido');
        return false;
    }

    if (email == "") {
        alert('El correo es requerido');
        return false;
    }else if (!email.includes("@")) {
        alert('El correo no es valido');
        return false;
    }

    if (phone == "") {
        alert('El telefono es requerido');
        return false;
    }

    if (date == "") {
        alert('Seleccione una fecha');
        return false;
    }

    if (time == "") {
        alert('Seleccione una hora');
        return false;
    }

    return true;
}

function showData(){

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    var html = "";

        listPeople.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td>" + element.date + "</td>";
        html += "<td>" + element.time + "</td>";
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar dato</button> <button onclick="updateData('+ index +')" class="btn btn-warning">Editar dato</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

document.onload = showData();

function AddData(){
    if (validateForm() == true) {
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let phone = document.getElementById('inputPhone').value;
        let date = (document.getElementById('inputDate').value).toString()
        let time = (document.getElementById('inputTime').value).toString()
 
        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        }else{
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        listPeople.push({
            email: email,
            name: name,
            phone: phone,
            date: date,
            time: time,
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        showData();

        document.getElementById('inputEmail').value = "";
        document.getElementById('inputName').value = "";
        document.getElementById('inputPhone').value = "";
    }
}


function deleteData(index){

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}



function updateData(index){
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate",btnAdd).style.display = 'block';

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    document.querySelector("#btnUpdate").onclick = function(){
        if (validateForm() == true) {
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            showData();

            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputPhone').value = "";

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate",btnAdd).style.display = 'none';
        }
    };
}
