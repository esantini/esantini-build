(function() {
	
		var yearSpan = document.getElementById("Years");
		var degreeSpan = document.getElementById("degreeSpan");
		var lineSpan = document.getElementById("lineSpan");
	
		// 8 earth orbits = 13 venus orbits.
		// 2880 degrees = 8 orbits
		// 4680 degrees = 13 orbits
	
		var canvasSize = myCanvas.width;
		myCanvas.height = canvasSize;
	
		var ctx = myCanvas.getContext('2d');
	
		var earthAngle = 235;
		var venusAngle = 270;
	
		var earthsOrbitRadius = 1 * (canvasSize/2.1); // 1 au / astronomical units
		var venussOrbitRadius = 0.72333 * (canvasSize/2.1);  // 0.72333 au
	
		var earthLocation,
			venusLocation;
	
		render();
	
		frequency.addEventListener('change', render);
	
		function render() {
	
			var freqValue = parseFloat(frequency.value)
			if(!freqValue || freqValue < 0) return;
			degreeSpan.innerHTML = freqValue;
			clearCanvas();
			var limit;
			if(2880 % freqValue != 0) {
				limit = 2880 * 4;
				yearSpan.innerHTML = 32;
				yearSpan.classList.add("highlight");
			}
			else {
				limit = 2880;
				yearSpan.innerHTML = 8;
				yearSpan.classList.remove("highlight");
			}
	
			var counter = 0;
	
			earthLocation = getPlanetLocation(earthAngle, earthsOrbitRadius);
			venusLocation = getPlanetLocation(venusAngle, venussOrbitRadius);
			
			drawStartingPositions();
			drawSun();
	
			for( var i = freqValue; i < limit; i = i + freqValue) {
				earthLocation = getPlanetLocation(earthAngle + i, earthsOrbitRadius);
				venusLocation = getPlanetLocation(venusAngle + (i * 1.625), venussOrbitRadius);
				drawLine();
				counter++;
			}
			lineSpan.innerHTML = ++counter;
			earthLocation = getPlanetLocation(earthAngle, earthsOrbitRadius);
			venusLocation = getPlanetLocation(venusAngle, venussOrbitRadius);
			drawLine("#009900");
			drawLine("#009900");
			drawLine("#009900");
		}
	
		function drawLine(color) {
				ctx.beginPath();
				ctx.moveTo( earthLocation[0], earthLocation[1]);
				ctx.lineTo( venusLocation[0], venusLocation[1]);
				if(color) ctx.strokeStyle = color;
				ctx.stroke();
				ctx.strokeStyle = '#000000';
		}
	
		function getPlanetLocation(angle, radius) {
			var x = ( canvasSize/2 ) + ( radius * Math.cos(angle*(Math.PI/180)) );
			var y = ( canvasSize/2 ) + ( radius * Math.sin(angle*(Math.PI/180)) );
			return [x,y];
		}
	
		function clearCanvas(){
			ctx.clearRect(0,0, canvasSize, canvasSize);
		}
	
		function drawOrbits() {
			ctx.fillStyle = '#888888';
	
			ctx.beginPath();
			ctx.arc( canvasSize/2, canvasSize/2, earthsOrbitRadius, 0, 360, false);
			ctx.closePath();
			ctx.fill();
	
	
			ctx.fillStyle = '#444444';
	
			ctx.beginPath();
			ctx.arc( canvasSize/2, canvasSize/2, venussOrbitRadius, 0, 360, false);
			ctx.closePath();
			ctx.fill();
		}
	
		function drawStartingPositions() {
			ctx.fillStyle = '#0000ff';
	
			ctx.beginPath();
			ctx.arc( earthLocation[0], earthLocation[1], 5, 0, 360, false);
			ctx.closePath();
			ctx.fill();
	
			ctx.fillStyle = '#00ffff';
	
			ctx.beginPath();
			ctx.arc( venusLocation[0], venusLocation[1], 5, 0, 360, false);
			ctx.closePath();
			ctx.fill();
		}
		function drawSun() {
			ctx.fillStyle = '#ffff00';
	
			ctx.beginPath();
			ctx.arc( canvasSize/2, canvasSize/2, 20, 0, 360, false);
			ctx.closePath();
			ctx.fill();
		}
	})();
	