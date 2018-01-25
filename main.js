
// speed for the players
speed=1;
var players=[];
// canvas dimension
var dimension=800;
// the angle speed
var angle=2;
var started=false;

// 2 keys foreach player
var keys=['LEFT_ARROW','RIGHT_ARROW','Q','S','V','B'];
var keys_code=[[37,39],[81,83],[86,66]];

// color line foreach player
var color_tab=["red","blue","green"];
var line_width=15;

// create this function to start the game onclick
function start(nb_players)
{
  // to avoid start again while playing and not before clicking
  if (started==false)
  {
    var elt=document.getElementById("looser").innerHTML="";
    background('black');
    players=[];
    var rules="";
    for (var i=0;i<nb_players;i++)
    {
      x=Math.floor(Math.random() * 0.8*dimension) + 1;
      line_tmp=new Line(x,x);
      line_tmp.add_position(x+speed,x+speed);
      players.push(line_tmp);
      rules+="Player "+i.toString()+" : keys "+keys[2*i]+" and "+keys[2*i+1]+"<br>";
    }
    var elt = document.getElementById("rules").innerHTML=rules;
    started=true;
  }
}


function setup() {
  canvas=createCanvas(dimension, dimension);
  colorMode(HSB);
  background('black');
  canvas.parent('curve_fever_canvas');
}

function draw() {
  if (started)
  {
    for (var i=0;i<players.length;i++)
    {
      if (keyIsDown(keys_code[i][0])) {
        players[i].move(-angle* Math.PI / 180);
      }
      else if (keyIsDown(keys_code[i][1])) {
        players[i].move(angle* Math.PI / 180);
      }
      else {
        players[i].move(0);
      }
    }
    var looser_id=Line.is_ended(players);
    if (looser_id!=-1)
    {
      var elt = document.getElementById("looser").innerHTML="Player "+looser_id+ " lost";
      started=false;
    }
    Line.display_lines(players);
  }
}
