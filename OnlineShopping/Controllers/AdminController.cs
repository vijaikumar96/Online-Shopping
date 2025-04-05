using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnlineShopping.Models;
using System.IO;
using static OnlineShopping.Models.ProductModel;

namespace OnlineShopping.Controllers
{
    public class AdminController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public AdminController(IWebHostEnvironment env)
        {
            _env = env;
        }
        public IActionResult Category()
        {
            return View();
        }
        public IActionResult SubCategory()
        {
            return View();
        }
        public IActionResult Products()
        {            
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SubCategoryActions(IFormFile file, string categoryName, string subCategoryName, string status,
            string flag, string existingImageName)
        {
            string result = "";
            string errorMessage = "";
            bool responseStatus = false;
            try
            {
                if (file == null || file.Length == 0)
                {
                    return Json(new { status, result, errorMessage = "Please  select Image" });
                }

                string jsonPath = Path.Combine(_env.WebRootPath, "json", "Products.json");
                

                List<Category> Categories = FetchJson();
                // Define the path where the image will be saved
                var uploadsFolder = Path.Combine(_env.WebRootPath, "images");


                if (flag == "Create")
                {
                    // Ensure the uploads folder exists
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    SubCategory subCategory = new SubCategory();

                    subCategory.subCategoryName = subCategoryName;
                    subCategory.subCategoryImagepath = uniqueFileName;
                    subCategory.products = new List<Product>();

                    Categories.Where(v => v.categoryName == categoryName).FirstOrDefault()?.subCategory.Add(subCategory);
                    result = "Sub Category Created Successfully";
                }
                else
                {
                    string existingFilePath = Path.Combine(uploadsFolder, existingImageName);
                    System.IO.File.Delete(existingFilePath);

                    var filePath = Path.Combine(uploadsFolder, existingImageName);

                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    Categories.Where(v => v.categoryName == categoryName).FirstOrDefault()?
                        .subCategory.Where(v => v.subCategoryImagepath == existingImageName).ToList().ForEach(j =>
                        {
                            j.subCategoryName = subCategoryName;
                            j.subCategoryImagepath = existingImageName;
                            j.status = status;
                        });

                    result = "Sub Category Udpated Successfully";
                }

            


                var updatedJson = JsonConvert.SerializeObject(Categories, Formatting.Indented);

                System.IO.File.WriteAllText(jsonPath, updatedJson);

               
                responseStatus = true;


            }
            catch (Exception ex)
            {
                result = "";
                errorMessage = "Unable to process your request. (#05)";
            }
           
           return Json(new {status = responseStatus, result, errorMessage});
        }

        [HttpPost]
        public async Task<IActionResult> CategoryActions(IFormFile file, string categoryName, string status,string flag, string existingImageName)
        {
            string result = "";
            string errorMessage = "";
            bool responseStatus = false;
            try
            {
                if (file == null || file.Length == 0)
                {
                    return Json(new { status, result, errorMessage = "Please  select Image" });
                }

                string jsonPath = Path.Combine(_env.WebRootPath, "json", "Products.json");


                List<Category> Categories = FetchJson();
                // Define the path where the image will be saved
                var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
                if (flag == "Create")
                {
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    Category category = new Category();

                    category.categoryImagePath = uniqueFileName;
                    category.categoryName = categoryName;
                    category.status = status;
                    category.subCategory = new List<SubCategory>();

                    Categories.Add(category);
                    result = "Category Created Successfully";

                }
                else
                {
                    string existingFilePath = Path.Combine(uploadsFolder, existingImageName);
                    System.IO.File.Delete(existingFilePath);

                    var filePath = Path.Combine(uploadsFolder, existingImageName);



                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    Categories.Where(v => v.categoryImagePath == existingImageName).ToList().ForEach(j =>
                    {
                        j.categoryName = categoryName;
                        j.categoryImagePath = existingImageName;
                        j.status = status;
                    });
                    result = "Category Udpated Successfully";
                }
             

                // Ensure the uploads folder exists
               

                var updatedJson = JsonConvert.SerializeObject(Categories, Formatting.Indented);

                System.IO.File.WriteAllText(jsonPath, updatedJson);

              
                responseStatus = true;


            }
            catch (Exception ex)
            {
                errorMessage = "Unable to process your request. (#05)";
            }

            return Json(new { status = responseStatus, result, errorMessage });
        }

        [HttpPost]
        public async Task<IActionResult> ProductActions(IFormFile file, string categoryName, string subCategoryName,
            string productName, float MRP, float sellingPrice,string flag, string status, string existingImageName,
            string description)
        {
            string result = "";
            string errorMessage = "";
            bool responseStatus = false;
            try
            {
                if (file == null || file.Length == 0)
                {
                    return Json(new { status = responseStatus, result, errorMessage = "Please  select Image" });
                }

                string jsonPath = Path.Combine(_env.WebRootPath, "json", "Products.json");


                List<Category> Categories = FetchJson();


                // Define the path where the image will be saved
                var uploadsFolder = Path.Combine(_env.WebRootPath, "images");

                // Ensure the uploads folder exists
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

               

                if (flag == "Create")
                {
                    // Generate a unique file name
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    Product product = new Product();

                    product.productName = productName;

                    product.MRP = MRP;
                    product.sellingPrice = sellingPrice;

                    product.productImagepath = uniqueFileName;
                    product.description = description;


                    Categories.Where(v => v.categoryName == categoryName).FirstOrDefault()?
                        .subCategory.Where(j => j.subCategoryName == subCategoryName).FirstOrDefault()
                        .products.Add(product);
                }
                else
                {
                    string existingFilePath = Path.Combine(uploadsFolder, existingImageName);
                    System.IO.File.Delete(existingFilePath);

                    var filePath = Path.Combine(uploadsFolder, existingImageName);



                    // Save the file to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }                    

                    Categories.Where(v => v.categoryName == categoryName).FirstOrDefault()?
                       .subCategory.Where(j => j.subCategoryName == subCategoryName).FirstOrDefault()
                       .products.Where(k => k.productImagepath == existingImageName).ToList() // Materialize to avoid multiple enumeration
                       .ForEach(p =>
                       {
                           p.productName = productName;
                           p.sellingPrice = sellingPrice;
                           p.MRP = MRP;
                           p.productImagepath = existingImageName;
                           p.status = status;
                           p.description = description;
                           // ... other properties
                       });

                }


                var updatedJson = JsonConvert.SerializeObject(Categories, Formatting.Indented);

                System.IO.File.WriteAllText(jsonPath, updatedJson);

                result = flag == "Create" ? "Product Created Successfully" : "Product Updated Successfully";
                responseStatus = true;


            }
            catch (Exception ex)
            {
                errorMessage = "Unable to process your request. (#05)";
            }

            return Json(new { status = responseStatus, result, errorMessage });
        }

        

        private List<Category> FetchJson()
        {
            string jsonPath = Path.Combine(_env.WebRootPath, "json", "Products.json");
            string existingProductDetails = System.IO.File.ReadAllText(jsonPath);
            List<Category> Categories = new List<Category>();
            if (existingProductDetails != "")
            {
                Categories = JsonConvert.DeserializeObject<List<Category>>(existingProductDetails);
            }

            return Categories;
        }
    }
}
