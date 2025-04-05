

function bindProdcuts(product) {
    var productBuilder = "";
    product.status = product.status || "Active";
    if (product.status != "Inactive") {
        productBuilder += '<div class="col-6 col-md-4 shop-col">';
        productBuilder += '<div class="single-product">';
        productBuilder += '<div class="row single-product-wrap">';
        productBuilder += '<div class="product-image">';
        productBuilder += '<a href="javascript:void(0)" class="pro-img">';
        productBuilder += '<img src="' + imagesRootPath + product.productImagepath + '" class="w-100 img-fluid img1" alt="p-1">';
        productBuilder += '<img src="' + imagesRootPath + product.productImagepath + '" class="w-100 img-fluid img2" alt="p-2">';
        if (product.status == "Sold")
            productBuilder += '<span class="product-label product-label-sold product-label-left">Sold</span>';
        productBuilder += '</a>';
        productBuilder += '<div class="product-action">';
        //productBuilder += '<a href="#quickview-modal" data-bs-toggle="modal" class="quick-view">';
        //productBuilder += '<span class="product-icon">';
        //productBuilder += '<i class="ri-eye-line d-block icon-16 lh-1"></i>';
        //productBuilder += '</span>';
        //productBuilder += '<span class="tooltip-text">quickview</span>';
        //productBuilder += '</a>';
        productBuilder += '</div>';
        productBuilder += '</div>';
        productBuilder += '<div class="product-content">';
        productBuilder += '<div class="pro-content">';

        productBuilder += '<div class="product-title">';
        productBuilder += '<span class="d-block heading-weight text-uppercase">';
        productBuilder += '<a href="product.html" class="d-block w-100 dominant-link text-truncate">' + product.productName + '</a>';
        productBuilder += '</span>';
        productBuilder += '</div>';
        productBuilder += '<div class="price-box">';

        productBuilder += '<span class="new-price dominant-color heading-weight"> &#8377;   ' + product.sellingPrice + '</span>';
        if (product.MRP != product.sellingPrice)
            productBuilder += '<span class="old-price heading-weight text-decoration-line-through">' + product.MRP + '</span>';
        productBuilder += '</div>';
        productBuilder += '<div class="row">';
        productBuilder += '<div class="col-sm-12">';
        if (product.status == "Sold")
            productBuilder += '<button disabled="true" class="w-100 btn-style1 disabled-btn  mst-15"  data-subcategoryid =' + product.subCategoryId + ' data-productid =' + product.productId + ' type="secondary"> Out of stock </button>';
        else
            productBuilder += '<button  class="w-100 btn-style1 secondary-btn mst-15 add-to-cart"  data-subcategoryid =' + product.subCategoryId + ' data-productid =' + product.productId + ' type="primary"> Add to cart </button>';
        productBuilder += '</div>';

        productBuilder += '</div>';
        productBuilder += '<div class="product-description">';
        productBuilder += '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry It is a long established fact that a will be distracted by the readable of at</p>';
        productBuilder += '</div>';
        productBuilder += '<div class="product-action" style="display:none">';
        productBuilder += '<a href="javascript:void(0)" class="add-to-cart">';
        productBuilder += '<span class="product-icon">';
        productBuilder += '<span class="product-bag-icon icon-16">';
        productBuilder += '<i class="ri-shopping-bag-3-line d-block lh-1"></i>';
        productBuilder += '</span>';
        productBuilder += '<span class="product-loader-icon icon-16">';
        productBuilder += '<i class="ri-loader-4-line d-block lh-1"></i>';
        productBuilder += '</span>';
        productBuilder += '<span class="product-check-icon icon-16">';
        productBuilder += '<i class="ri-check-line d-block lh-1"></i>';
        productBuilder += '</span>';
        productBuilder += '</span>';
        productBuilder += '<span class="tooltip-text">add to cart</span>';
        productBuilder += '</a>';
        productBuilder += '<a href="#quickview-modal" data-bs-toggle="modal" class="quick-view">';
        productBuilder += '<span class="product-icon">';
        productBuilder += '<i class="ri-eye-line d-block icon-16 lh-1"></i>';
        productBuilder += '</span>';
        productBuilder += '<span class="tooltip-text">quickview</span>';
        productBuilder += '</a>';
        productBuilder += '<a href="javascript:void(0)" class="add-to-wishlist">';
        productBuilder += '<span class="product-icon">';
        productBuilder += '<i class="ri-heart-line d-block icon-16 lh-1"></i>';
        productBuilder += '</span>';
        productBuilder += '<span class="tooltip-text">wishlist</span>';
        productBuilder += '</a>';
        productBuilder += '</div>';
        productBuilder += '</div>';
        productBuilder += '</div>';
        productBuilder += '</div>';
        productBuilder += '</div>';
        productBuilder += '</div>';
    }
   

    return productBuilder;

}