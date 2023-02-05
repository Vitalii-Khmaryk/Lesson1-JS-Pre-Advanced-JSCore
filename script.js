$(function () {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check;
    let time = 60;
    let timeOut;
    let minutes = 0;
    let seconds = 0;
    let count;
    let n = 1;
  
    $("#checkBtn").prop("disabled", true);
    $("#checkBtn").css("background-color", `rgb(235, 113, 113)`);
  
    $("#start").each(function () {
      let elements = $(this).children();
      elements.sort(function () {
        return Math.round(Math.random()) - 0.5;
      });
      $(this).empty().append(elements);
    });
  
    $(".sort").sortable({
      connectWith: ".pazl, .img2",
      start: function () {
        if (count !== 0 && n <= 1) {
          $("#startBtn").prop("disabled", true);
          timeOut = setInterval(mainTimers, 1000);
          $("#startBtn").css("background-color", `rgb(235, 113, 113)`);
          $("#checkBtn").prop("disabled", false);
          $("#checkBtn").css("background-color", "red");
        }
        n++;
      },
    });
  
    $(".check").on("click", function () {
      check = true;
      for (let i = 0; i < $(".img").length; i++) {
        if ($(".img").eq(i).text() != numbers[i]) {
          check = false;
          break;
        }
      }
      if (check) {
        $(".h2").html(`Woohoo,well done,you did it!`);
        $(".check").remove();
      } else {
        $(".h2").html(`It's a pity,but you lost`);
        $(".check").remove();
      }
      check = true;
      $("#checkBtn").prop("disabled", true);
      $("#checkBtn").css("background-color", `rgb(235, 113, 113)`);
    });
  
    $("#startBtn").on("click", function () {
      count = 0;
      if (count === 0) {
        timeOut = setInterval(mainTimers, 1000);
      }
      $("#startBtn").prop("disabled", true);
      $("#startBtn").css("background-color", `rgb(235, 113, 113)`);
      $("#newGameBtn").removeClass("shadow");
      $("#checkBtn").prop("disabled", false);
      $("#checkBtn").css("background-color", "red");
    });
  
    $("#newGameBtn").on("click", function () {
      clearInterval(timeOut);
      $("#startBtn").prop("disabled", false);
      $("#startBtn").css("background-color", "red");
      minutes = 0;
      seconds = 0;
      $(".timer").html(`0${minutes}:0${seconds}`);
      $("#newGameBtn").addClass("shadow");
      window.location.reload();
    });
  
    $("#checkBtn").on("click", function () {
      $(".blur").show();
      $(".mainModal").slideDown(1000);
    });
  
    $(".close").on("click", function () {
      $(".blur").hide();
      $(".mainModal").slideUp(1000);
    });
  
    $(".close2").on("click", function () {
      $(".blur").hide();
      $(".modal2").slideUp(1000);
    });
  
    function reloadf() {
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  
    function mainTimers() {
      if (time < 0) {
        clearInterval(timeOut);
        reloadf();
        $("#checkBtn").prop("disabled", true);
        $(".blur").show();
        $(".modal2").slideDown(1000);
      } else {
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $(".timer").html(`${minutes}:${seconds}`);
        $(".timerHome").html(`${minutes} : ${seconds}`);
        time--;
      }
    }
  });