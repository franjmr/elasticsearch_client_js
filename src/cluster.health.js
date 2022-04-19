const { Client }  = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

client.cluster.health({},function(error, response, status) {
    console.log("Errors:", error, '\n');
    console.log("Cluster health:", response, '\n');
    console.log("Status:", status, '\n');
});

  