// This is the stimuli file for
// polarQ1objBatch5.html
// (Add more descriptions if needed)

allStims = [
  _.sample([{noun: "pencil", adjective: "long", fileinit: "pencilLong", range:[320]},
  {noun: "pencil", adjective: "short", fileinit: "pencilLong", range:[160]}]),
  {noun: "glass", adjective: "tall", fileinit: "glassTall", range:[260,300]},
  {noun: "book", adjective: "thick", fileinit: "bookThick", range:[15,20]},
  {noun: "paintbrush", adjective: "wide", fileinit: "brushWide", range:[50,50,140,160]},
  {noun: "bottle", adjective: "full", fileinit: "bottleFull", range:[360,390]},
  {noun: "bottle", adjective: "empty", fileinit: "bottleFull", range:[15,60]},
  {noun: "feather", adjective: "dark", fileinit: "featherDark", range:[41,55]},
  {noun: "straw", adjective: "bent", fileinit: "strawStraight", range:[3,5,7,8]},
];

allStims = _.shuffle(allStims);
