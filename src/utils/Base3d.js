import *as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";    //rgbe加载器
// 导入控制器，轨道控制器,摄像头像卫星一样围绕物体旋转
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入模型解析器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Base3d{
constructor(selector){
    this.container=document.querySelector(selector)     //选中渲染容器
    this.camera                                         //摄像头对象
    this.scene                                          //场景
    this.renderer                                       //渲染器
    this.init()                                         //初始化
    this.animate()
    this.model
    this.panzi         //盘子模型
    this.animateAction;
    this.clock = new THREE.Clock();  //计时器初始化
    // this.onFinish = onFinish;
    this.progressFn;

}
    init(){
        this.initScene()       //初始化场景
        this.initCamera()      //初始化相机   
        this.initRenderer()      //初始化渲染器
        this.initControls()       //配置控制器
        this.addMesh()          //模型计入场景
        window.addEventListener('resize',this.onWindowResize.bind(this))  //监听场景大小变化，调整渲染尺寸
        window.addEventListener('mousewheel',this.onMouseWheel.bind(this))
    }
    initScene(){
        this.scene=new THREE.Scene();         //创建场景
        this.setEnvMap("000")
    }  

    initCamera(){
        this.camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.25,200);    //加入摄像头  （视野角度，视椎体长高比，视椎体与相机距离）
        this.camera.position.set(-1.8,0.6,2.7)
    } 
    initRenderer(){
        this.renderer=new THREE.WebGL1Renderer({antialias:true})            //初始化渲染器，设置抗锯齿
        this.renderer.setPixelRatio(window.devicePixelRatio)                //设置像素比
        this.renderer.setSize(window.innerWidth,window.innerHeight)         //设置渲染的尺寸（canvas）大小
        this.container.appendChild(this.renderer.domElement)                //把画布放进容器中
        this.renderer.toneMapping=THREE.ACESFilmicToneMapping              //配置色调映射
        this.renderer.toneMappingExposure=2                                //曝光程度

    }
    initControls(){
        this.controls=new OrbitControls(this.camera,this.renderer.domElement)
    }
    setEnvMap(hdr){
        new RGBELoader().setPath('./files/hdr/').load(hdr+'.hdr',(texture)=>{   //加载器加载外部模型
            texture.mapping=THREE.EquirectangularReflectionMapping          //设置纹理的球形映射
            this.scene.background=texture
            this.scene.environment=texture
        })           
    }
    render(){                                                  //渲染
        var delta = this.clock.getDelta();    //计算帧之间的时间
        this.mixer && this.mixer.update(delta);   //根据时间差渲染
        this.renderer.render(this.scene,this.camera)
    }
    animate(){                                                 //通过不断渲染实现动画效果
        this.renderer.setAnimationLoop(this.render.bind(this))
    }
    setModel(modelName){
        return new Promise((resolve,reject)=>{
            const loader=new GLTFLoader().setPath('files/gltf/')
            loader.load(modelName,(gltf)=>{
            console.log(gltf)
            this.model=gltf.scene.children[0]
            if("bag2.glb"==modelName&&!this.panzi){
                this.panzi = gltf.scene.children[5];
                //   this.scene.add(this.panzi);
                
                this.scene.add(gltf.scene)    //添加模型场景
                // 修改摄像头为模型摄像头
                this.camera = gltf.cameras[0];
                //   调用动画
                this.mixer = new THREE.AnimationMixer(gltf.scene.children[1]);
                this.animateAction = this.mixer.clipAction(gltf.animations[0]);
                //   设置动画播放时长
                this.animateAction.setDuration(20).setLoop(THREE.LoopOnce);
                //   设置播放完成之后停止
                this.animateAction.clampWhenFinished = true;
                //   播放动画
                //   this.animateAction.play();
                 //   设置灯光
                this.spotlight1 = gltf.scene.children[2].children[0];
                this.spotlight1.intensity = 1;
                this.spotlight2 = gltf.scene.children[3].children[0]; 
                this.spotlight2.intensity = 1;
                this.spotlight3 = gltf.scene.children[4].children[0];
                this.spotlight3.intensity = 1;
            }
            this.scene.add(this.model)                      //模型加入场景
            resolve(this.modelName+'模型添加成功')
        })
        })
    }
    addMesh(){
        this.setModel('bag2.glb')
    }
    onWindowResize(){
        this.camera.aspect=window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()                        //更新渲染矩阵
        this.renderer.setSize(window.innerWidth,window.innerHeight) //重新设置宽高
        // this.render()    //重新渲染
    }
    
  onMouseWheel(e) {
    // console.log(this.animateAction);
    let timeScale = e.deltaY > 0 ? 1 : -1;
    this.animateAction.setEffectiveTimeScale(timeScale);
    this.animateAction.paused = false;
    this.animateAction.play();
    if (this.timeoutid) {
      clearTimeout(this.timeoutid);
    }
    this.timeoutid = setTimeout(() => {
      this.animateAction.halt(0.5);
    }, 300);
  }

}

export default Base3d