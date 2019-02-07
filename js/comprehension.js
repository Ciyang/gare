function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.calibration = slide({
    name : "calibration",
    ratio : 1,
    slidewidth : 800,
    fastshrink : function(){
      if (this.ratio > .1){
        this.ratio = this.ratio - .1;
      }
      $(".imgcalibrate").attr("width", 350 * this.ratio);
      $(".imgcalibrate").attr("height", 223 * this.ratio);
    },
    shrink : function(){
      if (this.ratio > .01){
        this.ratio = this.ratio - .01;
      }
      $(".imgcalibrate").attr("width", 350 * this.ratio);
      $(".imgcalibrate").attr("height", 223 * this.ratio);
    },
    enlarge : function(){
      this.ratio = this.ratio + .01;

      //adjust slide width to try to ensure two images
      // are on the same line
      if (700 * this.ratio + 100 > this.slidewidth){
        this.slidewidth = 700 * this.ratio + 105;
        $(".slide").css("width", this.slidewidth);
      }

      $(".imgcalibrate").attr("width", 350 * this.ratio);
      $(".imgcalibrate").attr("height", 223 * this.ratio);
    },
    fastenlarge : function(){
      this.ratio = this.ratio + .1;

      //adjust slide width to try to ensure two images
      // are on the same line
      if (700 * this.ratio + 100 > this.slidewidth){
        this.slidewidth = 700 * this.ratio + 105;
        $(".slide").css("width", this.slidewidth);
      }

      $(".imgcalibrate").attr("width", 350 * this.ratio);
      $(".imgcalibrate").attr("height", 223 * this.ratio);
    },

    narrow : function(){
      if (this.slidewidth > 10){
        this.slidewidth = this.slidewidth - 10;
      }
      $(".slide").css("width", this.slidewidth);
    },
    fastnarrow : function(){
      if (this.slidewidth > 50){
        this.slidewidth = this.slidewidth - 50;
      }
      $(".slide").css("width", this.slidewidth);
    },
    widen : function(){
      this.slidewidth = this.slidewidth + 10;
      $(".slide").css("width", this.slidewidth);
    },
    fastwiden : function(){
      this.slidewidth = this.slidewidth + 50;
      $(".slide").css("width", this.slidewidth);
    },

    button : function() {
      exp.system.ratio = this.ratio;
      exp.system.slidewidth = this.slidewidth;
      $(".imgcrit").attr("width", 350 * this.ratio);
      $(".imgcrit").attr("height", 350 * this.ratio);
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.instructions = slide({
    name : "instructions",

    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.practice = slide({
    name : "practice",
    start: function() {
     exp.trialStartT = Date.now();
   },
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.shuffle([
      {noun: "cup", adjective: "blue", fileinit: "cupBlue",
       range:[[1, 9]], correct: "dhigh"},
      {noun: "cup", adjective: "blue", fileinit: "cupBlue",
       range:[[1, 1]], correct: "neither"},
      {noun: "cup", adjective: "blue", fileinit: "cupBlue",
       range:[[9, 9]], correct: "both"}
    ]),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      this.numAttempts = 0;

      //Set images to loading and unselect radio buttons
      $("#practice-imgleft").attr("src", "../stimuli/loading.jpg");
      $("#practice-imgright").attr("src", "../stimuli/loading.jpg");

      $('input[name=practice-choice]').prop('checked', false);

      // determine which pair of degrees to use
      // here low degrees mean low wrt the current adjective
      this.stim.dpair = _.sample(stim.range);
      this.stim.dlow = this.stim.dpair[0];
      this.stim.dhigh = this.stim.dpair[1];

      // randomize the positions of the degrees
      this.stim.lowhigh = _.shuffle(["left", "right"]);

      // the position of image of the lower degree
      this.stim.poslow = this.stim.lowhigh[0];

      // the position of image of the higher degree
      this.stim.poshigh = this.stim.lowhigh[1];

      // update images and radio button values

      $("#practice-img"+this.stim.poslow).attr("src", "../stimuli/" + stim.fileinit + this.stim.dlow + ".png");
      $("#practice-img"+this.stim.poshigh).attr("src", "../stimuli/" + stim.fileinit + this.stim.dhigh + ".png");

      $("#practice-choice"+this.stim.poslow).attr("value", "dlow");
      $("#practice-choice"+this.stim.poshigh).attr("value", "dhigh");


      $("#practice-request").html("Please click on the " +
                                  stim.adjective + " " + stim.noun +
                                  ".");
      $(".practice-adj").html(stim.adjective + "!");

    },

    button : function() {
      exp.practiceChoice = $('input[name=practice-choice]:checked').val();

      this.numAttempts = this.numAttempts + 1;
      if (this.numAttempts == 1) {
        this.firstResponse = exp.practiceChoice;
      }

      if (exp.practiceChoice == null) {
        $("#noselection").show();
      }
      else if (exp.practiceChoice != this.stim.correct){
        $("#incorrectpractice").show();
      }
      else {
        this.log_responses();

        exp.trialStartT = Date.now();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },


    log_responses : function() {
      exp.catch_trials.push({
        "noun" : this.stim.noun,
        "adjective" : this.stim.adjective,
        "fileinit" : this.stim.fileinit,
        "dlow" : this.stim.dlow,
        "dhigh" : this.stim.dhigh,
        "firstresponse" : this.firstResponse,
        "numattempts" : this.numAttempts,
        // "reasonother": $("#practice-other").val(),
        "RT" : Date.now() - exp.trialStartT,
        "poslow" : this.stim.poslow
      });
    }
  });


  slides.pretask = slide({
    name : "pretask",

    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  //
  // Critical trials

  slides.critical = slide({
    name : "critical",
    start: function() {
     exp.trialStartT = Date.now();
   },
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : allStims,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      //Set images to loading and unselect radio buttons
      $("#imgleft").attr("src", "../stimuli/loading.jpg");
      $("#imgright").attr("src", "../stimuli/loading.jpg");

      $('input[name=choice]').prop('checked', false);

      // determine which pair of degrees to use
      // here low degrees mean low wrt the current adjective
      this.stim.dpair = _.sample(stim.range);
      this.stim.dlow = this.stim.dpair[0];
      this.stim.dhigh = this.stim.dpair[1];

      // randomize the positions of the degrees
      this.stim.lowhigh = _.shuffle(["left", "right"]);

      // the position of image of the lower degree
      this.stim.poslow = this.stim.lowhigh[0];

      // the position of image of the higher degree
      this.stim.poshigh = this.stim.lowhigh[1];

      // update images and radio button values

      $("#img"+this.stim.poslow).attr("src", "../stimuli/" + stim.fileinit + this.stim.dlow + ".png");
      $("#img"+this.stim.poshigh).attr("src", "../stimuli/" + stim.fileinit + this.stim.dhigh + ".png");

      $("#choice"+this.stim.poslow).attr("value", "dlow");
      $("#choice"+this.stim.poshigh).attr("value", "dhigh");


      $("#request").html("Please click on the " +
                                  stim.adjective + " " + stim.noun +
                                  ".");
      $(".adj").html(stim.adjective + "!");

    },

    button : function() {
      exp.practiceChoice = $('input[name=choice]:checked').val();

      if (exp.practiceChoice == null) {
        $(".err").show();
      } else {
        this.log_responses();
        exp.trialStartT = Date.now();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },


    log_responses : function() {
      exp.data_trials.push({
        "noun" : this.stim.noun,
        "adjective" : this.stim.adjective,
        "fileinit" : this.stim.fileinit,
        "dlow" : this.stim.dlow,
        "dhigh" : this.stim.dhigh,
        "response" : exp.practiceChoice,
        // "reasonother": $("#other").val(),
        "RT" : Date.now() - exp.trialStartT,
        "poslow" : this.stim.poslow
      });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        device : $("#device").val(),
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        // age : $("#age").val(),
        // gender : $("#gender").val(),
        // education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      if (exp.subj_data.language == ""){
        $(".err").show();
      }
      else {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "calibration",
  "instructions", "practice", "pretask",
  "critical", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  // randomize the positions of the two rejections
  neitherboth = _.shuffle(["left", "right"]);

  // the position of the "neither" response
  posneither = neitherboth[0];

  // the position of the "both" response
  posboth = neitherboth[1];

  // update sentence beginnings and radio button values
  $(".reasonchoice" + posneither).attr("value", "neither");
  $(".reasonchoice" + posboth).attr("value", "both");

  $(".reasontext" + posneither).html("But neither is ");
  $(".reasontext" + posboth).html("But both are ");

  exp.system.posneither = posneither;

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
