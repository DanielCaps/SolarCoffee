using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SolarCoffee.Services.Inventory;
using SolarCoffee.Web.Serialization;
using SolarCoffee.Web.ViewModels;

namespace SolarCoffee.Web.Controllers
{
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly IInventoryService _inventoryService;

        public InventoryController(ILogger<InventoryController> logger, IInventoryService inventoryService)
        {
            _logger = logger;
            _inventoryService = inventoryService;
        }

        [HttpGet("/api/inventory")]
        public IActionResult GetCurrentInventory(){
            _logger.LogInformation("Getting Current Inventory...");

            var inventory = _inventoryService.GetCurrentInventory()
                .Select(pi => new ProductInventoryModel{
                    Id = pi.Id,
                    Product = ProductMapper.SerializeProductModel(pi.Product),
                    IdealQuantity = pi.IdealQuantity,
                    QuantityOnHand = pi.QuantityOnHand,
                })
                .OrderBy(inv => inv.Product.Name)
                .ToList();
            return Ok(inventory);
        }

        [HttpPatch("/api/inventory")]
        public IActionResult UpdateInventory([FromBody] ShipmentModel shipment){
            _logger.LogInformation($"Updating Inventory for {shipment.ProductId}: Adjustment {shipment.Adjustment}");

            var id = shipment.ProductId;
            var adjustment = shipment.Adjustment;
            var inventory = _inventoryService.UpdateUnitsAvailable(id, adjustment);
            return Ok(inventory);
        }
    }
}