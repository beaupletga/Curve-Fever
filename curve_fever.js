
class Line{
  constructor(a,b){
    this.array=[];
    this.array.push([a,b]);
  }

  add_position(a,b){
    this.array.push([a,b]);
  }

// the only thing needed to move is the angle
  move(angle)
  {
    var a=this.array[this.array.length-2];
    var b=this.array[this.array.length-1];
    var vectorx=(b[0]-a[0])
    var vectory=(b[1]-a[1])
    // we take the vector of the previous moove

    // we apply a rotation matrix
    var x=vectorx*Math.cos(angle)-vectory*Math.sin(angle)
    var y=vectorx*Math.sin(angle)+vectory*Math.cos(angle)

    // and add this new vector to the last coord
    var new_x=b[0]+x
    var new_y=b[1]+y

    // print("distance",((new_x-b[0])**2+(new_y-b[1])**2)**0.5)
    this.array.push([new_x,new_y]);
  }

  // we only display the last line
  display()
  {
    for(var i=this.array.length-2;i<this.array.length-1;i++)
    {
      line(this.array[i][0],this.array[i][1],this.array[i+1][0],this.array[i+1][1]);
    }
  }

  // display line foreach player
  static display_lines(player_lines){
    for (var i=0;i<player_lines.length;i++)
    {
      stroke(color_tab[i]);
      strokeWeight(line_width);
      player_lines[i].display();
    }
  }

  // check if the game is ended
  static is_ended(player_lines)
  {
    // check if someone get trough a wall
    for (var i=0;i<player_lines.length;i++)
    {
      for (var k=0;k<2;k++)
      {
        var x=player_lines[i].array[player_lines[i].array.length-1][k];
        if (x<=0 || x>=dimension)
        {
          print(true);
          return true;
        }
      }
    }

    // check if a line get trough another one or itself
    for (var i=0;i<player_lines.length;i++)
    {
      for (var j=0;j<player_lines.length;j++)
      {
        for(var k=0;k<player_lines[j].array.length;k++)
        {
          var x = player_lines[i].array[player_lines[i].array.length-1]
          var y = player_lines[j].array[k]
          if (Math.abs(x[0]-y[0])<line_width*0.8 && (Math.abs(x[1]-y[1])<line_width*0.8))
          {
            if(i==j && k<player_lines[j].array.length-line_width-1)
            {
              print('Dead');
              return i;
            }
            else if (i!=j)
            {
              print("Dead");
              return i;
            }
          }
        }
      }
    }
    return -1;
  }
}
