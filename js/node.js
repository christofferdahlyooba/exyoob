function Node(name, type){
	this.name = name;
	this.type = type;
	this.Parent = null;
	this.img = null;
	this.checked = false;
}



function Folder(name){
	Node.call(this, name, 'Folder');
	this.children = [];
};
Folder.prototype = new Node();
Folder.prototype.hasChildren = function(){
	console.log(this.children.length);
}
Folder.prototype.add = function(node){
	if(node.Parent === this){
		return;//Already child of this folder
	}
	this.children.push(node);
	node.Parent = this;
}
Folder.prototype.remove = function(node){
	if(node.Parent !== this){
		return; //Not a child here
	}
	for(var i = 0; i< this.children.length; i++){
		if(this.children[i] === node){
			this.children.splice(i,1);
		}
	}
	node.Parent = null;
}

function File(name, type){
	Node.call(this, name, type);
	this.size = null;
	this.data = null;
	this.lastModified = null;
	this.isImg = false;
};
File.prototype = new Node();
