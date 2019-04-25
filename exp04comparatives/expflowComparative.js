function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.authentication = slide({
    name : "authentication",

    //start gets run only at the beginning of the block
    start: function() {
     exp.trialStartT = Date.now();
   },
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : [{fileinit: "authenticateQuestion", range:[5]}],

    present_handle : function(stim) {
      // hide all the error messages
      $(".err").hide();
      // uncheck all the problem reports
      $(".reportFailure").prop('checked', false);
      // clear the textbox
      $("#authenticate-answer").val("");


      this.stim = stim; //I like to store this information in the slide so I can record it later.
      this.stim.number = _.sample(stim.range);

      $("#authenticate-img").attr("src", "../stimuli/" + stim.fileinit + this.stim.number + ".png");
    },

    button : function() {
      this.ansAuth = $("#authenticate-answer").val();
      this.imageFailed = $("#authenticate-imageFailure").prop('checked');
      this.log_responses();

      // clear the textbox after logging responses
      $("#authenticate-answer").val("");

      if (this.imageFailed) {

        exp.authenticateStatus = "image failed";

        // for the pilot we will just skip authentication
        // exp.trialStartT = Date.now();
        // /* use _stream.apply(this); if and only if there is
        // "present" data. (and only *after* responses are logged) */
        // _stream.apply(this);

        // Eventually we will ask the participant to return the HIT
        $(".slide").hide();
        $("body").html("There seemed to be a problem and the images could not be loaded. Please click 'Return HIT' to avoid any impact on your approval rating. We are sorry for the inconvenience!");

      }

      if (this.ansAuth == "") {
        exp.authenticateStatus = "no answer";
      } else if (this.ansAuth.toLowerCase() == "boston"){
        // make sure all the answers are mentioned in the code
        exp.authenticateStatus = "boston";
      } else if (this.ansAuth.toLowerCase() == "san francisco"){
        exp.authenticateStatus = "san francisco";
      } else if (this.ansAuth.toLowerCase() == "new york"){
        exp.authenticateStatus = "new york";
      } else if (this.ansAuth.toLowerCase() == "chicago"){
        exp.authenticateStatus = "chicago";
        exp.trialStartT = Date.now();
        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      } else if (this.ansAuth.toLowerCase() == "los angeles"){
        exp.authenticateStatus = "los angeles";
      } else {
        exp.authenticateStatus = "other";
      }

      // show error message and reset RT
      $(".err").show();
      exp.trialStartT = Date.now();

    },


    log_responses : function() {
      exp.catch_trials.push({
        "type" : "authenticate",
        "fileinit" : this.stim.fileinit,
        "number" : this.stim.number,
        "authenticateAnswer" : this.ansAuth,
        "RT" : Date.now() - exp.trialStartT,
        "imageFailed" : this.imageFailed
      });
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
      exp.subj_data.ratio = this.ratio;
      exp.subj_data.slidewidth = this.slidewidth;

      // adjust the height and width of object images
      $(".imgobjs").attr("width", 350 * this.ratio);
      $(".imgobjs").attr("height", 350 * this.ratio);

      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.instructions = slide({
    name : "instructions",

    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.ex = slide({
    name : "ex",
    start: function() {
     exp.trialStartT = Date.now();
   },
    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : exStims,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      //Set images to loading icon
      $(".imgobjs").attr("src", "../stimuli/loading.jpg");
      // uncheck the radio buttons
      $('input[name=ex-answer]').prop('checked', false);
      // uncheck all the problem reports
      $(".reportFailure").prop('checked', false);

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

      $(".img"+this.stim.poslow).attr("src", "../stimuli/" + stim.fileinit + this.stim.dlow + ".png");
      $(".img"+this.stim.poshigh).attr("src", "../stimuli/" + stim.fileinit + this.stim.dhigh + ".png");

      $(".radioimg"+this.stim.poslow).attr("value", "dlow");
      $(".radioimg"+this.stim.poshigh).attr("value", "dhigh");

      // update the instruction
      $(".instruction").html("Please click on the " + stim.comparative  + " " + stim.noun + ".");

    },

    button : function() {
      exp.exAnswer = $('input[name=ex-answer]:checked').val();
      this.imageFailed = $("#ex-imageFailure").prop('checked');

      if (exp.exAnswer == null && !this.imageFailed) {
        $(".err").show();
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
      exp.data_trials.push({
        "type" : "ex",
        "noun" : this.stim.noun,
        "adjective" : this.stim.adjective,
        "comparative" : this.stim.comparative,
        "fileinit" : this.stim.fileinit,
        "dlow" : this.stim.dlow,
        "dhigh" : this.stim.dhigh,
        "answer" : exp.exAnswer,
        // "reasonother": $("#practice-other").val(),
        "RT" : Date.now() - exp.trialStartT,
        "poslow" : this.stim.poslow,
        "imageFailed" : this.imageFailed
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

      //Set images to loading icon
      $(".imgobjs").attr("src", "../stimuli/loading.jpg");
      // uncheck the radio buttons
      $('input[name=critical-answer]').prop('checked', false);
      // uncheck all the problem reports
      $(".reportFailure").prop('checked', false);

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

      $(".img"+this.stim.poslow).attr("src", "../stimuli/" + stim.fileinit + this.stim.dlow + ".png");
      $(".img"+this.stim.poshigh).attr("src", "../stimuli/" + stim.fileinit + this.stim.dhigh + ".png");

      $(".radioimg"+this.stim.poslow).attr("value", "dlow");
      $(".radioimg"+this.stim.poshigh).attr("value", "dhigh");

      // update the instruction
      $(".instruction").html("Please click on the " + stim.comparative  + " " + stim.noun + ".");


    },

    button : function() {
      exp.criticalAnswer = $('input[name=critical-answer]:checked').val();
      this.imageFailed = $("#critical-imageFailure").prop('checked');

      if (exp.criticalAnswer == null && !this.imageFailed) {
        $(".err").show();
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
      exp.data_trials.push({
        "type" : "critical",
        "noun" : this.stim.noun,
        "adjective" : this.stim.adjective,
        "comparative" : this.stim.comparative,
        "fileinit" : this.stim.fileinit,
        "dlow" : this.stim.dlow,
        "dhigh" : this.stim.dhigh,
        "answer" : exp.criticalAnswer,
        // "reasonother": $("#practice-other").val(),
        "RT" : Date.now() - exp.trialStartT,
        "poslow" : this.stim.poslow,
        "imageFailed" : this.imageFailed
      });
    }
  });


  // subject information
  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.

      if ($("#language").val() == ""){
        $(".err").show();
      }
      else {
        // record all the relevant info
        exp.subj_data.device = $("#device").val();
        exp.subj_data.language = $("#language").val();
        exp.subj_data.enjoyment = $("#enjoyment").val();
        exp.subj_data.asses = $('input[name="assess"]:checked').val();
        // age = $("#age").val();
        // gender = $("#gender").val();
        // education = $("#education").val();
        exp.subj_data.comments = $("#comments").val();
        exp.subj_data.problems = $("#problems").val();
        exp.subj_data.fairprice = $("#fairprice").val();

        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.subj_data.minutes = (Date.now() - exp.startT)/60000;
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials, // including authentication and practice trials
          "subject_information" : exp.subj_data
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

  //Between-subject randomization here
  // exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here

  // randomize the locations of the two response words
  positions = _.shuffle(["left", "right"]);

  // the location of the yes response: left or right
  locyes = positions[0];

  // the location of the no response: left or right
  locno = positions[1];

  // update words and radio button values
  $(".radio" + locyes).attr("value", "yes");
  $(".radio" + locno).attr("value", "no");

  $(".text" + locyes).html("Yes");
  $(".text" + locno).html("No");

    exp.subj_data = {
        Browser : BrowserDetect.browser,
        OS : BrowserDetect.OS,
        screenH: screen.height,
        screenUH: exp.height,
        screenW: screen.width,
        screenUW: exp.width,
        locationYes: locyes
      };
    //blocks of the experiment:
    exp.structure=["i0", "authentication", "calibration",
                   "instructions", "ex",
                   "pretask", "critical",
                   'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything


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
