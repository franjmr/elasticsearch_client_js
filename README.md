# Introduction 
Interact with the Kibana Cluster using the official Node.js client for Elasticsearch.

# Client for Elasticsearch
## @elastic/elasticsearch
- [npmjs](https://www.npmjs.com/package/@elastic/elasticsearch)
- [github](https://github.com/elastic/elasticsearch-js)
- [Homepage](http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

# Getting Started
1.	Installation process
```bash
npm install
```
# Execute and Test

## Execute
The available executions are grouped in the <b>scripts</b> property of the package.json file, some of them being configurable through environment variables.

For example:

```bash
#Run script on command prompt 
npm run cluster:health
```

```json
//Client response
Cluster health: {
  body: {
    cluster_name: 'docker-cluster',
    status: 'green',
    timed_out: false,
    number_of_nodes: 11,
    number_of_data_nodes: 8,
    active_primary_shards: 2818,
    active_shards: 5697,
    relocating_shards: 0,
    initializing_shards: 0,
    unassigned_shards: 0,
    delayed_unassigned_shards: 0,
    number_of_pending_tasks: 0,
    number_of_in_flight_fetch: 0,
    task_max_waiting_in_queue_millis: 0,
    active_shards_percent_as_number: 100
  },
  statusCode: 200,
  headers: {
    'content-type': 'application/json; charset=UTF-8',
    'content-length': '397'
  },
  warnings: null,
  meta: {
    context: null,
    request: { params: [Object], options: [Object], id: 1 },
    name: 'elasticsearch-js',
    connection: {
      url: 'http://localhost:9200/',
      id: 'http://localhost:9200/',
      headers: {},
      deadCount: 0,
      resurrectTimeout: 0,
      _openRequests: 0,
      status: 'alive',
      roles: [Object]
    },
    attempts: 0,
    aborted: false
  }
}
```

## Test
TODO: Describe and show how to build your code and run the tests. 