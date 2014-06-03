uniqueID = 0;

/*
* The parent class Node with default properties that both files and folders will have
*/
function Node(name, type) {
	this.name = name;
	this.type = type;
	this.Parent = null;
	this.img = null;
	this.checked = false;
	this.id = uniqueID++;
}


/*
* Class Folder calls node constructor
* Folders have a children array
*/
function Folder(name){
	Node.call(this, name, 'Folder');
	this.children = [];
};

/*
* A folder is a subclass to Node
*/
Folder.prototype = new Node();

/*
* Returns true if this folder has any children, otherwise false
*/
Folder.prototype.hasChildren = function(){
	if (this.children.length > 0) {
		return true;
	}
	return false;
}

/*
* Adds a node to the children array of this folder
*/
Folder.prototype.add = function(node){
	if(node.Parent === this){
		return;//Already child of this folder
	}
	this.children.push(node);
	node.Parent = this;
}

/*
* Removes a node from this folders childrens array
*/
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

/*
* Class File, calls Nodes constructor
*/
function File(name, type){
	Node.call(this, name, type);
	this.size = null;
	this.data = null;
	this.lastModified = null;
	this.isImg = false;
	this.thumb = null;
};

/*
* File is a subclass of Node
*/
File.prototype = new Node();
