		document.getElementById('files').addEventListener('change', handleFileSelect, false);
		
		
		var fileDiv = document.getElementById("dnd");
		fileDiv.addEventListener("dragenter",function(e){
			e.stopPropagation();
			e.preventDefault();
		},false);

		fileDiv.addEventListener("dragover",function(e){
			e.stopPropagation();
			e.preventDefault();
		},false);

		fileDiv.addEventListener("drop",function(e)
		{
			e.stopPropagation();
			e.preventDefault();

			var dt = e.dataTransfer;
			var files = dt.files;

			var fileArr = new Array();
			  
			for (var i = 0, f; f = files[i]; i++) 
			{	
					fileArr.push(f);
			}
		  
			var scope = angular.element($("#ng")).scope();
			scope.$apply(function(){
				scope.currentFolder.fileList = fileArr;
			});

			showThumbnail(fileArr);
		},false);
		// -----------------------------------------------------------------
		
		function handleFileSelect(evt) {
			var files = evt.target.files; // FileList object
			$('#addFiles').modal('hide');
			console.log(files);
			
			var fileArr = new Array();
			for (var i = 0, f; f = files[i]; i++) 
			{
				
				fileArr.push(f);
			}
			console.log(fileArr);
			
			var scope = angular.element($("#ng")).scope();
			scope.$apply(function(){
				scope.currentFolder.fileList = fileArr;
			});
			showThumbnail(fileArr);
		}
		
		function showThumbnail(files)
		{
			for (var i = 0, f; f = files[i]; i++) 
			{
				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}
				
				var image = document.createElement("img");
				var id = "thumb-"+i;
				// image.classList.add("")
				var thumbnail = document.getElementById(id);
				image.file = f;
				thumbnail.appendChild(image)

				var reader = new FileReader()
				reader.onload = (function(aImg){
				  return function(e){
					aImg.src = e.target.result;
				  };
				}(image))
				var ret = reader.readAsDataURL(f);
				var canvas = document.createElement("canvas");
				ctx = canvas.getContext("2d");
				  image.onload= function(){
				  ctx.drawImage(image,100,100)
				}
			}
		}