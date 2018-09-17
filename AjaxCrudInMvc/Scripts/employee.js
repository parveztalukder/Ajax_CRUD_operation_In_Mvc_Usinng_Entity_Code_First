$(document).ready(function () {
    loadEmployee();
  
});
var isUpdateable = false;
function loadEmployee() {
   
    $.ajax({
        url: "/Employee/getEmployeeAll/",
        type:"GET",
        datatype: "json",
        success: function (data) {
            var html = '';
            $.each(data, function (i, obj) {
             
                html += "<tr>"
                html += "<td>" + obj.Id + "</td>"
                html += "<td>" + obj.Name + "</td>"
                html += "<td>" + obj.Designation + "</td>"
                html += "<td>" + obj.Gender + "</td>"
                html += "<td>" + obj.Salary + "</td>"
                html += "<td><button class='btn btn-success' id='btnEdit' onclick='getEmployeeById(" + obj.Id + ")'>Edit</button>|<button class='btn btn-danger' id='btnDelete' onclick='deleteEmployeeById(" + obj.Id+")'>Delete</button></td>"
                html += "</tr>";
                $("table tbody").html(html);
            });
        },
        error: function (err) {
            alert("something err...");
        }

    });
};
$("#btnSave").click(function (e) {
    var data = {
        Id: $("#id").val(),
        Name: $("#name").val(),
        Designation: $("#designatin").val(),
        Gender: $("#gender").val(),
        Salary: $("#salary").val()
    };
    if (!isUpdateable) {
        $.ajax({
            url: "/Employee/Create/",
            type: "POST",
            datatype: "json",
            data: data,
            success: function (data) {
                loadEmployee();
                clear();
                $("#addModal").modal("hide");
               
            }, error: function (err) {
                alert("Fail to save ");
            }
        })

    }
    else {
        $.ajax({
            url: "/Employee/Update/",
            type: "POST",
            datatype: "json",
            data: data,
            success: function (data) {
                loadEmployee();
                $("#addModal").modal("hide");

                isUpdateable = false;
                clear();
            }, error: function (err) {
                alert("Fail to save ");
            }
        })
    }
});
function getEmployeeById(id) {
    $("#addModal").modal("show");
    $("#title").text("Edit Product");
    $.ajax({
        url: "/Employee/getEmloyeeById/" + id,
        type: "GET",
        datatype: "json",
        success: function (data) {
            isUpdateable = true;
            $("#id").val(data.Id);
            $("#name").val(data.Name);
            $("#designatin").val(data.Designation);
            $("#gender").val(data.Gender);
            $("#salary").val(data.Salary);
        },
        error: function (err) {
            alert("load problem....");
        }

    });
}
$("#addEmp").click(function () {
    $("#title").text("Add Product");
});

function deleteEmployeeById(id) {
    $("#deleteModal").modal("show");
    $("#deleteModal #title").text("Delete employee");
    $("#deleteModal #btndelete").click(function (e) {
        $.ajax({
            url: "/Employee/Delete/" + id,
            type: "POST",
            datatype: "json",
            success: function (data) {
                loadEmployee();
                $("#deleteModal").modal("hide");
            },
            error: function (err) {
                alert("Probelm to delete");
            }
        });
        e.preventDefault();
    });

  
}
function clear() {
    $("#id").val("");
    $("#name").val("");
    $("#designatin").val("");
    $("#gender").val("");
    $("#salary").val("");
}