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
                <button type="button" class="btn btn-outline-warning btn-sm">Edit</button>
            </td>
        </tr>`;
            }
            $("#list-product").html(content);
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

function editProduct(id) {
    
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
                <button type="button" class="btn btn-outline-warning btn-sm">Edit</button>
            </td>
        </tr>`
            }
            $("#list-product").html(content);
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
                <button type="button" class="btn btn-outline-warning btn-sm">Edit</button>
            </td>
        </tr>`
            }
            $("#list-product").html(content);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function searchNameProduct() {
    
}
