(function() {

    var graph,
        svg; // retained svg for last rendered graph

    Graph = function(){
        this.numNodes = 0;
        this.origN = 0;
        this.edges = [];
    };

    Graph.prototype.genRandomGraph = function(numNodes, numEdges) {
        this.origN = this.numNodes = numNodes;
        var i, n1, n2;

        for (i=0; i<numEdges; i++) {
            n1 = Math.floor((Math.random()*numNodes)+1);
            n2 = Math.floor((Math.random()*numNodes)+1);
            this.edges.push([n1, n2]);
        }
    };

    Graph.prototype.addNode = function() {
        this.numNodes++;
        this.edges.push([10,this.numNodes]);
    }

    Graph.prototype.toDot = function() {
        var graph = 'digraph g \n{\n graph [ rankdir = "LR" ]; \n  node [ fontsize = "12" shape = "box"]; \n';
        graph += ' "node10" [ style="filled" fillcolor = "gray"]\n';
        for (i=0; i<this.edges.length; i++) {
            var n1 = this.edges[i][0],
                n2 = this.edges[i][1];
            graph += '  "node'+ n1 + '" -> "node'+ n2 + '"\n';
        }
        graph += '}';

        return graph;
    }

    function generateNew() {
        graph = new Graph();
        graph.genRandomGraph(20, 20);
        svg = Viz(graph.toDot(), 'svg');
        $('.graph-render').html(svg);
    }

    function generateSnapshot() {
        var elem = $('<div class="col-lg-4">' + svg + '</div>').appendTo('.snapshots').find('svg'),
            w = elem.width(),
            h = elem.height();

        var h1 = Math.floor(h/(w/240.0));
        elem.attr('width', '240pt').attr('height', h1 + 'pt');
    }

    generateNew();

    $('#graph-refresh').click(function() {
        $('.snapshots').html("");
        generateNew();
    });

    $('#graph-add').click(function() {
        generateSnapshot();
        graph.addNode();
        svg = Viz(graph.toDot(), 'svg');
        $('.graph-render').html(svg);
    });

})();