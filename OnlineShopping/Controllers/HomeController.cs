using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

using System.Diagnostics;

namespace OnlineShopping.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env, IConfiguration configuration)
        {
            _logger = logger;
            _env = env;
            _configuration = configuration;
        }

        public IActionResult Home()
        {
           
            return View();
        }

        public IActionResult Shop()
        {
            return View();
        }

        public IActionResult Products()
        {
            return View();
        }

        public IActionResult FetchProductJson()
        {
            string response = "";
            try
            {
                string path = Path.Combine(_env.WebRootPath, "json", "Products.json");
                response = System.IO.File.ReadAllText(path);
            }
            catch (Exception ex)
            {

            }
            return Json(new { response });

        }

        public IActionResult RedirectToWhatsApp(string message = "")
        {
            string phoneNumber = _configuration["phoneNumber"];
            // Format the phone number (remove spaces, special characters, etc.)
            phoneNumber = new string(phoneNumber.Where(char.IsDigit).ToArray());

            // Construct the WhatsApp URL
            var whatsappUrl = $"https://api.whatsapp.com/send?phone={phoneNumber}&text={Uri.EscapeDataString(message)}";

            string script = $"<script>window.open('{whatsappUrl}', '_blank');</script>";

            // Redirect to the WhatsApp URL
            return Content(script, "text/html");
        }

        public IActionResult ContactUs()
        {
            return View();
        }

    }
}
