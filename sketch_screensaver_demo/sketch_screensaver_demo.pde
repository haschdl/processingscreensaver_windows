PGraphics buffer;
PShader voronoiShader ;
int[] palette = new int[]{0xFF000000, 0xFF000000};


void setup() {
  fullScreen(P2D);
  buffer = createGraphics(width, height, P2D);
  background(255);


  println(sketchPath(""));

  //C:\\CreativeCoding\\Processing\\sketch_screensaver_demo\\data\\
  voronoiShader = loadShader("voronoi.frag");
  voronoiShader.set("iResolution", float(width), float(height));
}

void draw() {
  if (frameCount % 100 == 0)
    println("fps: " + frameRate);
  voronoiShader.set("iTime", 1.0*millis()/5000);
  voronoiShader.set("n_points", 20.);
  voronoiShader.set("fillRate", .999 );
  int _c = 0xFF000000;
  //R,G,B with bit shifting
  voronoiShader.set("baseColor", float( _c >> 16 & 0xFF)/255, float(_c >> 8 & 0xFF)/255, float( _c & 0xFF)/255);

  buffer.filter(voronoiShader);
  image(buffer, 0, 0, width, height);
}
