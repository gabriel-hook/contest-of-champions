$("#page-roster").on( "pageshow", function() {
  if(CoC.data.roster.length === 0){
    $("#onboarding-roster").addClass("show")
    $("#page-roster").one("click",function(){
      $("#onboarding-roster").removeClass("show")
    })
  }
});

$("#page-teams").on( "pageshow", function() {
  if(CoC.ui.teams.empty){
    $("#onboarding-teams").addClass("show")
    $("#page-teams").one("click",function(){
      $("#onboarding-teams").removeClass("show")
    })
  }
});