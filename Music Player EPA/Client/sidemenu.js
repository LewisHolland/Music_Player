
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    $('ul,li').remove();
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementsByClassName("results").style.display = "none"; 
  }