module.exports = Object.freeze({
    RESPONSE_GET_TASKS:{
    body: {
      cluster_name: 'docker-cluster',
      status: 'yellow',
      timed_out: false,
      number_of_nodes: 13,
      number_of_data_nodes: 10,
      active_primary_shards: 2868,
      active_shards: 5799,
      relocating_shards: 0,
      initializing_shards: 0,
      unassigned_shards: 20,
      delayed_unassigned_shards: 0,
      number_of_pending_tasks: 0,
      number_of_in_flight_fetch: 0,
      task_max_waiting_in_queue_millis: 0,
      active_shards_percent_as_number: 100
    },
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '398'
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
});