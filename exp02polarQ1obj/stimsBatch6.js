// This is the stimuli file for
// polarQ1objBatch6.html
// (Add more descriptions if needed)

allStims = [
  _.sample([{noun: "pencil", adjective: "long", fileinit: "pencilLong", range:[340]},
  {noun: "pencil", adjective: "short", fileinit: "pencilLong", range:[200]}]),
  {noun: "glass", adjective: "tall", fileinit: "glassTall", range:[340,380]},
  _.sample([{noun: "book", adjective: "thick", fileinit: "bookThick", range:[30]},
  {noun: "book", adjective: "thin", fileinit: "bookThick", range:[25]}]),
  {noun: "paintbrush", adjective: "wide", fileinit: "brushWide", range:[40,70,70,150]},
  {noun: "bottle", adjective: "full", fileinit: "bottleFull", range:[300,320]},
  {noun: "bottle", adjective: "empty", fileinit: "bottleFull", range:[100,100,120,140]},
  {noun: "feather", adjective: "dark", fileinit: "featherDark", range:[21,29,50,50]},
  {noun: "sky", adjective: "cloudy", fileinit: "skyCloudy", range:[3,4,5,6]},
];

allStims = _.shuffle(allStims);
