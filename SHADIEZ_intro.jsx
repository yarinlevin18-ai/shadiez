/**********************************************************************
 * SHADIEZ — Full-page sizzle builder for After Effects
 * ------------------------------------------------------------------
 * Builds a 1920x1080 @ 30fps comp "SHADIEZ_Intro" that plays the whole
 * landing page as a scrolling promo, using the EXACT frames you
 * exported from Figma (public/ae/ae-01 ... ae-09).
 *
 * Motion: loader sun-sweep (cross-dissolve) -> hero (slide-up + ken-burns)
 * -> colorways -> details -> collection (slide-ups) -> finale (ken-burns)
 * -> footer. Brand easing = ease-out.
 *
 * RUN:  After Effects > File > Scripts > Run Script File...  -> this file
 * PREVIEW: press 0 (RAM) or spacebar
 * EXPORT:  Composition > Add to Media Encoder Queue > H.264 (MP4)
 *
 * If a PNG is missing, the script still builds and lists what's absent
 * in an alert at the end. Just export the missing frames into:
 *   D:\Yarin\Projects\SHADIEZ\public\ae\
 *********************************************************************/

(function () {

  var AE = "D:/Yarin/Projects/SHADIEZ/public/ae/";
  var COMP_W = 1920, COMP_H = 1080, FPS = 30;

  // scene table: file, start (s), duration (s), entrance, ken-burns, fade-out
  var SCENES = [
    { f: "ae-01-loader-sunrise.png", s: 0.0,  d: 1.1, enter: "dissolve", kb: false, fade: true  },
    { f: "ae-02-loader-noon.png",    s: 0.8,  d: 1.1, enter: "dissolve", kb: false, fade: true  },
    { f: "ae-03-loader-sunset.png",  s: 1.6,  d: 1.2, enter: "dissolve", kb: false, fade: true  },
    { f: "ae-04-hero.png",           s: 2.6,  d: 3.2, enter: "slideup",  kb: true,  fade: false },
    { f: "ae-05-colorways.png",      s: 5.6,  d: 2.6, enter: "slideup",  kb: false, fade: false },
    { f: "ae-06-details.png",        s: 8.0,  d: 2.6, enter: "slideup",  kb: false, fade: false },
    { f: "ae-07-collection.png",     s: 10.4, d: 2.6, enter: "slideup",  kb: false, fade: false },
    { f: "ae-08-finale.png",         s: 12.8, d: 3.4, enter: "dissolve", kb: true,  fade: false },
    { f: "ae-09-footer.png",         s: 15.8, d: 2.0, enter: "slideup",  kb: false, fade: false }
  ];

  // ---- helpers ----
  function ease(prop, idx, inPct, outPct) {
    var ei = new KeyframeEase(0, inPct), eo = new KeyframeEase(0, outPct);
    try { prop.setTemporalEaseAtKey(idx, [ei], [eo]); } catch (e) {}
  }
  function imp(path) {
    var f = new File(path);
    if (!f.exists) return null;
    return app.project.importFile(new ImportOptions(f));
  }
  function fillScale(item) {
    return Math.max(COMP_W / item.width, COMP_H / item.height) * 100;
  }

  // ---- build ----
  app.beginUndoGroup("Build SHADIEZ sizzle");

  var total = 0;
  for (var i = 0; i < SCENES.length; i++) total = Math.max(total, SCENES[i].s + SCENES[i].d);

  var comp = app.project.items.addComp("SHADIEZ_Intro", COMP_W, COMP_H, 1, total, FPS);
  comp.openInViewer();

  // warm backdrop so any gaps read as cream, not black
  var bg = comp.layers.addSolid([0.984, 0.969, 0.941], "bg-cream", COMP_W, COMP_H, 1);
  bg.moveToEnd();

  var missing = [];
  var cx = COMP_W / 2, cy = COMP_H / 2;

  for (var s = 0; s < SCENES.length; s++) {
    var sc = SCENES[s];
    var item = imp(AE + sc.f);
    if (!item) { missing.push(sc.f); continue; }

    var L = comp.layers.add(item);
    L.name = sc.f.replace(".png", "");
    L.startTime = 0;
    L.inPoint = sc.s;
    L.outPoint = sc.s + sc.d;

    var base = fillScale(item);
    var sp = L.property("Transform").property("Scale");
    var pp = L.property("Transform").property("Position");
    var op = L.property("Transform").property("Opacity");

    // base transform
    sp.setValue([base, base]);
    pp.setValue([cx, cy]);

    // ken-burns (scale base -> base*1.08 across the scene)
    if (sc.kb) {
      sp.setValueAtTime(sc.s, [base, base]);
      sp.setValueAtTime(sc.s + sc.d, [base * 1.08, base * 1.08]);
      ease(sp, 1, 70, 30); ease(sp, 2, 30, 70);
    }

    // entrance
    var ed = 0.5;
    if (sc.enter === "slideup") {
      pp.setValueAtTime(sc.s, [cx, cy + 70]);
      pp.setValueAtTime(sc.s + ed, [cx, cy]);
      ease(pp, 1, 15, 20); ease(pp, 2, 20, 85);
    }
    op.setValueAtTime(sc.s, 0);
    op.setValueAtTime(sc.s + 0.4, 100);
    ease(op, 1, 40, 40); ease(op, 2, 30, 80);

    // fade-out (loaders + any flagged)
    if (sc.fade) {
      op.setValueAtTime(sc.s + sc.d - 0.4, 100);
      op.setValueAtTime(sc.s + sc.d, 0);
    }
  }

  app.endUndoGroup();

  var msg = "SHADIEZ_Intro built — " + total.toFixed(1) + "s @ " + FPS + "fps.\n" +
            "Press 0 to RAM-preview, then Composition > Add to Media Encoder Queue (H.264).";
  if (missing.length) {
    msg += "\n\nMISSING frames (export these from Figma into public\\ae\\, then re-run):\n - " + missing.join("\n - ");
  }
  alert(msg);

})();
