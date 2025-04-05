namespace OnlineShopping.Models
{
    public class ProductModel
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
        public class Product
        {
            public string productName { get; set; }
            public string productImagepath { get; set; }
            public object MRP { get; set; }
            public object sellingPrice { get; set; }
            public string description { get; set; }
            public string status { get; set; }
        }

        public class Category
        {
            public string categoryName { get; set; }
            public string categoryImagePath { get; set; }
            public string status { get; set; }
            public List<SubCategory> subCategory { get; set; }
        }

        public class SubCategory
        {
            public string subCategoryName { get; set; }
            public string subCategoryImagepath { get; set; }
            public string status { get; set; }
            public List<Product> products { get; set; }
        }


    }
}
