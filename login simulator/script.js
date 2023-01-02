//refresh
const loadingScreen=document.getElementById("loader-wrapper");
const loadh1=document.getElementById("loadingh1");
$(window).on("load",()=>{
    $(".loader-wrapper").fadeOut(1200);
});
  function loadingScreenFunc()
  {
    loadingScreen.style.display="flex";
    $(".loader-wrapper").fadeOut(1200);
  }
//API
const loginTile=document.getElementById("loginTile");
const passwordTile=document.getElementById("passwordTile");
let logged=false;
async function dataforlist()
{
        let html="";
        const response= await fetch("src/data.json");
        const data=await response.json();
        data.forEach(data=>{
            html+="<div><h3>"+data.name+"</h2>Login: "+data.login+"<br>Password: "+data.password+"</div>";
        });
        document.getElementById("data-list").innerHTML=html;
}
dataforlist();
async function getData()
{
        const response= await fetch("src/data.json");
        const data=await response.json();
        data.forEach(data=>{
            if(loginTile.value==data.login&&passwordTile.value==data.password)
            {
                logged=true;
                loginTile.value="";
                passwordTile.value="";
                fill(data.name, data.balance, data.imgUrl);
            }
        });
        if(logged==false)
        {
            if(reminderdelay==false)
            {
            reminderdelay=true;
            setTimeout(remindfun,2000);
            document.getElementById("reminder").style.display="block";
            setTimeout(fix,2000);
            }
            function remindfun()
            {
                reminderdelay=false;
            }
            function fix()
            {
                document.getElementById("reminder").style.display="none"
            }
        }
        function fill(name, balance, imgUrl)
        {
            loadh1.innerHTML="Logging In";
            loadingScreenFunc();
            document.getElementById("logName").innerHTML=name;
            document.getElementById("logName2").innerHTML=name;
            document.getElementById("logBalance").innerHTML=balance;
            
            document.getElementById("reminder").style.display="none";
            document.getElementById("loggedIn").style.display="flex";
            document.getElementById("form-wrap").style.display="none";
            document.getElementById("profile").style.display="flex";
            document.getElementById("profileImg").src=imgUrl;
            toLogInOut.innerHTML="Logout";
        }
}
//buttons
const toLogInOut=document.getElementById("toLogInOut");
const hamburger=document.getElementById("hamburger");
const navbar=document.getElementById("navbar");
const toLogPage=document.getElementById("toLogPage");
const goback=document.getElementById("goback");
const main=document.getElementById("main");

let hambclicked=false;
let navdelay=false;
let reminderdelay=false;
hamburger.addEventListener("click",e=>{
    if(navdelay==false)
    {
        navdelay=true;
        setTimeout(navdelayfun,500)
        if(hambclicked==false)
        {
        hambclicked=true;
        if(window.innerWidth<=1024){
            navbar.style.height="100vh";
          }
          else{
            navbar.style.width="300px";
          }
        document.getElementById("navitems").style.display="flex";
        hamburger.style.transform="rotate(90deg)";
        document.getElementById("main").style.opacity="0.6";
        }
        else
        {
            navbarfolding();
        }
    }
function navdelayfun()
{
    navdelay=false;
}
});
main.addEventListener("click",e=>{
    if(hambclicked==true)
    {
        navbarfolding()
    }
});
toLogInOut.addEventListener("click",e=>{
    if(logged==false)
    {
        loadh1.innerHTML="Loading";
        document.getElementById("beforeLog").style.display="none";
        document.getElementById("form-wrap").style.display="flex";
        navbarfolding();
    }else{
        loadh1.innerHTML="Logging Out";
        logged=false;
        document.getElementById("logName2").innerHTML="";
        document.getElementById("loggedIn").style.display="none";
        document.getElementById("profile").style.display="none";
        document.getElementById("beforeLog").style.display="block";
        toLogInOut.innerHTML="Login";
        navbarfolding();
    }
    loadingScreenFunc();
});
goback.addEventListener("click",e=>{
    loadh1.innerHTML="Loading";
    loadingScreenFunc();
    document.getElementById("beforeLog").style.display="block";
    document.getElementById("form-wrap").style.display="none";
    document.getElementById("reminder").style.display="none"
    loginTile.value="";
    passwordTile.value="";
});
function navbarfolding()
{
    hambclicked=false;
    if(window.innerWidth<=1024){
        navbar.style.height="55px";
        navbar.style.width="100vw";
      }
      else{
        navbar.style.width="55px";
        navbar.style.height="100vh";
      }
    
    document.getElementById("navitems").style.display="none";
    hamburger.style.transform="rotate(0deg)";
    document.getElementById("main").style.opacity="1";
}
document.addEventListener('keydown', (event) => {
    var keyPressed = event.code;
    switch(keyPressed)
    {
        case "Enter":
        if(document.getElementById("form-wrap").style.display=="flex")
            getData();
        break;
    }
  }, false);
//responsivity
window.onresize = () => {
    navbar.style.transition="none";
    navbarfolding();
    navbar.style.transition="200ms";
}

