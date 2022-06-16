function showListProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products",
        success: function (products) {
            let content ="";
            for (let i = 0; i < products.length; i++) {
                content += `<tr>
            <th scope="row">${products[i].id}</th>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category.name}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${products[i].id})">Delete</button>
                <button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-whatever="@mdo" onclick="showDataEdit(${products[i].id})">Edit</button>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel2">Edit Product</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="createProduct2">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Id</span>
                                        <input type="text" id="id" class="form-control" placeholder="Id..." aria-label="id" aria-describedby="basic-addon1" disabled>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Name</span>
                                        <input type="text" class="form-control" placeholder="Enter the name..." aria-label="name" aria-describedby="basic-addon1" id="nameProduct2">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Price</span>
                                        <input type="text" class="form-control" placeholder="Enter the price..." aria-label="price" aria-describedby="basic-addon1" id="priceProduct2">
                                    </div>
                                    <select class="form-select" aria-label="Default select example" id="listCategory2">
                                        <option selected>Category</option>
                                    </select>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="editProduct(${products[i].id})">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`;
            }
            $("#list-product").html(content);

            showListCategory2();
        },
        error: function (error) {
            console.log(error);
        }
    })
}
showListProduct();

function showListCategory() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories`,
        success: function (categories) {
            let content ="<option selected>Category</option>";
            for (let i = 0; i < categories.length; i++) {
                content += `<option value="${categories[i].id}">${categories[i].name}</option>`;
            }
            $("#listCategory").html(content);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
showListCategory();

function showListCategory2() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories`,
        success: function (categories) {
            console.log(categories)
            let content ="<option selected>Category</option>";
            for (let i = 0; i < categories.length; i++) {
                content += `<option value="${categories[i].id}">${categories[i].name}</option>`;
            }
            $("#listCategory2").html(content);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function createNewProduct() {
    //Ẩn form modal sau khi onClick
    $('#exampleModal').modal('hide');
    let name = $("#nameProduct").val();
    let price = $("#priceProduct").val();
    let category = $("#listCategory").val();
    let obj = {
        name: name,
        price: price,
        category: {
            "id": category
        }
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/products",
        data: JSON.stringify(obj),
        success: showListProduct
    });
    event.preventDefault();
    //Xóa trắng form sau khi reload
    $('#createProduct').trigger("reset");

}

function deleteProduct(id) {
    $.ajax({
       type: "DELETE",
       url: "http://localhost:8080/products/" + id,
        success: showListProduct
    });
}

function showDataEdit(id) {
    $("#exampleModal2").modal('show');
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/" + id,
        success: function (data) {
            console.log(data);
            $("#id").val(data.id);
            $("#nameProduct2").val(data.name);
            $("#priceProduct2").val(data.price);
            $("#listCategory2").val(data.category.id);
            // document.getElementById("id").value = data.id;
        }
    })
}

function editProduct(id) {
    $('#exampleModal2').modal('hide');
    let name = $("#nameProduct2").val();
    let price = $("#priceProduct2").val();
    let category = $("#listCategory2").val();
    let obj = {
        name: name,
        price: price,
        category: {
            "id": category
        }
    }
    console.log(JSON.stringify(obj))
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/products/" + id,
        data: JSON.stringify(obj),
        success: function () {
            showListProduct();
        }
    });
    event.preventDefault();
    //Xóa trắng form sau khi reload
    $('#createProduct2').trigger("reset");

}

function sortArrayPriceASC() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/sort",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
            <th scope="row">${data[i].id}</th>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td>${data[i].category.name}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${data[i].id})">Delete</button>
                <button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-whatever="@mdo" onclick="showDataEdit(${data[i].id})">Edit</button>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel2">Edit Product</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="createProduct2">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Id</span>
                                        <input type="text" id="id" class="form-control" placeholder="Id..." aria-label="id" aria-describedby="basic-addon1" disabled>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Name</span>
                                        <input type="text" class="form-control" placeholder="Enter the name..." aria-label="name" aria-describedby="basic-addon1" id="nameProduct2">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Price</span>
                                        <input type="text" class="form-control" placeholder="Enter the price..." aria-label="price" aria-describedby="basic-addon1" id="priceProduct2">
                                    </div>
                                    <select class="form-select" aria-label="Default select example" id="listCategory2">
                                        <option selected>Category</option>
                                    </select>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="editProduct(${data[i].id})">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`
            }
            $("#list-product").html(content);
            showListCategory2();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function displayProductTop4() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/findTop4",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
            <th scope="row">${data[i].id}</th>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td>${data[i].category.name}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${data[i].id})">Delete</button>
                <button type="button" class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-whatever="@mdo" onclick="showDataEdit(${data[i].id})">Edit</button>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel2">Edit Product</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="createProduct2">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Id</span>
                                        <input type="text" id="id" class="form-control" placeholder="Id..." aria-label="id" aria-describedby="basic-addon1" disabled>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Name</span>
                                        <input type="text" class="form-control" placeholder="Enter the name..." aria-label="name" aria-describedby="basic-addon1" id="nameProduct2">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Price</span>
                                        <input type="text" class="form-control" placeholder="Enter the price..." aria-label="price" aria-describedby="basic-addon1" id="priceProduct2">
                                    </div>
                                    <select class="form-select" aria-label="Default select example" id="listCategory2">
                                        <option selected>Category</option>
                                    </select>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="editProduct(${data[i].id})">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`
            }
            $("#list-product").html(content);
            showListCategory2();
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function searchNameProduct() {
    
}
