/* ============================================================
   Clockchain merged — wireframe time-zone globe
   Adapted from the reference site. Theme-aware: reads CSS
   custom props so it recolors with the active variant.
   ============================================================ */
(function(){
  var wrap=document.querySelector('.hero-visual');
  var canvas=document.getElementById('globe-canvas');
  if(!wrap||!canvas)return;

  function cssVar(name,fallback){
    var v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v||fallback;
  }
  function isDark(){return document.documentElement.getAttribute('data-variant')==='eclipse';}

  var CAPITALS=[
    {n:'Auckland',lon:174.8,lat:-36.9,tz:12,tzM:165},
    {n:'Sydney',lon:151.2,lat:-33.9,tz:10,tzM:150},
    {n:'Tokyo',lon:139.7,lat:35.7,tz:9,tzM:135},
    {n:'Beijing',lon:116.4,lat:39.9,tz:8,tzM:120},
    {n:'Bangkok',lon:100.5,lat:13.8,tz:7,tzM:105},
    {n:'Dhaka',lon:90.4,lat:23.7,tz:6,tzM:90},
    {n:'Karachi',lon:67.0,lat:24.9,tz:5,tzM:75},
    {n:'Dubai',lon:55.3,lat:25.2,tz:4,tzM:60},
    {n:'Moscow',lon:37.6,lat:55.8,tz:3,tzM:45},
    {n:'Cairo',lon:31.2,lat:30.0,tz:2,tzM:30},
    {n:'Paris',lon:2.3,lat:48.9,tz:1,tzM:15},
    {n:'London',lon:-0.1,lat:51.5,tz:0,tzM:0},
    {n:'Praia',lon:-23.5,lat:14.9,tz:-1,tzM:-15},
    {n:'Noronha',lon:-32.4,lat:-3.8,tz:-2,tzM:-30},
    {n:'Sao Paulo',lon:-46.6,lat:-23.5,tz:-3,tzM:-45},
    {n:'Caracas',lon:-66.9,lat:10.5,tz:-4,tzM:-60},
    {n:'New York',lon:-74.0,lat:40.7,tz:-5,tzM:-75},
    {n:'Chicago',lon:-87.6,lat:41.9,tz:-6,tzM:-90},
    {n:'Denver',lon:-104.9,lat:39.7,tz:-7,tzM:-105},
    {n:'Los Angeles',lon:-118.2,lat:34.1,tz:-8,tzM:-120},
    {n:'Anchorage',lon:-149.9,lat:61.2,tz:-9,tzM:-135},
    {n:'Honolulu',lon:-157.8,lat:21.3,tz:-10,tzM:-150},
    {n:'Apia',lon:-171.8,lat:-13.8,tz:-11,tzM:-165},
    {n:'Nukualofa',lon:-175.2,lat:-21.1,tz:-12,tzM:-180}
  ];

  function init(){
    if(typeof THREE==='undefined'){setTimeout(init,80);return;}

    var W=wrap.clientWidth,H=wrap.clientHeight;
    var MOBILE=!!(window.matchMedia&&window.matchMedia('(max-width:760px)').matches);
    var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:!MOBILE,alpha:true});
    renderer.setPixelRatio(MOBILE?1:Math.min(window.devicePixelRatio,2));
    renderer.setSize(W,H);renderer.setClearColor(0,0);

    var scene=new THREE.Scene();
    var camera=new THREE.PerspectiveCamera(40,W/H,0.1,100);
    camera.position.z=3.79;  /* globe sized ~15% smaller than the prior 3.22 */

    var R=1.0;
    var globe=new THREE.Group();scene.add(globe);

    /* line-weight controls (1.0 = a single device pixel). Bump these to thicken. */
    var BLUE_W=1.5;   /* country borders */
    var BLACK_W=1.5;  /* equator + timezone boundary meridians */
    var fatMats=[];   /* LineMaterials needing resolution kept in sync on resize */

    var cGreen=new THREE.Color(cssVar('--globe-line','#3fc489'));
    var cGlow=new THREE.Color('#9bf2c4');
    var cGrid=new THREE.Color(cssVar('--globe-grid','#3fc489'));
    var cBase=new THREE.Color(cssVar('--globe-base','#1d1d1f'));
    var cLand=new THREE.Color(cssVar('--globe-land','#9fb8cf'));

    window.__recolorGlobe=function(){
      cGreen.set(cssVar('--globe-line','#3fc489'));
      cGrid.set(cssVar('--globe-grid','#3fc489'));
      cBase.set(cssVar('--globe-base','#1d1d1f'));
      cLand.set(cssVar('--globe-land','#9fb8cf'));
      countryMats.forEach(function(m){m.color.copy(cLand);});
    };

    function ll2v(lon,lat,r){
      r=r||R;var lo=lon*Math.PI/180,la=lat*Math.PI/180;
      return new THREE.Vector3(r*Math.cos(la)*Math.cos(lo),r*Math.sin(la),r*Math.cos(la)*Math.sin(lo));
    }

    /* thick line via Line2/LineMaterial (LineBasicMaterial.linewidth is ignored by WebGL) */
    function makeFatLine(points,color,opacity,linewidth){
      var arr=[];
      for(var i=0;i<points.length;i++){arr.push(points[i].x,points[i].y,points[i].z);}
      var geo=new THREE.LineGeometry();geo.setPositions(arr);
      var mat=new THREE.LineMaterial({color:color.getHex(),transparent:true,opacity:opacity,linewidth:linewidth});
      mat.resolution.set(W,H);
      fatMats.push(mat);
      return {line:new THREE.Line2(geo,mat),mat:mat};
    }

    /* latitude rings */
    for(var latD=-89;latD<=89;latD+=1){
      if(Math.abs(latD)===90)continue;
      if(latD===23||latD===-23||latD===66||latD===-66)continue;
      var phi=latD*Math.PI/180,cosP=Math.cos(phi),sinP=Math.sin(phi),rr=R*cosP;
      var pts=[];for(var i=0;i<=180;i++){var t=(i/180)*Math.PI*2;pts.push(new THREE.Vector3(rr*Math.cos(t),R*sinP,rr*Math.sin(t)));}
      var isEq=(latD===0),isMaj=(latD%10===0);
      if(MOBILE&&!isEq&&!isMaj)continue;
      if(isEq){
        globe.add(makeFatLine(pts,cBase,0.7,BLACK_W).line);
      }else{
        globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:cGrid,transparent:true,opacity:isMaj?0.18:0.07})));
      }
    }

    /* meridians + tz boundaries */
    var meridians=[];
    for(var lonD=-180;lonD<180;lonD+=1){
      var lonR=lonD*Math.PI/180,pts2=[];
      for(var i2=0;i2<=180;i2++){var a=(i2/180)*Math.PI*2;pts2.push(new THREE.Vector3(R*Math.sin(a)*Math.cos(lonR),R*Math.cos(a),R*Math.sin(a)*Math.sin(lonR)));}
      var isTZ=(((lonD+180)%15)===0),isMaj2=(lonD%10===0);
      if(MOBILE&&!isTZ&&!isMaj2)continue;
      if(isTZ){
        var fl=makeFatLine(pts2,cBase,0.7,BLACK_W);
        globe.add(fl.line);
        meridians.push({mat:fl.mat,lonDeg:lonD,isTZ:true});
      }else{
        var gm=new THREE.LineBasicMaterial({color:cGrid.clone(),transparent:true,opacity:isMaj2?0.16:0.06});
        globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2),gm));
        meridians.push({mat:gm,lonDeg:lonD,isTZ:false,major:isMaj2});
      }
    }

    /* country borders */
    var countryMats=[];
    function addPolyLine(coords){
      if(!coords||coords.length<2)return;
      var lats=coords.map(function(c){return c[1];});
      if(Math.max.apply(null,lats)-Math.min.apply(null,lats)<(MOBILE?5.0:2.0))return;
      var pts=[];
      for(var i=0;i<coords.length;i++){
        if(i>0){
          var p0=coords[i-1],p1=coords[i];
          var steps=Math.max(1,Math.round(Math.sqrt(Math.pow(p1[0]-p0[0],2)+Math.pow(p1[1]-p0[1],2))/(MOBILE?3.5:1.5)));
          for(var s=(i===1?0:1);s<=steps;s++){var t=s/steps;pts.push(ll2v(p0[0]+(p1[0]-p0[0])*t,p0[1]+(p1[1]-p0[1])*t));}
        }
      }
      if(pts.length<2)return;
      var fl=makeFatLine(pts,cLand,0.92,BLUE_W);
      globe.add(fl.line);
      countryMats.push(fl.mat);
    }
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(function(r){return r.json();})
      .then(function(topo){
        var sc=topo.transform.scale,tr=topo.transform.translate,arcs=topo.arcs;
        function decodeArc(idx){var rev=idx<0,raw=arcs[rev?~idx:idx],out=[],x=0,y=0;for(var i=0;i<raw.length;i++){x+=raw[i][0];y+=raw[i][1];out.push([x*sc[0]+tr[0],y*sc[1]+tr[1]]);}if(rev)out.reverse();return out;}
        function stitchRing(idxs){var pts=[];idxs.forEach(function(idx,i){var a=decodeArc(idx);pts=pts.concat(i===0?a:a.slice(1));});return pts;}
        topo.objects.countries.geometries.forEach(function(geom){
          if(geom.type==='Polygon')geom.arcs.forEach(function(r){addPolyLine(stitchRing(r));});
          else if(geom.type==='MultiPolygon')geom.arcs.forEach(function(p){p.forEach(function(r){addPolyLine(stitchRing(r));});});
        });
      }).catch(function(e){console.warn('topo fail',e);});

    /* label overlay */
    var labelCanvas=document.createElement('canvas');
    labelCanvas.style.cssText='position:absolute;top:0;left:0;pointer-events:none;';
    wrap.style.position='relative';wrap.appendChild(labelCanvas);
    var lctx=labelCanvas.getContext('2d');
    var dpr=window.devicePixelRatio||1;
    function resizeAll(){
      W=wrap.clientWidth;H=wrap.clientHeight;
      renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();
      for(var fi=0;fi<fatMats.length;fi++){fatMats[fi].resolution.set(W,H);}
      labelCanvas.width=Math.floor(W*dpr);labelCanvas.height=Math.floor(H*dpr);
      labelCanvas.style.width=W+'px';labelCanvas.style.height=H+'px';
      lctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resizeAll();window.addEventListener('resize',resizeAll);

    function project(v3){var v=v3.clone().project(camera);return {x:(v.x*0.5+0.5)*W,y:(-v.y*0.5+0.5)*H,z:v.z};}

    var autoSpeed=0.0000148,lastT=null,lastDraw=0;
    function getUTCDecimalHour(){var n=new Date();return n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600+n.getUTCMilliseconds()/3600000;}
    function formatTime(utcH,tz){var h=((utcH+tz)%24+24)%24;var hh=Math.floor(h),mm=Math.floor((h-hh)*60);var ap=hh>=12?'PM':'AM',h12=hh%12||12;return (h12<10?'0':'')+h12+':'+(mm<10?'0':'')+mm+' '+ap;}

    function animate(ts){
      requestAnimationFrame(animate);
      if(MOBILE&&lastDraw&&ts-lastDraw<33){return;}
      lastDraw=ts;
      if(lastT===null)lastT=ts;var dt=ts-lastT;lastT=ts;
      globe.rotation.y+=autoSpeed*dt;var gy=globe.rotation.y;

      for(var i=0;i<meridians.length;i++){
        var m=meridians[i];var lonRad=m.lonDeg*Math.PI/180;
        var worldZ=Math.sin(lonRad+gy),facing=Math.max(0,worldZ),hi=facing*facing,backDim=Math.max(0.18,1.0-facing*1.4);
        if(m.isTZ){
          if(facing>0.05){m.mat.color.copy(cGreen).lerp(cGlow,hi);m.mat.opacity=0.16+facing*0.8;}
          else{m.mat.color.copy(cBase);m.mat.opacity=0.7*backDim;}
        }else{
          var base=m.major?0.16:0.06;
          if(facing>0.05){m.mat.color.copy(cGreen).lerp(cGlow,hi);m.mat.opacity=base+facing*(0.85-base);}
          else{m.mat.color.copy(cGrid);m.mat.opacity=base*backDim;}
        }
      }

      renderer.render(scene,camera);

      lctx.setTransform(dpr,0,0,dpr,0,0);lctx.clearRect(0,0,W,H);
      var utcH=getUTCDecimalHour();
      var dark=isDark();
      var pillBg=dark?'rgba(20,26,23,0.92)':'rgba(255,255,255,0.94)';
      var nameCol=dark?'#f3f5f4':'#1d1d1f';
      var tzCol=dark?'rgba(255,255,255,0.5)':'#86868b';
      var accentCol=cssVar('--accent','#2d7a4f');

      /* ---- PASS 1: gather every label that is currently facing the viewer ---- */
      var visLabels=[];
      CAPITALS.forEach(function(cap){
        var tzRad=cap.tzM*Math.PI/180,tzWorldZ=Math.sin(tzRad+gy);
        if(tzWorldZ<0.70)return;
        var worldPt=ll2v(cap.lon,cap.lat,R).applyEuler(globe.rotation);
        var sp=project(worldPt);if(sp.z>1.0)return;
        var op=project(ll2v(cap.lon,cap.lat,R*1.18).applyEuler(globe.rotation));
        var alpha=Math.min(1,Math.max(0,(tzWorldZ-0.70)/0.15));
        var timeStr=formatTime(utcH,cap.tz),tzStr='UTC'+(cap.tz>=0?'+':'')+cap.tz;
        var anchor=op.x>W/2?'left':'right';
        lctx.font='bold 10px Inter,sans-serif';var nameW=lctx.measureText(cap.n).width;
        lctx.font='9px Inter,sans-serif';var timeW=lctx.measureText(timeStr).width,tzW=lctx.measureText(tzStr).width;
        var boxW=Math.max(nameW,timeW,tzW)+14,boxH=42;
        visLabels.push({
          n:cap.n,sp:sp,alpha:alpha,timeStr:timeStr,tzStr:tzStr,anchor:anchor,
          boxW:boxW,boxH:boxH,
          bx:anchor==='left'?op.x+4:op.x-4-boxW,
          by:op.y-boxH/2
        });
      });

      /* ---- PASS 2: de-clutter — stack overlapping labels into a tidy column per side ---- */
      var LPAD=6,LGAP=6;
      ['left','right'].forEach(function(side){
        var col=visLabels.filter(function(l){return l.anchor===side;});
        col.sort(function(a,b){return a.by-b.by;});
        for(var i=0;i<col.length;i++){
          col[i].by=Math.max(LPAD,Math.min(col[i].by,H-col[i].boxH-LPAD));
          if(i>0&&col[i].by<col[i-1].by+col[i-1].boxH+LGAP){col[i].by=col[i-1].by+col[i-1].boxH+LGAP;}
        }
        if(col.length){
          var over=(col[col.length-1].by+col[col.length-1].boxH+LPAD)-H;
          if(over>0){for(var k=0;k<col.length;k++){col[k].by=Math.max(LPAD,col[k].by-over);}}
        }
        col.forEach(function(l){l.bx=Math.max(LPAD,Math.min(l.bx,W-l.boxW-LPAD));});
      });

      /* ---- PASS 3: draw leader lines + pills ---- */
      visLabels.forEach(function(l){
        var a=l.alpha,rx=6,bx=l.bx,by=l.by,boxW=l.boxW,boxH=l.boxH;
        var cx=l.anchor==='left'?bx:bx+boxW,cy=by+boxH/2;
        lctx.globalAlpha=a*0.85;lctx.strokeStyle=accentCol;lctx.lineWidth=1;lctx.setLineDash([2,3]);
        lctx.beginPath();lctx.moveTo(l.sp.x,l.sp.y);lctx.lineTo(cx,cy);lctx.stroke();lctx.setLineDash([]);
        lctx.fillStyle=accentCol;lctx.beginPath();lctx.arc(l.sp.x,l.sp.y,2.5,0,Math.PI*2);lctx.fill();

        lctx.beginPath();
        lctx.moveTo(bx+rx,by);lctx.lineTo(bx+boxW-rx,by);lctx.arcTo(bx+boxW,by,bx+boxW,by+rx,rx);
        lctx.lineTo(bx+boxW,by+boxH-rx);lctx.arcTo(bx+boxW,by+boxH,bx+boxW-rx,by+boxH,rx);
        lctx.lineTo(bx+rx,by+boxH);lctx.arcTo(bx,by+boxH,bx,by+boxH-rx,rx);
        lctx.lineTo(bx,by+rx);lctx.arcTo(bx,by,bx+rx,by,rx);lctx.closePath();
        lctx.fillStyle=pillBg;lctx.strokeStyle=accentCol;lctx.lineWidth=1;
        lctx.globalAlpha=a*0.5;lctx.stroke();lctx.globalAlpha=a*0.94;lctx.fill();

        lctx.fillStyle=nameCol;lctx.font='bold 10px Inter,sans-serif';lctx.textAlign='left';lctx.fillText(l.n,bx+7,by+13);
        lctx.fillStyle=accentCol;lctx.font='bold 11px Inter,sans-serif';lctx.fillText(l.timeStr,bx+7,by+26);
        lctx.fillStyle=tzCol;lctx.font='9px Inter,sans-serif';lctx.fillText(l.tzStr,bx+7,by+38);
        lctx.globalAlpha=1;
      });
    }
    requestAnimationFrame(animate);
  }
  init();
})();
