// const checkbox = document.getElementById('switch');

// checkbox.addEventListener('change',()=> {
//   //change theme
//   document.body.classList.toggle('light-theme');
// })



// works but too simple possibly
lightTheme = () => {
    let element = document.body;
    element.classList.toggle("light-theme");
    
  
//   the switch function
$(".switch").on("click", () => {
    $("background-img").toggleClass("light-theme");
  });
}
var theme = "light";

document.getElementById("btn").onclick = function(){
 if (theme === "light") {
    document.getElementById("body").style.backgroundColor = "rgb(40,40,40)"
  document.getElementById("btn").style.color = "rgb(255,255,255)";
   theme = "dark";
 } else if (theme === "dark") {
    document.getElementById("body").style.backgroundColor = "rgb(255,255,255)"
  document.getElementById("btn").style.color = "rgb(0,0,0)";
   theme = "light";
 }
}
