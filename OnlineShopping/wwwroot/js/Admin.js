var TotalAdminProducts = [];

function InitiateAdminProducts() { 
    debugger
    var categoryOptionBuilder = '<option value="" >--Select Category--</option>';
    $.map(productJson, function (v, j) {
        v.status = v.status || "Active";
        if (v.status == "Active")
            categoryOptionBuilder += '<option value="' + v.categoryName + '">' + v.categoryName + '</option>';
    });

    $('.custom-control[name="categoryName"]').html(categoryOptionBuilder);

    var categoryId = 1;
    var subCategoryId = 1;
    var productId = 1;
    $.map(productJson, function (category, ccnt) {
        category.status = category.status || "Active";
       
            $.map(category.subCategory, function (subcategory, sccnt) {
                subcategory.status = subcategory.status || "Active";
               
                    $.map(subcategory.products, function (product, sccnt) {
                        product.categoryId = categoryId;
                        product.subCategoryId = subCategoryId;
                        product.productId = productId;
                        product.categoryName = category.categoryName;
                        product.subCategoryName = subcategory.subCategoryName;
                        TotalAdminProducts.push(product);
                        productId++;
                    });
                    subCategoryId++;
                             
            });
            categoryId++;
        
       
    });


}

$('body').on('change', '.custom-control[name="categoryName"]', function () {
    var categoryName = $(this).val();

    var subCategories = $.grep(productJson, function (v, j) {
        return v.categoryName == categoryName;
    });

    var subCategoryOptionBuilder = '<option value="" >--Select Sub Category--</option>';
    $.map(subCategories[0].subCategory, function (v, j) {
        subCategoryOptionBuilder += '<option value="' + v.subCategoryName + '">' + v.subCategoryName + '</option>';
    });

    $('.custom-control[name="subCategoryName"]').html(subCategoryOptionBuilder);

});

function invokeViewProducts() {
    var productBuilder = "";

            $.map(TotalAdminProducts, function (product, sccnt) {
                productBuilder += "<tr>";
                productBuilder += "<td>" + product.categoryName + "</td>";
                productBuilder += "<td>" + product.subCategoryName + "</td>";
                productBuilder += "<td>" + product.productName + "</td>";
                productBuilder += '<td> <img src="' + imagesRootPath + product.productImagepath + '" width="50" height="50"></td>';
                productBuilder += "<td>" + (product.description || "-") + "</td>";
                productBuilder += "<td>" + product.MRP + "</td>";
                productBuilder += "<td>" + product.sellingPrice + "</td>";
                productBuilder += "<td>" + product.status + "</td>";
                productBuilder += '<td> <i onclick="handleEditProduct(' + product.productId + ')" class="ri-edit-box-line font-14"></i> </td>';
                productBuilder += "</tr>";
            });
       

   

    if ($.fn.DataTable.isDataTable('#tableViewProducts')) {
        $('#tableViewProducts').DataTable().destroy();
    }

    $(".tbodyViewProduct").html(productBuilder);

    $('#tableViewProducts').DataTable({    
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 10,
        //lengthMenu: [5, 10, 25, 50],
       
      
    });
}

function invokeViewCategories() {
   
    var categoryBuilder = "";

    $.map(productJson, function (category, sccnt) {
      
                categoryBuilder += "<tr>";
                categoryBuilder += "<td>" + category.categoryName + "</td>";
                categoryBuilder += '<td> <img src="' + imagesRootPath + category.categoryImagePath + '" width="50" height="50"></td>';
                categoryBuilder += "<td>" + (category.status || "Active") + "</td>";
                categoryBuilder += '<td> <i onclick="handleEditCategory(' + sccnt + ')" class="ri-edit-box-line font-14"></i> </td>';
                categoryBuilder += "</tr>";
         
      
    });


    if ($.fn.DataTable.isDataTable('#tableViewCategory')) {
        $('#tableViewCategory').DataTable().destroy();
    }

    $(".tbodyViewCategory").html(categoryBuilder);

    $('#tableViewCategory').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 10,
        //lengthMenu: [5, 10, 25, 50],


    });
}



function invokeViewSubCategories() {

    var subCategoryBuilder = "";
    debugger
    $.map(productJson, function (category, ccnt) {               
            $.map(category.subCategory, function (subcategory, sccnt) {
                               
                subCategoryBuilder += "<tr>";
                subCategoryBuilder += "<td>" + category.categoryName + "</td>";
                subCategoryBuilder += "<td>" + subcategory.subCategoryName + "</td>";
                subCategoryBuilder += '<td> <img src="' + imagesRootPath + subcategory.subCategoryImagepath + '" width="50" height="50"></td>';
                subCategoryBuilder += "<td>" + (subcategory.status || "Active") + "</td>";
                subCategoryBuilder += '<td> <i onclick="handleEditSubCategory(' + ccnt + ',' + sccnt + ')" class="ri-edit-box-line font-14"></i> </td>';
                subCategoryBuilder += "</tr>";
                
            });        
    });


    if ($.fn.DataTable.isDataTable('#tableViewSubCategory')) {
        $('#tableViewSubCategory').DataTable().destroy();
    }

    $(".tbodyViewSubCategory").html(subCategoryBuilder);

    $('#tableViewSubCategory').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 10,
        //lengthMenu: [5, 10, 25, 50],


    });
}
function handleEditProduct(productId) {

    $('#li-create-product a').tab('show');
    var filteredProduct = $.grep(TotalAdminProducts, function (v, j) {
        return v.productId == productId
    });

    for (var key in filteredProduct[0]) {
        if (key == "productImagepath") {    
            $('.custom-control[name="existingImageName"]').val(filteredProduct[0][key]);  
            appendImagetoFile(key, filteredProduct, "productImagepath");
                      
        }
        else {
            $('.custom-control[name="' + key + '"]').val(filteredProduct[0][key]).change();
        }

    }
    $(".product-submit-btn").html("Update");
    $('.custom-control[name="flag"]').val("Update");  
    
   
}


function handleEditCategory(categoryId) {
    debugger
    $('#li-create-category a').tab('show');
    var filteredCategory = $.grep(productJson, function (v, j) {
        return j == categoryId
    });

    for (var key in filteredCategory[0]) {
        if (key == "categoryImagePath") {
            $('.custom-control[name="existingImageName"]').val(filteredCategory[0][key]);
            appendImagetoFile(key, filteredCategory,"categoryImagePath");

        }
        else {
            $('.custom-control[name="' + key + '"]').val(filteredCategory[0][key]).change();
        }

    }
    $(".category-submit-btn").html("Update");
    $('.custom-control[name="flag"]').val("Update");


}


function handleEditSubCategory(categoryId,subCategoryId) {
    debugger
    $('#li-create-subcategory a').tab('show');
    var filteredCategory = $.grep(productJson, function (v, j) {
        return j == categoryId
    });

    var filteredSubCategory = $.grep(filteredCategory[0].subCategory, function (ca, cacnt) {
        return cacnt == subCategoryId;
    });
    $('.custom-control[name="categoryName"]').val(filteredSubCategory[0].products[0].categoryName).change();
    
    for (var key in filteredSubCategory[0]) {
        if (key == "subCategoryImagepath") {
            $('.custom-control[name="existingImageName"]').val(filteredSubCategory[0][key]);
            appendImagetoFile(key, filteredSubCategory, "subCategoryImagepath");

        }
        else {
            $('.custom-control[name="' + key + '"]').val(filteredSubCategory[0][key]).change();
        }

    }
    $(".subcategory-submit-btn").html("Update");
    $('.custom-control[name="flag"]').val("Update");


}

function appendImagetoFile(key, filteredProduct,imageKeyName) {
    const imagePath = "../" + imagesRootPath + filteredProduct[0][key]; //

    fetch(imagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Image not found or invalid path');
            }
            return response.blob(); // Convert the response to a Blob
        })
        .then(blob => {
            // Create a File object from the Blob
            const file = new File([blob], filteredProduct[0][imageKeyName], { type: 'image/jpg' });

            // Set the file in the input and trigger the change event
            const defaultImageInput = $('.custom-control[name="' + imageKeyName +'"]')[0]; // Get the DOM element
            const dataTransfer = new DataTransfer(); // Create a DataTransfer object
            dataTransfer.items.add(file); // Add the file to the DataTransfer object
            defaultImageInput.files = dataTransfer.files; // Set the files property of the input
            $(defaultImageInput).trigger('change'); // Trigger the change event using jQuery
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });
}