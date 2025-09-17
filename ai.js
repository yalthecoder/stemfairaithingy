const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#222255";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const player = {
    x: canvas.width/2,
    y: canvas.height/2,
    color: "#dddd66",
    size: 10,
}
const goal = {
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    color: "#66dd66",
    size: 10,
}

var reward = 0;
const neurons = [];

for(let i = 0; i<1000; i++) {
    
    if(i<4) {
        
        if(i == 0) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "inputpx",
                con: [],
            }
            neurons.push(neutron);
            
        }
        if(i == 1) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "inputpy",
                con: [],
            }
            neurons.push(neutron);
        }
        if(i == 2) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "inputgx",
                con: [],
            }
            neurons.push(neutron);
        }
        if(i == 3) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "inputgy",
                con: [],
            }
            neurons.push(neutron);
            
        }
        
    }
    
    else if (i>995) {
        
        if(i == 996) {
            
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "outup",
                con: [],
                min: Math.random()*1000-500,
                max: Math.random()*1000-500,
            }
            neurons.push(neutron);
        }
        else if(i == 997) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "outdown",
                con: [],
                min: Math.random()*1000-500,
                max: Math.random()*1000-500,
            }
            neurons.push(neutron);
        }
        else if(i == 998) {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "outleft",
                con: [],
                min: Math.random()*1000-500,
                max: Math.random()*1000-500,
            }
            neurons.push(neutron);
        }
        else {
            const neutron = {
                value: 0,
                mod: Math.random()*2-1,
                type: "outright",
                con: [],
                min: Math.random()*1000-500,
                max: Math.random()*1000-500,
            }
            neurons.push(neutron);
        }
    }
    else {
        
        const neutron = {
            value: 0,
            mod: Math.random()*2-1,
            type: "hidden",
            con: [],
        }
        neurons.push(neutron);
    }
    
    
    
}
//alert(["apple"].includes("apple"))
//alert(neurons[2].con.includes(neurons[3]))
function trainNeurons() {
    for(const neuron of neurons) {
        for(const key in neuron) {
            
            if(neuron.hasOwnProperty(key)) {
                
                if(Math.random()>reward/100) {
                    //alert(key);
                    if(neuron[key] == neuron.con) {
                        //alert(neuron[key]); 
                        
                        for(const neuron2 in neurons) {
                            //alert("1");
                            if(neuron2 != neuron) {
                                //alert("2");
                                if(Math.random()<0.0001) {
                                    //alert("3");
                                    if(neuron.con.includes(neuron2)) {
                                        //alert("4")
                                        //alert(neuron.con);
                                        neuron.con = neuron.con.filter(item => item !== neuron2);
                                        //alert(neuron.con);
                                    }
                                    else {
                                        
                                        //alert(neuron.con.length);
                                        neuron.con.push(neuron2);
                                        //alert(neuron.con.length);
                                    }
                                    
                                }
                            }
                        }
                            
                    }
                    if(neuron[key] == neuron.min) {
                        neuron.min += Math.random()*50-25;
                        //alert("crazy")
                        //alert(neuron.min);
                    }
                    if(neuron[key] == neuron.max) {
                        neuron.max += Math.random()*50-25;
                        //alert("crazy")
                        //alert(neuron.max)
                    }
                }
            }
        }
    }
}

var timer = 0;
function tick() {
    ctx.fillStyle = "#222255";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x - goal.size/2, goal.y - goal.size/2, goal.size, goal.size);
    //alert("y")
    for(let i = 0; i<5; i++) {
        for(const neuron of neurons) {
            if(neuron.type == "inputpx") {
                neuron.value = player.x;
            }
            if(neuron.type == "inputpy") {
                neuron.value = player.y;
            }
            if(neuron.type == "inputgx") {
                neuron.value = goal.x;
            }
            if(neuron.type == "inputgy") {
                neuron.value = goal.y;
            }
            for(const connection of neuron.con) {
                connection.value += neuron.value*neuron.mod;
            }
        }
    }
    //alert("ya")
    for(const neuron of neurons) {
        
        if(neuron.type == "outup") {
            //alert("1")
            if(neuron.value>neuron.min && neuron.value<neuron.max) {
                player.y -= 1;
            }
        }
        if(neuron.type == "outdown") {
            if(neuron.value>neuron.min && neuron.value<neuron.max) {
                player.y += 1;
            }
        }
        if(neuron.type == "outleft") {
            if(neuron.value>neuron.min && neuron.value<neuron.max) {
                player.x -= 1;
            }
        }
        if(neuron.type == "outright") {
            if(neuron.value>neuron.min && neuron.value<neuron.max) {
                player.x += 1;
            }
        }
        neuron.value = 0;
        if(neuron.max>1000) {
            neuron.max = 1000;
        }
        if(neuron.min<-1000) {
            neuron.min = -1000;
        }
        if(neuron.min>1000) {
            neuron.min = 1000;
        }
        if(neuron.max<-1000) {
            neuron.max = -1000;
        }
    }
    //alert("yal")
    timer++;
    if(timer>120) {
        var dist = Math.sqrt((player.x-goal.x)**2+(player.y-goal.y)**2);
        reward = 1/(dist+1);
        player.x = canvas.width/2;
        player.y = canvas.height/2;
        goal.x = Math.random()*canvas.width;
        goal.y = Math.random()*canvas.height;
        trainNeurons();
        timer = 0;
    }
}
setInterval(tick, 1/30);