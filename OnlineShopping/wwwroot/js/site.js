
$("body").on("click", ".add-to-cart", function () {
    event.preventDefault();
    var $this = $(this);
    miniCart();
    bindCartDetails($this);
    $this.parents(".quickview-modal").find(".quickview-modal-header button").click();

});

function miniCart() {
    $("#cart-drawer").removeClass("invisible").addClass("active visible");
    $(".bg-screen .bg-shop").removeClass("opacity-0 invisible").addClass("opacity-50 visible");
}


function handlePlusAction(arg) {
    var productId = $(arg).data("productid");
    var $input = $(arg).parent().find("input.js-qty-num");
    let quantity = parseInt($input.val()) + 1;
     $input.val(parseInt($input.val()) + 1);
    $input.change();
    AssignQuantity(productId, quantity)

    return false;
}

function handleMinusAction(arg) {
    var productId = $(arg).data("productid");
    var $input = $(arg).parent().find("input.js-qty-num"),
        $count = parseInt($input.val()) - 1;
    $count = $count < 1 ? 1 : $count;
    $input.val($count);
    $input.change();
    AssignQuantity(productId, $count)
    return false;
}

function handleRemoveCart(arg) {
    var productId = $(arg).data("productid");

    CartProducts = $.grep(CartProducts, function (v, j) {
        return v.productId != productId;
    });

    BuildCartDetails();
    CalcuateTotalAmount();

}

function AssignQuantity(productId, quantity) {

    let index = CartProducts.findIndex(v => v.productId == productId);
    CartProducts[index].quantity = quantity;
    BuildCartDetails();
    CalcuateTotalAmount();
}




function BuildCartDetails() {
    var cartBuilder = '';
    $.map(CartProducts, function (v, j) {
        cartBuilder += '<div class="cart-drawer-info ptb-15 bst">';
        cartBuilder += '<div class="cart-drawer-content d-flex flex-wrap">';
        cartBuilder += '<div class="cart-drawer-image width-88">';
        cartBuilder += '<a href="javascript:void(0)" class="d-block br-hidden">';
        cartBuilder += '<img src="' + imagesRootPath + v.productImagepath + '" class="w-100 img-fluid" alt="cart-1">';
        cartBuilder += '</a>';       
        cartBuilder += '</div>';
        cartBuilder += '<div class="cart-drawer-info width-calc-88 psl-15">';
        cartBuilder += '<div class="cart-drawer-detail">';
        cartBuilder += '<a href="javascript:void(0)" class="body-dominant-color">' + v.productName + '</a>';
        cartBuilder += '<span class="d-block mst-4">' + (v.description || "") + '</span>';
        cartBuilder += '</div>';
        cartBuilder += '<div class="heading-color heading-weight mst-9">  &#8377; ' + (v.quantity * v.sellingPrice) + '</div>';
        cartBuilder += '<div class="cart-drawer-qty-remove d-flex align-items-end justify-content-between mst-14">';
        cartBuilder += '<div class="js-qty-wrapper">';
        cartBuilder += '<div class="js-qty-wrap d-flex extra-bg border-full br-hidden">';
        cartBuilder += '<button type="button"  data-productid=' + v.productId + ' onclick="handleMinusAction(this)"  class="js-qty-adjust js-qty-adjust-minus body-color icon-16 ber" aria-label="Remove item">';
        cartBuilder += '<i class="ri-subtract-line d-block lh-1"></i>';
        cartBuilder += '</button>';
        cartBuilder += '<input type="number" disabled class="js-qty-num p-0 text-center border-0" value="' + v.quantity + '" min="1">';
        cartBuilder += '<button type="button" data-productid=' + v.productId + ' onclick="handlePlusAction(this)" class="js-qty-adjust js-qty-adjust-plus body-color icon-16 bsl" aria-label="Add item">';
        cartBuilder += '<i class="ri-add-line d-block lh-1"></i>';
        cartBuilder += '</button>';
        cartBuilder += '</div>';
        cartBuilder += '</div>';
        cartBuilder += '<button type="submit"  data-productid=' + v.productId + ' onclick="handleRemoveCart(this)" class="cart-drawer-remove text-danger icon-16" aria-label="Remove item">';
        cartBuilder += '<i class="ri-delete-bin-line d-block lh-1"></i>';
        cartBuilder += '</button>';
        cartBuilder += '</div>';
        cartBuilder += '</div>';
        cartBuilder += '</div>';
        cartBuilder += '</div>';
    });

    $(".clsCartDrawer").html(cartBuilder);
    $(".cartCount").html(CartProducts.length);
    if (CartProducts == 0)
        $(".drawer-cart-empty").removeClass("d-none");
    else
        $(".drawer-cart-empty").addClass("d-none");
    
}

function bindCartDetails(currthis) {
    
    var productId = currthis.data("productid");
    var alreadyInCart = $.grep(CartProducts, function (v, j) {
        return v.productId == productId;
    });

    if (alreadyInCart.length) {
        let index = CartProducts.findIndex(v => v.productId == productId);
        CartProducts[index].quantity = CartProducts[index].quantity + 1;
       
    }
    else {
        var currProduct = $.grep(TotalProducts, function (v, j) {
            return v.productId == productId;
        });

        currProduct[0].quantity = 1;

        CartProducts.push(currProduct[0]);
    }
    BuildCartDetails();
    CalcuateTotalAmount();
}

function CalcuateTotalAmount() {
    var totalAmount = 0;
    $.map(CartProducts, function (v, j) {
        totalAmount = totalAmount + (v.quantity * v.sellingPrice);
    })
    $(".cartTotalAmount").html("&#8377;" + " " + totalAmount);
}

function buyProducts() {

    if (CartProducts.length == 0) {
        alert("Please select atlease one product");
        return false;
    }

    var messageBuilder = "I would like to buy \n";
    $.map(CartProducts, function (v, j) {
        messageBuilder += v.productName + " - " + v.quantity + " quantity \n"
    });
        
    var phoneNumber = "+919788404087";
   
    // Format the phone number
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Construct the WhatsApp URL
    var whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageBuilder)}`;

    // Redirect to the WhatsApp URL
    window.open(whatsappUrl, '_blank');
 
}

function GettingInputFieldvalues(clsname) {
    var tempstorary = [];
    var valerror = false;
      
    $(".spncmnclserormsg").length ? $(".spncmnclserormsg").remove() : "";
 
    $("." + clsname).each(function () {
        var parentthis = $(this);
        var currobj = {};

        $(this).find(".custom-control").each(function () {
            var currthis = $(this);
            var inptype = currthis.attr("type") || "";
            var attrname = currthis.attr("name") || ""; 
            var showerrorname = currthis.data("displayname") || attrname;
            
            var attrval = inptype == "radio" ? parentthis.find(('input[name=' + attrname + ']:checked')).data("val")
                : inptype == "checkbox" ? currthis.prop("checked") :
                    inptype == "file" ? currthis[0].files[0] :
                    (currthis.val() || "");


            var mandatoryflag = currthis.data("mandatory") || "N";

            if (attrname != "") {              
                if (mandatoryflag == "Y" && attrval == "") {
                    var errormsg = showerrorname + " is required ";

                    currthis.closest(".custom-group").append($("<span class='spncmnclserormsg text-danger'> " + errormsg + " </span>"));
                    currthis.focus();
                    valerror = true;
                    return false;

                }
                if (!valerror) {
                    currobj[attrname] = attrval;
                }
            }
        });
        if (valerror)
            return false;
        else
            tempstorary.push(currobj)

    });
    return valerror ? [] : tempstorary;
}
function SelectCategory(arg) {   
    $(".dominant-link").removeClass("active");
    $(arg).find(".dominant-link").addClass("active");
    $(".activeIcon").hide();
    $(arg).find(".activeIcon").show();
    InitiateFiltration();
}

function InitiateFiltration() {
    var minVal = $(".range-input input").first().val();
    var maxVal = $(".range-input input").last().val();

    var subCategoryId = $(".dominant-link.active").data("subcategoryid");

    var currentFiltered = [];

    var currentArray = filteredFlag ? FilteredArray : TotalProducts;

    currentFiltered = $.grep(currentArray, function (v, j) {
        return v.sellingPrice >= minVal && v.sellingPrice <= maxVal
    });

    if (currentFiltered) {
        currentFiltered = $.grep(currentFiltered, function (v, j) {
            return v.subCategoryId == subCategoryId || subCategoryId == "all"
        });
    }

    var productBuilder = "";
    $(".spn-current-avail-count").html(currentFiltered.length);
    if (currentFiltered.length) {
       
        $.map(currentFiltered, function (product, subIndex) {
            productBuilder += bindProdcuts(product);
        });

        $(".dvclsavailability").html(productBuilder);
    }
    else {
        $(".dvclsavailability").html("<div class ='alert alert-info'> No products found </div> ");
    }
    
}

function handleSorting() {
    var sortType = $("#sortby").val();
    var currentArray = filteredFlag ? FilteredArray : TotalProducts;
    if (sortType == "price-ascending")
        currentArray = currentArray.sort((a, b) => a.sellingPrice - b.sellingPrice);
    else if (sortType == "price-descending")
        currentArray = currentArray.sort((a, b) => b.sellingPrice - a.sellingPrice);
    else if (sortType == "title-ascending")
        currentArray = currentArray.sort((a, b) => a.productName.localeCompare(b.productName));
    else if (sortType == "title-descending")
        currentArray = currentArray.sort((a, b) => b.productName.localeCompare(a.productName));

    var productBuilder = "";
    $.map(currentArray, function (product, subIndex) {
        productBuilder += bindProdcuts(product);
    });

    $(".dvclsavailability").html(productBuilder);    
}

function dynamicShopMenuBuilder() {
    var homeMenuBuilder = "";
    var homeMenuMobileBuilder = "";
    $.map(productJson, function (category, index) {
        category.status = category.status || "Active";
        if (category.status == "Active") {
            homeMenuBuilder += '<li class="menudrop-li position-relative">';
            homeMenuBuilder += '<div class="menu-sublink ptb-5 plr-30">';
            homeMenuBuilder += '<a href="' + shopUrl + '?type=' + category.categoryName + '" class="d-flex flex-wrap align-items-center">';
            homeMenuBuilder += '<span class="menusub-title width-calc-16"> ' + category.categoryName + ' </span>';
            homeMenuBuilder += '</a>';
            homeMenuBuilder += '</div>';
            homeMenuBuilder += '</li>';



            homeMenuMobileBuilder += '<li class="menudrop-li bst">';
            homeMenuMobileBuilder += '<div class="menu-btn d-flex">';
            homeMenuMobileBuilder += '<span class="width-calc-48 ptb-10 psl-20 per-15">';
            homeMenuMobileBuilder += '<a href="' + shopUrl + '?type=' + category.categoryName + '" class="d-inline-block body-color"> ' + category.categoryName + ' </a>';
            homeMenuMobileBuilder += '</span>';
            homeMenuMobileBuilder += '</div>';
            homeMenuMobileBuilder += '</li>';
        }
    });

    $(".ulShopMenu").html(homeMenuBuilder);
    $(".ulShopMobileMenu").html(homeMenuMobileBuilder);
}