/*=====================================================================================================*/
/* Giving credit where credit is due, The JS is all built off of my original mod of Twily's homepage. */
/* If there are any similarities left, it's probably because it's based on his code.                 */
/*==================================================================================================*/

var $ = function(id) {
  return document.getElementById(id);
};

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY", "SATURDAY"];
var myBack = document.getElementById("background");




/*==============*/
/*== Options ==*/
/*============*/
var backgrounds = ["url('1.png')","url('media/2.jpg')","url('media/3.png')","url('media/4.jpg')","url('media/5.jpg')","url('media/6.png')","url('media/7.jpg')","url('media/8.jpg')",
  "url('media/9.jpg')","url('media/10.jpg')","url('media/11.jpg')","url('media/12.jpg')"];
var random = Math.floor(Math.random() * backgrounds.length);
myBack.onload = document.getElementById("background").style.backgroundImage = backgrounds[random];
var CookiePrefix = "taco_stpg_"; //prefix for cookies.
var cmdPrefix = "!"; //prefix for commands.
var ssi = 1; //set default search provider. Use array index of the array below. (Starting with 0)
// Format: [Keyword, Search URL (Search query replaces "{Q}"), "Input placeholder text"]
var searchSources = [
  ["bbt",      "http://bakabt.me/browse.php?q={Q}",                      "BakaBT"],
  ["g",        "https://www.google.com/#q={Q}",                          "google_logo"],
  ["im",       "https://www.google.com/search?tbm=isch&q={Q}",           "google_logo Images"],
  ["imdb",     "http://www.imdb.com/find?q={Q}",                         "IMDB"],
  ["nya",      "https://www.nyaa.se/?page=search&term={Q}",              "Nyaa Torrents"],
  ["ud",       "http://www.urbandictionary.com/define.php?term={Q}",     "Urban Dictionary"],
  ["wp",       "http://en.wikipedia.org/w/index.php?search={Q}",         "Wikipedia"],
  ["yt",       "https://www.youtube.com/results?search_query={Q}",       "YouTube"],
  ["iso",      "https://isohunt.to/torrents/?ihq={Q}",                   "Isonhunt"],
  ["bay",      "https://thepiratebay.org/search/{Q}/0/99/0",             "Piratebay"],
  ["tl",       "https://www.torlock.com/all/torrents/{Q}.html",          "TorLock"],
  ["r",        "https://www.google.com/search?q={Q}+reddit",             "Reddit Search...Kinda"],
  ["so",       "http://stackoverflow.com/search?q={Q}",                 "Stack Overflow"]
];

// Because I care about readability in my JS. kthx.
var svgReddit  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8 20c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20 20c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM20.097 24.274c0.515-0.406 1.262-0.317 1.668 0.198s0.317 1.262-0.198 1.668c-1.434 1.13-3.619 1.86-5.567 1.86s-4.133-0.73-5.567-1.86c-0.515-0.406-0.604-1.153-0.198-1.668s1.153-0.604 1.668-0.198c0.826 0.651 2.46 1.351 4.097 1.351s3.271-0.7 4.097-1.351zM32 16c0-2.209-1.791-4-4-4-1.504 0-2.812 0.83-3.495 2.057-2.056-1.125-4.561-1.851-7.29-2.019l2.387-5.36 4.569 1.319c0.411 1.167 1.522 2.004 2.83 2.004 1.657 0 3-1.343 3-3s-1.343-3-3-3c-1.142 0-2.136 0.639-2.642 1.579l-5.091-1.47c-0.57-0.164-1.173 0.116-1.414 0.658l-3.243 7.282c-2.661 0.187-5.102 0.907-7.114 2.007-0.683-1.227-1.993-2.056-3.496-2.056-2.209 0-4 1.791-4 4 0 1.635 0.981 3.039 2.387 3.659-0.252 0.751-0.387 1.535-0.387 2.341 0 5.523 6.268 10 14 10s14-4.477 14-10c0-0.806-0.134-1.589-0.387-2.34 1.405-0.62 2.387-2.025 2.387-3.66zM27 5.875c0.621 0 1.125 0.504 1.125 1.125s-0.504 1.125-1.125 1.125-1.125-0.504-1.125-1.125 0.504-1.125 1.125-1.125zM2 16c0-1.103 0.897-2 2-2 0.797 0 1.487 0.469 1.808 1.145-1.045 0.793-1.911 1.707-2.552 2.711-0.735-0.296-1.256-1.016-1.256-1.856zM16 29.625c-6.42 0-11.625-3.414-11.625-7.625s5.205-7.625 11.625-7.625c6.42 0 11.625 3.414 11.625 7.625s-5.205 7.625-11.625 7.625zM28.744 17.856c-0.641-1.003-1.507-1.918-2.552-2.711 0.321-0.676 1.011-1.145 1.808-1.145 1.103 0 2 0.897 2 2 0 0.84-0.52 1.56-1.256 1.856z\"/></svg>";
var svgCode    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z\" /></svg>";
var svgBook = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M17 5.95v10.351c0 0.522-0.452 0.771-1 1.16-0.44 0.313-1-0.075-1-0.587 0 0 0-9.905 0-10.114 0-0.211-0.074-0.412-0.314-0.535s-7.738-4.065-7.738-4.065c-0.121-0.045-0.649-0.378-1.353-0.016-0.669 0.344-1.033 0.718-1.126 0.894l8.18 4.482c0.217 0.114 0.351 0.29 0.351 0.516v10.802c0 0.23-0.142 0.476-0.369 0.585-0.104 0.052-0.219 0.077-0.333 0.077-0.135 0-0.271-0.033-0.386-0.104-0.215-0.131-7.774-4.766-8.273-5.067-0.24-0.144-0.521-0.439-0.527-0.658l-0.112-10.286c0-0.198-0.023-0.547 0.289-1.032 0.697-1.084 3.129-2.317 4.36-1.678l8.999 4.555c0.217 0.112 0.352 0.336 0.352 0.72z\" /></svg>";
var svgMore    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z\" /></svg>";
var svgSocial  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgPlayFolder   = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18.405 2.799c-0.112-0.44-0.656-0.799-1.21-0.799h-14.39c-0.555 0-1.099 0.359-1.21 0.799l-0.201 1.201h17.211l-0.2-1.201zM19.412 5h-18.825c-0.342 0-0.609 0.294-0.577 0.635l0.923 11.669c0.038 0.394 0.37 0.696 0.766 0.696h16.601c0.397 0 0.728-0.302 0.766-0.696l0.923-11.669c0.033-0.341-0.235-0.635-0.577-0.635zM8 14v-5l4.383 2.5-4.383 2.5z\" /></svg>";

/* Header Format: ["(Label)", "(Accent Color)", "-HEAD-"],
*   - The labels are setup for 24px SVGs. by default they are separated from the linkMenu for readability.
*   - Accent color can be: black, white, blue, green, cyan, red, magenta, and yellow. by default, the accent color is white.
*   - ALL categories need a header to start them. Headers are signified by the -HEAD- in the 3rd position.
* Link Format: ["Name", "URL",""],
*   - Name and URL are pretty self explanitory. 
*   - 3rd position may be used in the future, but right now it's not used and can be left blank.
*/
// Also yes I could totally use a json object to represent the menus, but I didn't feel like reprogramming the whole script. Probably doing that next site, though.
var linkMenu = [
  [svgPlayFolder,                   "blue",                                        "-HEAD-"], // Media
  ["Youtube",         "https://www.youtube.com",""],
  ["MyAnimeList",     "https://myanimelist.net/animelist/blacky120",""],
  ["KissAnime",       "http://www.kiss-anime.me/",""],
  ["Netflix",                   "https://www.netflix.com/browse",""],
  
  [svgSocial,                  "green",                                       "-HEAD-"], // Social
  ["Facebook",        "https://www.facebook.com/",""],
  ["Instagram",       "https://www.instagram.com/?hl=en",""],
  ["Twitter",         "https://twitter.com/",""],
  ["Steam",           "http://store.steampowered.com/",""],
  
  [svgReddit,                  "cyan",                                        "-HEAD-"], // Reddit
  ["Front Page",        "https://www.reddit.com/",""],
  ["NFL",               "https://www.reddit.com/r/nfl",""],
  ["HipHopHeads",       "https://www.reddit.com/r/hiphopheads",""],
  ["Legit?",            "https://www.reddit.com/r/fashionReps",""],
  ["Rainmeter",         "https://www.reddit.com/r/Rainmeter",""],
  ["Interior Design",   "https://www.reddit.com/r/interiordesign",""],
  
  [svgCode,                    "red",                                         "-HEAD-"], // Code Stuff
  ["GitHub",                   "https://github.com/Kthulu120",""],
  ["StackOverflow",            "http://stackoverflow.com/",""],
  ["Web Design",                 "https://www.reddit.com/r/web_design",""],
  ["PHP",           "https://www.reddit.com/r/php",""],
  ["Web Development",           "https://www.reddit.com/r/webdev",""],
  ["JavaScript",           "https://www.reddit.com/r/javascript",""],
  ["LeetCode",           "https://www.leetcode.com",""],
  
  [svgBook,                 "magenta",                                     "-HEAD-"], // Learning Tools
  ["Lynda",                    "https://www.lynda.com/",""],
  ["DuoLingo",            "https://www.duolingo.com/",""],
  ["Tutorial Zine",                  "http://tutorialzine.com/",""],
  ["Khan Academy",                "https://www.khanacademy.org/",""],
  ["TED Talks",                "http://www.ted.com/",""],
  ["MIT OpenCourseWare",                "https://ocw.mit.edu/courses/",""],
  ["Udacity",             "https://classroom.udacity.com/", ""],

  [svgMore,                    "yellow",                                      "-HEAD-"], // Other
  ["Gmail",                    "https://mail.google.com/mail/u/0/#inbox",""],
  ["Amazon",                   "https://www.amazon.com/",""],
  ["OZONE",                  "https://www.ozone.ou.edu/",""],
  ["AngelList",                  "https://angel.co/",""],
  ["Weather",                  "https://weather.com/weather/today/l/35.47,-97.52",""],
];
// DID I FORGET TO MENTION?! THE DEMO LINKS DO NOTHING!

/*==================*/
/*== Main Script ==*/
/*================*/

//core element vars
var searchInput = $('searchBar');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
  initSearchBar();
  buildDate();
  buildMenu();
  $('body').style.opacity = 1;
  $('mainContainer').style.opacity = 1;
  $('dateContainer').style.opacity = 1;
  $('notesWidget').style.opacity = 1;

}

function initSearchBar() {
  if (searchSources[ssi] !== undefined)
    searchInput.placeholder = searchSources[ssi][2];
  else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }
  
  document.addEventListener('keydown', function(event) { handleKeydown(event); });
  
  searchInput.value = "";
}

function buildDate() {
  var today = new Date();
  dateDiv.innerHTML = "<font class=\"font-3em\">" +
                      monthNames[today.getMonth()] + 
                      " " + 
                      today.getDate() + 
                      "</font><br><font>" + 
                      dayNames[today.getDay()] + 
                      ", " + 
                      today.getFullYear() +
                      "</font>";
}

function buildMenu() {
  var newMenu = "";

  if(linkMenu[0][2] === "-HEAD-")
    newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[0][1] !== "" ? linkMenu[0][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
  else {
    alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
    return;
  }

  for (var i = 1; i < linkMenu.length; i++)
    if (linkMenu[i][2] === "-HEAD-")
      newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[i][1] !== "" ? linkMenu[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    else
      newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
  newMenu += "</ul></div></div></li>";

  rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if(query !== "") {
    var qlist;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
      }
    } 
  }
  if (key === 27) {
    searchInput.blur();
  }
}

function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) notesTextarea.blur();
}

var noteText = null;
function handleNotes(event, focus){
  if (focus) {
    if(!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if(noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}

var ignoredKeys = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
function handleKeydown(event) {
  if (notesInput === document.activeElement || 
     searchInput === document.activeElement || 
     ignoredKeys.includes(event.keyCode))
    return;

  searchInput.focus();
}

function addClass(elementID, className) {
  $(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
      console.log(e);
    }
    return null;
}
function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}
function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}
function DelCookie(name) {
    document.cookie = CookiePrefix + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}