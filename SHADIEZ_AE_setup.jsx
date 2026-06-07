/**********************************************************************
 * SHADIEZ — AE SETUP ONLY (no animation, no effects)
 * ------------------------------------------------------------------
 * Builds one comp per section, fully laid out (backgrounds, NAV BAR,
 * text, buttons, cards, loader) at the exact design coords.
 * NO keyframes, NO ken-burns, NO reveals — you animate it yourself.
 *
 * Comps created (1440x804 @30fps):
 *   01 Loader  02 Hero  03 Colorways  04 Details
 *   05 Collection  06 Finale  07 Footer
 *
 * RUN: After Effects > File > Scripts > Run Script File... > this file
 *
 * FONTS: set your exact PostScript names below (Window > Character to
 * check). If a name is wrong AE substitutes a default.
 *********************************************************************/

(function () {

  var AE  = "D:/Yarin/Projects/SHADIEZ/public/ae/";
  var LYR = AE + "layers/";
  var PUB = "D:/Yarin/Projects/SHADIEZ/public/";

  var W = 1440, H = 804, FPS = 30, DUR = 6;

  // >>> EDIT THESE if text substitutes <<<
  var FONT = {
    bold: "SchibstedGrotesk-Bold",
    semi: "SchibstedGrotesk-SemiBold",
    body: "HankenGrotesk-Regular",
    bodySemi: "HankenGrotesk-SemiBold"
  };

  var C = {
    ink:[0.137,0.125,0.110], ink60:[0.42,0.384,0.337],
    cream:[0.984,0.969,0.941], amber:[0.910,0.627,0.290], white:[1,1,1],
    sand:[0.925,0.890,0.831]
  };

  var miss = [];
  function imp(p){ var f=new File(p); if(!f.exists){ miss.push(p); return null; } return app.project.importFile(new ImportOptions(f)); }

  function fill(comp,item,name){
    if(!item) return null;
    var L=comp.layers.add(item); L.name=name;
    var sc=Math.max(W/item.width,H/item.height)*100;
    L.property("Position").setValue([W/2,H/2]); L.property("Scale").setValue([sc,sc]);
    return L;
  }
  function solid(comp,color,name){ return comp.layers.addSolid(color,name,W,H,1); }

  // static text (no keyframes). just = "LEFT"/"RIGHT"
  function txt(comp,str,font,size,color,x,y,just,leading){
    var L=comp.layers.addText(str);
    var d=L.property("Source Text").value;
    try{ d.font=font; }catch(e){}
    d.fontSize=size; d.fillColor=color;
    d.justification = (just==="RIGHT")?ParagraphJustification.RIGHT_JUSTIFY:ParagraphJustification.LEFT_JUSTIFY;
    if(leading) d.leading=leading;
    L.property("Source Text").setValue(d);
    L.property("Position").setValue([x, y + size*0.82]);
    return L;
  }

  function navBar(comp, color){
    txt(comp,"SHADIEZ",FONT.bold,22,color,96,28,"LEFT");
    txt(comp,"Shade        Colorways        Details        About",FONT.body,16,color,1344,32,"RIGHT");
  }

  function pill(comp,label,x,y){
    var s=comp.layers.addShape(); s.name="CTA "+label;
    var w=(label.length*10)+72;
    var g=s.property("Contents").addProperty("ADBE Vector Group");
    var r=g.property("Contents").addProperty("ADBE Vector Shape - Rect");
    r.property("ADBE Vector Rect Size").setValue([w,56]);
    r.property("ADBE Vector Rect Roundness").setValue(40);
    var fl=g.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    fl.property("ADBE Vector Fill Color").setValue([C.amber[0],C.amber[1],C.amber[2],1]);
    s.property("Position").setValue([x+w/2, y+28]);
    txt(comp,label,FONT.bodySemi,16,C.white,x+36,y+10,"LEFT");
  }

  app.beginUndoGroup("SHADIEZ AE setup");
  function newComp(name){ return app.project.items.addComp(name,W,H,1,DUR,FPS); }

  // 01 LOADER — 3 frames stacked (animate the sweep yourself)
  (function(){
    var c=newComp("01 Loader");
    fill(c, imp(AE+"ae-03-loader-sunset.png"), "loader-sunset");
    fill(c, imp(AE+"ae-02-loader-noon.png"),   "loader-noon");
    fill(c, imp(AE+"ae-01-loader-sunrise.png"),"loader-sunrise");
  })();

  // 02 HERO
  (function(){
    var c=newComp("02 Hero");
    fill(c, imp(LYR+"hero-plate.png"), "hero-plate");
    txt(c,"Something New\nUnder the Sun",FONT.bold,72,C.white,96,250,"LEFT",76).name="headline";
    txt(c,"A portable personal sun-shade — your own patch of shade, anywhere on the sand.",FONT.body,20,C.white,96,424,"LEFT").name="subhead";
    pill(c,"Shop Now",96,508);
    navBar(c,C.white);
  })();

  // 03 COLORWAYS
  (function(){
    var c=newComp("03 Colorways");
    fill(c, imp(LYR+"colorways-plate.png"), "colorways-plate");
    txt(c,"Pick Your Color",FONT.bold,60,C.ink,96,132,"LEFT").name="title";
    navBar(c,C.ink);
  })();

  // 04 DETAILS
  (function(){
    var c=newComp("04 Details");
    solid(c,C.cream,"bg-cream");
    // shade photo placeholder (drop details-shade here)
    var ph=solid(c,C.sand,"DROP shade photo (x830 y110, 480x640)");
    ph.property("Position").setValue([830+240,110+320]);
    ph.property("Scale").setValue([ (480/W)*100, (640/H)*100 ]);
    txt(c,"DETAILS",FONT.bodySemi,13,C.amber,96,250,"LEFT").name="eyebrow";
    txt(c,"Crafted to last.\nFolds in seconds.",FONT.semi,46,C.ink,96,284,"LEFT",50).name="title";
    txt(c,"Premium oak frame, heavyweight canvas, and a notched recline that sets in seconds — then folds flat into its tote.",FONT.body,18,C.ink60,96,440,"LEFT").name="body";
    navBar(c,C.ink);
  })();

  // 05 COLLECTION — 3 cards from source photos
  (function(){
    var c=newComp("05 Collection");
    solid(c,C.cream,"bg-cream");
    txt(c,"THE COLLECTION",FONT.bodySemi,13,C.amber,96,150,"LEFT").name="eyebrow";
    txt(c,"Shade for every coast.",FONT.semi,46,C.ink,96,184,"LEFT").name="title";
    var cards=[
      {img:PUB+"2.jpeg", name:"Coastal Navy",        price:"$189"},
      {img:PUB+"3.jpeg", name:"Harbor Burgundy",     price:"$189"},
      {img:PUB+"4.jpeg", name:"The Full Collection", price:"From $169"}
    ];
    var cw=392, gap=36, x0=96, cy=300, ch=300;
    for(var i=0;i<cards.length;i++){
      var cx=x0+i*(cw+gap);
      var it=imp(cards[i].img);
      if(it){
        var L=c.layers.add(it); L.name="card-"+cards[i].name;
        var sc=Math.max(cw/it.width,ch/it.height)*100;
        L.property("Scale").setValue([sc,sc]); L.property("Position").setValue([cx+cw/2,cy+ch/2]);
        var m=L.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var sh=new Shape(); sh.vertices=[[cx,cy],[cx+cw,cy],[cx+cw,cy+ch],[cx,cy+ch]]; sh.closed=true;
        m.property("ADBE Mask Shape").setValue(sh);
      }
      txt(c,cards[i].name,FONT.semi,22,C.ink,cx,cy+ch+16,"LEFT");
      txt(c,cards[i].price,FONT.semi,20,C.ink,cx,cy+ch+52,"LEFT");
    }
  })();

  // 06 FINALE
  (function(){
    var c=newComp("06 Finale");
    fill(c, imp(LYR+"finale-plate.png"), "finale-plate");
    txt(c,"SHADIEZ",FONT.bold,22,C.white,96,44,"LEFT").name="wordmark";
    txt(c,"Your patch of shade\nis waiting.",FONT.bold,72,C.white,96,400,"LEFT",76).name="headline";
    txt(c,"Premium beach sun-shades, made for long golden afternoons.",FONT.body,20,C.white,96,560,"LEFT").name="subhead";
    pill(c,"Shop the Collection",96,640);
  })();

  // 07 FOOTER
  (function(){
    var c=newComp("07 Footer");
    solid(c,C.ink,"footer-bg");
    txt(c,"SHADIEZ",FONT.bold,24,C.white,96,90,"LEFT").name="wordmark";
    txt(c,"Something New Under the Sun.",FONT.body,15,C.ink60,96,140,"LEFT");
    txt(c,"Shop\nShades\nColorways\nTotes\nPillows",FONT.body,15,C.white,860,90,"LEFT",26);
    txt(c,"Company\nAbout\nSustainability\nStockists",FONT.body,15,C.white,1050,90,"LEFT",26);
    txt(c,"Support\nShipping\nReturns\nContact",FONT.body,15,C.white,1240,90,"LEFT",26);
    txt(c,"© 2026 SHADIEZ. All rights reserved.   ·   Instagram   ·   TikTok",FONT.body,13,C.ink60,96,300,"LEFT");
  })();

  app.endUndoGroup();

  var msg="SHADIEZ setup built — 7 comps (no animation).\nOpen each comp and keyframe it yourself.";
  if(miss.length) msg+="\n\nMissing files (paths at top):\n - "+miss.join("\n - ");
  alert(msg);

})();
