//Diccionario de "cv.json"
var graph = {"directed": true, "links": [{"target": 29, "source": 0}, {"target": 13, "source": 0}, {"target": 2, "source": 0}, {"target": 31, "source": 0}, {"target": 15, "source": 0}, {"target": 4, "source": 5}, {"target": 16, "source": 5}, {"target": 28, "source": 5}, {"target": 3, "source": 5}, {"target": 30, "source": 5}, {"target": 23, "source": 6}, {"target": 17, "source": 6}, {"target": 22, "source": 6}, {"target": 26, "source": 6}, {"target": 1, "source": 6}, {"target": 12, "source": 6}, {"target": 14, "source": 7}, {"target": 8, "source": 7}, {"target": 5, "source": 10}, {"target": 6, "source": 10}, {"target": 27, "source": 10}, {"target": 9, "source": 18}, {"target": 20, "source": 18}, {"target": 21, "source": 19}, {"target": 29, "source": 19}, {"target": 11, "source": 19}, {"target": 25, "source": 19}, {"target": 24, "source": 19}, {"target": 0, "source": 27}, {"target": 18, "source": 27}, {"target": 7, "source": 27}, {"target": 19, "source": 27}], "multigraph": false, "graph": {}, "nodes": [{"id": "SOFTWARE", "group": 1}, {"id": "BIG DATA", "group": 3}, {"id": "MATLAB", "group": 1}, {"id": "PAREXEL", "group": 2}, {"id": "MIN.DE HACIENDA", "group": 2}, {"id": "EXPERIENCIA", "group": 2}, {"id": "INTERESES", "group": 3}, {"id": "IDIOMAS", "group": 1}, {"id": "ALEMAN", "group": 1}, {"id": "MA. EN ECONOMIA", "group": 1}, {"id": "MARIA INES", "group": 0}, {"id": "GESTION DE PROYECTOS", "group": 1}, {"id": "RIVER", "group": 3}, {"id": "E-VIEWS", "group": 1}, {"id": "INGLES", "group": 1}, {"id": "STATA", "group": 1}, {"id": "CISCO", "group": 2}, {"id": "J.CORTAZAR", "group": 3}, {"id": "UNIVERSIDAD", "group": 1}, {"id": "CURSOS MOOC", "group": 1}, {"id": "LIC.COMERCIO EXTERIOR", "group": 1}, {"id": "CHINA", "group": 1}, {"id": "FUTBOL 5", "group": 3}, {"id": "ECONOMIA", "group": 3}, {"id": "ENGLISH", "group": 1}, {"id": "MACRO LATAM", "group": 1}, {"id": "BLOCKCHAIN", "group": 3}, {"id": "EDUCACION", "group": 1}, {"id": "MIN. MODERNIZACION", "group": 2}, {"id": "PYTHON", "group": 1}, {"id": "DAYTRADE THE WORLD", "group": 2}, {"id": "TABLEAU", "group": 1}]}

var width = 1200,
    height = 600;

var color = d3.scale.category10();

var force = d3.layout.force()
    .charge(-700)
    .linkDistance(40)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var drawGraph = function(graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var gnodes = svg.selectAll('g.gnode')
     .data(graph.nodes)
     .enter()
     .append('g')
     .classed('gnode', true);
    
  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", 12)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  var labels = gnodes.append("text")
      .text(function(d) { return d.id; })
      .style("font-size","8")
      .style("font-family","calibri")
      .style("fill","white");

  console.log(labels);
    
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    }); 
      
  });
};

drawGraph(graph);