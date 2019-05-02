exStims = _.shuffle([
  {noun: "star", adjective: "blue", fileinit: "starBlue",
   range:[[1, 9]]},
  {noun: "star", adjective: "blue", fileinit: "starBlue",
   range:[[1, 1]]},
  {noun: "star", adjective: "blue", fileinit: "starBlue",
   range:[[9, 9]]},
]);

allStims = [
  {noun: "pencil", adjective: "long", fileinit: "pencilLong", 
range:[[160,200], [160, 260], [160, 300], [160, 360], 
[200,260], [200, 300], [200, 360], 
[260,300], [260,360], 
[300,360], 
[140,160], [180,200], [240, 260], [280, 300], [340, 360],
[120,160],
[0,40], [20,40], [380,420], [400,420]
]},
{noun: "glass", adjective: "tall", fileinit: "glassTall", range:[[240,270], [240,300], [240,330], [240,360],
[270,300], [270,330], [270,360],
[300,330], [300,360],
[330,360],
[230,240],[260,270], [290,300], [320,330], [350,360],
[210,240],[100, 130], [120,130], [430,460], [450,460]
]},
  {noun: "book", adjective: "thick", fileinit: "bookThick", range:[[20,30], [20,40], [20,50], [20,60], 
[30,40], [30,50], [30,60], 
[40,50], [40,60],
[50,60],
[15,20], [25,30], [35,40], [45,50], [55,60],
[10,20], [10,30], [60,80], [70,80], [75,80]
]},

  {noun: "paintbrush", adjective: "wide", fileinit: "brushWide", 
range:[[40,60], [40,90], [40,120], [40,140],
[60,90], [60,120], [60,140],
[90,120], [90,140],
[120,140],
[30,40], [50,60], [80,90], [110,120], [130,140],
[20,40], [20,30], [140,200], [180,200], [200,260]
]},
  {noun: "feather", adjective: "dark", fileinit: "featherDark", 
range:[[30,40], [30,45], [30,50], [30,60],
[40,45], [40,50], [40,60],
[45,50], [45,60],
[50,60],
[25,30], [35,40], [55,60],
[15,30], [55, 65], [60,65], [65,75], [75,85], [75,100], [85,100] 
]},
  {noun: "bottle", adjective: "full", fileinit: "bottleFull", 
range:[[280,320], [280,360], [280,390], [280,400],[320,360], [320,390], [320,400],
[360,390], [360,400],
[390,400], 
[270,280], [310,320], [350,360], [380,390], 
[220,280], [220,320], [220,360], [360,414], [390,414], [400,414]
]},
  {noun: "bottle", adjective: "empty", fileinit: "bottleFull", 
range:[[90,50], [90,30], [90,15], [90,0],
[50,30], [50,15], [50,0],
[30,15], [30,0],
[15,0],
[100,90], [60,50], [40,30], [20,15],
[30,20], [50,20], [90,20], [220,20], [220,30], [220,50]
]},
  {noun: "straw", adjective: "straight", fileinit: "strawStraight", 
range:[[172,174], [172,176], [172,178], [172,180],
[174,176], [174,178], [174,180],
[176,178], [176,180],
[178,180],
[170,172], [170,174], [170,176], [170,178],
[160,172], [160,174], [160,176], [160,178],
[150,174], [150,176]
]},
];

allStims = _.shuffle(allStims);