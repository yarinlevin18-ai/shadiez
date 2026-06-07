/**********************************************************************
 * SHADIEZ — Full editable AE build
 * ------------------------------------------------------------------
 * Builds "SHADIEZ_Intro" (1440x810 @30fps) end to end:
 *   loader sweep -> hero -> colorways -> details -> collection
 *   -> finale -> footer
 * Text is recreated as EDITABLE AE text layers (brand fonts/colors),
 * buttons + collection cards are rebuilt as shapes, all keyframed with
 * the locked motion (Y+24->0 + fade, ~12f, ease-out; ken-burns on photos).
 *
 * RUN:    After Effects > File > Scripts > Run Script File... > this file
 * PREVIEW: press 0 (RAM) / spacebar
 * EXPORT:  Composition > Add to Media Encoder Queue > H.264 (MP4)
 *
 * FONTS — set the PostScript names your machine uses (Window > Character
 * shows installed fonts). If a name is wrong AE substitutes a default.
 *********************************************************************/

(function () {

  // ----- paths -----
  var AE  = "D:/Yarin/Projects/SHADIEZ/public/ae/";
  var LYR = AE + "layers/";
  var PUB = "D:/Yarin/Projects/SHADIEZ/public/";

  // ----- look -----
  var W = 1440, H = 810, FPS = 30;
  var FONT = {
    bold:  "SchibstedGrotesk-Bold",
    semi:  "SchibstedGrotesk-SemiBold",
    body:  "HankenGrotesk-Regular",
    bodySemi: "HankenGrotesk-SemiBold"
  };
  var C = {
    ink:[0.137,0.125,0.110], ink60:[0.42,0.384,0.337],
    cream:[0.984,0.969,0.941], amber:[0.910,0.627,0.290], white:[1,1,1]
  };

  // ===================================================== helpers
  function imp(p){ var f=new File(p); return f.exists ? app.project.importFile(new ImportOptions(f)) : null; }
  function easeK(prop,i,inP,outP){ try{ prop.setTemporalEaseAtKey(i,[new KeyframeEase(0,inP)],[new KeyframeEase(0,outP)]); }catch(e){} }

  function photo(comp, item, name, t0, t1){              // full-bleed photo layer
    var L = comp.layers.add(item); L.name = name;
    var sc = Math.max(W/item.width, H/item.height)*100;
    L.property("Position").setValue([W/2,H/2]);
    L.property("Scale").setValue([sc,sc]);
    L.inPoint=t0; L.outPoint=t1;
    return L;
  }
  function kenBurns(L,t0,t1){
    var sp=L.property("Scale"); var b=sp.value[0];
    sp.setValueAtTime(t0,[b,b]); sp.setValueAtTime(t1,[b*1.08,b*1.08]);
    easeK(sp,1,70,30); easeK(sp,2,30,70);
  }
  function fade(L,t,dur,from,to){ var o=L.property("Opacity"); o.setValueAtTime(t,from); o.setValueAtTime(t+dur,to); easeK(o,1,40,40); easeK(o,2,30,80); }

  function text(comp, str, font, size, color, x, y, t0, t1, leading){
    var L = comp.layers.addText(str);
    var d = L.property("Source Text").value;
    try{ d.font = font; }catch(e){}
    d.fontSize = size; d.fillColor = color; d.justification = ParagraphJustification.LEFT_JUSTIFY;
    if(leading) d.leading = leading;
    L.property("Source Text").setValue(d);
    L.property("Position").setValue([x, y + size*0.82]);  // brief y = top; AE = baseline
    L.inPoint=t0; L.outPoint=t1;
    return L;
  }
  // brand reveal: rise (y+24) + fade, start at t
  function reveal(L, t){
    var dur=0.4, p=L.property("Position"), base=p.value;
    p.setValueAtTime(t,[base[0],base[1]+24]); p.setValueAtTime(t+dur,[base[0],base[1]]);
    easeK(p,1,15,20); easeK(p,2,20,85);
    fade(L,t,dur,0,100);
  }
  function pill(comp, label, x, y, t0, t1){             // amber CTA button
    var s = comp.layers.addShape(); s.name="CTA "+label;
    var g = s.property("Contents").addProperty("ADBE Vector Group");
    var r = g.property("Contents").addProperty("ADBE Vector Shape - Rect");
    r.property("ADBE Vector Rect Size").setValue([ (label.length*11)+72, 56]);
    r.property("ADBE Vector Rect Roundness").setValue(40);
    var f = g.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    f.property("ADBE Vector Fill Color").setValue([C.amber[0],C.amber[1],C.amber[2],1]);
    var w = (label.length*11)+72;
    s.property("Position").setValue([x + w/2, y + 28]);
    s.inPoint=t0; s.outPoint=t1;
    var t = text(comp, label, FONT.bodySemi, 16, C.white, x+36, y+10, t0, t1);
    return [s,t];
  }
  function missingNote(item, name, list){ if(!item) list.push(name); return item; }

  // ===================================================== build
  app.beginUndoGroup("SHADIEZ full build");
  var miss = [];

  // timeline (seconds)
  var T = {
    l1:0.0, l2:0.8, l3:1.6,
    hero:2.6, colorways:5.8, details:8.4, collection:11.0, finale:13.8, footer:17.0
  };
  var total = 19.0;

  var comp = app.project.items.addComp("SHADIEZ_Intro", W, H, 1, total, FPS);
  comp.openInViewer();
  var cream = comp.layers.addSolid(C.cream,"bg-cream",W,H,1); cream.moveToEnd();

  // ---------- FOOTER (bottom of stack first) ----------
  (function(){
    var ink = comp.layers.addSolid(C.ink,"footer-bg",W,H,1); ink.inPoint=T.footer; ink.outPoint=total;
    var wm = text(comp,"SHADIEZ",FONT.bold,40,C.white,96,330,T.footer,total);
    var tg = text(comp,"Something New Under the Sun.",FONT.body,18,C.ink60,96,400,T.footer,total);
    tg.property("Source Text"); // keep
    reveal(wm,T.footer+0.1); reveal(tg,T.footer+0.25);
    var ink2 = ink.property("Opacity"); ink2.setValueAtTime(T.footer,0); ink2.setValueAtTime(T.footer+0.4,100);
  })();

  // ---------- FINALE ----------
  (function(){
    var bg = photo(comp, missingNote(imp(LYR+"finale-plate.png"),"finale-plate.png",miss), "finale-plate", T.finale, total);
    if(bg){ kenBurns(bg,T.finale,total); fade(bg,T.finale,0.5,0,100); }
    var wm = text(comp,"SHADIEZ",FONT.bold,22,C.white,96,44,T.finale,total);
    var h  = text(comp,"Your patch of shade\nis waiting.",FONT.bold,72,C.white,96,400,T.finale,total,76);
    var s  = text(comp,"Premium beach sun-shades, made for long golden afternoons.",FONT.body,22,C.white,96,560,T.finale,total);
    fade(wm,T.finale+0.2,0.5,0,100);
    reveal(h,T.finale+0.4); reveal(s,T.finale+0.6);
    var b = pill(comp,"Shop the Collection",96,640,T.finale,total); reveal(b[0],T.finale+0.8); reveal(b[1],T.finale+0.8);
  })();

  // ---------- COLLECTION (cream + title + 3 cards from source photos) ----------
  (function(){
    var t0=T.collection, t1=T.finale+0.3;
    var bgc = comp.layers.addSolid(C.cream,"collection-bg",W,H,1); bgc.inPoint=t0; bgc.outPoint=t1; fade(bgc,t0,0.4,0,100);
    var eb = text(comp,"THE COLLECTION",FONT.bodySemi,13,C.amber,96,150,t0,t1);
    var ti = text(comp,"Shade for every coast.",FONT.semi,40,C.ink,96,184,t0,t1);
    reveal(eb,t0+0.15); reveal(ti,t0+0.3);
    var cards=[
      {img:PUB+"2.jpeg", name:"Coastal Navy",     price:"$189"},
      {img:PUB+"3.jpeg", name:"Harbor Burgundy",  price:"$189"},
      {img:PUB+"4.jpeg", name:"The Full Collection", price:"From $169"}
    ];
    var cw=392, gap=36, x0=96, cy=300, ch=300;
    for(var i=0;i<cards.length;i++){
      var cx=x0+i*(cw+gap);
      var it=missingNote(imp(cards[i].img), cards[i].img, miss);
      if(it){
        var L=comp.layers.add(it); L.name="card-"+cards[i].name; L.inPoint=t0; L.outPoint=t1;
        var sc=Math.max(cw/it.width, ch/it.height)*100;
        L.property("Scale").setValue([sc,sc]);
        L.property("Position").setValue([cx+cw/2, cy+ch/2]);
        // simple rounded mask
        var m=L.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        var sh=new Shape(); sh.vertices=[[cx,cy],[cx+cw,cy],[cx+cw,cy+ch],[cx,cy+ch]]; sh.closed=true;
        m.property("ADBE Mask Shape").setValue(sh);
        reveal(L, t0 + 0.45 + i*0.1);
      }
      var nm=text(comp,cards[i].name,FONT.semi,22,C.ink,cx,cy+ch+16,t0,t1);
      var pr=text(comp,cards[i].price,FONT.semi,20,C.ink,cx,cy+ch+52,t0,t1);
      reveal(nm,t0+0.5+i*0.1); reveal(pr,t0+0.55+i*0.1);
    }
  })();

  // ---------- DETAILS (use exported full frame, slide-up) ----------
  (function(){
    var t0=T.details, t1=T.collection+0.3;
    var it=missingNote(imp(AE+"ae-06-details.png"),"ae-06-details.png",miss);
    if(it){ var L=photo(comp,it,"details",t0,t1);
      var p=L.property("Position"); p.setValueAtTime(t0,[W/2,H/2+70]); p.setValueAtTime(t0+0.5,[W/2,H/2]); easeK(p,1,15,20); easeK(p,2,20,85);
      fade(L,t0,0.4,0,100);
    }
  })();

  // ---------- COLORWAYS ----------
  (function(){
    var t0=T.colorways, t1=T.details+0.3;
    var bg=photo(comp, missingNote(imp(LYR+"colorways-plate.png"),"colorways-plate.png",miss),"colorways-plate",t0,t1);
    if(bg){ var p=bg.property("Position"); p.setValueAtTime(t0,[W/2,H/2+70]); p.setValueAtTime(t0+0.5,[W/2,H/2]); easeK(p,1,15,20); easeK(p,2,20,85); fade(bg,t0,0.4,0,100); }
    var ti=text(comp,"Pick Your Color",FONT.bold,60,C.ink,96,132,t0,t1);
    reveal(ti,t0+0.3);
  })();

  // ---------- HERO ----------
  (function(){
    var t0=T.hero, t1=T.colorways+0.3;
    var bg=photo(comp, missingNote(imp(LYR+"hero-plate.png"),"hero-plate.png",miss),"hero-plate",t0,t1);
    if(bg){ kenBurns(bg,t0,t1); fade(bg,t0,0.4,0,100); }
    var wm=text(comp,"SHADIEZ",FONT.bold,22,C.white,96,28,t0,t1); fade(wm,t0+0.1,0.5,0,100);
    var h =text(comp,"Something New\nUnder the Sun",FONT.bold,72,C.white,96,250,t0,t1,76);
    var s =text(comp,"A portable personal sun-shade — your own patch of shade, anywhere on the sand.",FONT.body,20,C.white,96,424,t0,t1);
    reveal(h,t0+0.4); reveal(s,t0+0.65);
    var b=pill(comp,"Shop Now",96,508,t0,t1); reveal(b[0],t0+0.9); reveal(b[1],t0+0.9);
  })();

  // ---------- LOADER SWEEP ----------
  (function(){
    var fr=[ {f:"ae-03-loader-sunset.png", s:T.l3, d:1.0+ (T.hero-T.l3-1.0)},
             {f:"ae-02-loader-noon.png",   s:T.l2, d:1.1},
             {f:"ae-01-loader-sunrise.png",s:T.l1, d:1.1} ];
    for(var i=0;i<fr.length;i++){
      var it=missingNote(imp(AE+fr[i].f),fr[i].f,miss); if(!it) continue;
      var L=photo(comp,it,fr[i].f.replace(".png",""),fr[i].s,fr[i].s+fr[i].d);
      fade(L,fr[i].s,0.4,0,100);
      if(fr[i].f.indexOf("sunset")<0) fade(L,fr[i].s+fr[i].d-0.4,0.4,100,0);
    }
  })();

  app.endUndoGroup();

  var msg="SHADIEZ_Intro built — "+total.toFixed(1)+"s @ "+FPS+"fps.\nPress 0 to preview, then Add to Media Encoder (H.264).\n\nIf text looks wrong, set the correct PostScript font names at the top (FONT = ...).";
  if(miss.length) msg+="\n\nMissing image files (paths at top):\n - "+miss.join("\n - ");
  alert(msg);

})();
