window.ApexProducts = {
  cpu: [
    {
      id: 101,
      name: "AMD Ryzen 5 7600",
      price: 849,
      socket: "AM5",
      ramType: "DDR5",
      wattage: 65
    },
    {
      id: 102,
      name: "AMD Ryzen 7 7800X3D",
      price: 1649,
      socket: "AM5",
      ramType: "DDR5",
      wattage: 120
    },
    {
      id: 103,
      name: "Intel Core i5-14400F",
      price: 899,
      socket: "LGA1700",
      ramType: "DDR5",
      wattage: 148
    }
  ],

  motherboard: [
    {
      id: 201,
      name: "B650 Gaming WiFi DDR5",
      price: 749,
      socket: "AM5",
      ramType: "DDR5",
      formFactor: "ATX"
    },
    {
      id: 202,
      name: "B650M Gaming DDR5",
      price: 599,
      socket: "AM5",
      ramType: "DDR5",
      formFactor: "MATX"
    },
    {
      id: 203,
      name: "B760 Gaming WiFi DDR5",
      price: 699,
      socket: "LGA1700",
      ramType: "DDR5",
      formFactor: "ATX"
    }
  ],

  gpu: [
    {
      id: 301,
      name: "RTX 4060 8GB",
      price: 1499,
      wattage: 115,
      length: 250
    },
    {
      id: 302,
      name: "RTX 4070 Super 12GB",
      price: 2799,
      wattage: 220,
      length: 300
    },
    {
      id: 303,
      name: "RTX 5070 12GB",
      price: 3299,
      wattage: 250,
      length: 305
    }
  ],

  ram: [
    {
      id: 401,
      name: "16GB DDR5 5600MHz",
      price: 249,
      ramType: "DDR5"
    },
    {
      id: 402,
      name: "32GB DDR5 6000MHz",
      price: 449,
      ramType: "DDR5"
    }
  ],

  storage: [
    {
      id: 501,
      name: "NVMe SSD 1TB",
      price: 299,
      wattage: 8
    },
    {
      id: 502,
      name: "NVMe SSD 2TB",
      price: 549,
      wattage: 10
    }
  ],

  cooler: [
    {
      id: 601,
      name: "Air Cooler 120mm",
      price: 159,
      sockets: ["AM5", "LGA1700"],
      radiatorSize: 0,
      wattage: 5
    },
    {
      id: 602,
      name: "Liquid Cooler 240mm",
      price: 399,
      sockets: ["AM5", "LGA1700"],
      radiatorSize: 240,
      wattage: 15
    },
    {
      id: 603,
      name: "Liquid Cooler 360mm",
      price: 599,
      sockets: ["AM5", "LGA1700"],
      radiatorSize: 360,
      wattage: 20
    }
  ],

  psu: [
    {
      id: 701,
      name: "650W 80+ Bronze",
      price: 299,
      capacity: 650
    },
    {
      id: 702,
      name: "750W 80+ Gold",
      price: 449,
      capacity: 750
    },
    {
      id: 703,
      name: "850W 80+ Gold",
      price: 599,
      capacity: 850
    }
  ],

  case: [
    {
      id: 801,
      name: "Apex Flow ATX Case",
      price: 349,
      formFactors: ["ATX", "MATX"],
      maxGpuLength: 340,
      radiatorSizes: [240, 360]
    },
    {
      id: 802,
      name: "Apex Mini MATX Case",
      price: 279,
      formFactors: ["MATX"],
      maxGpuLength: 290,
      radiatorSizes: [240]
    }
  ]
};