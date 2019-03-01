var sceneinfos = [];    
    
    function setupScene(width, height, element)
    {       
        const VIEW_ANGLE = 70;
        const ASPECT = width / height;
        const NEAR = 0.1;
        const FAR = 10000;

        // Get the DOM element to attach to
        const rescontainer =
            document.getElementById(element);
       
        const resrenderer = new THREE.WebGLRenderer();
        const rescamera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR
            );
            
        rescamera.position.z = 10;
        const resscene = new THREE.Scene();
        resscene.add(rescamera);
        resrenderer.setSize(width, height);
        resrenderer.setClearColor(0x333F47, 1);
        
        rescontainer.appendChild(resrenderer.domElement);

        const respointLight =
          new THREE.PointLight(0xFFFFFF, 3);

        respointLight.position.x = 0;
        respointLight.position.y = 1;
        respointLight.position.z = 8;
        resscene.add(respointLight);
        var result = {scene: resscene, renderer: resrenderer, camera: rescamera, update: function (object) {} };
        sceneinfos.push(result);
        return result;
    }
    
    function doUpdate(info)
    {
        info.scene.traverse(info.update);
        info.renderer.render(info.scene, info.camera);
    }

    function update () {
      sceneinfos.forEach(doUpdate);
      requestAnimationFrame(update);
    }