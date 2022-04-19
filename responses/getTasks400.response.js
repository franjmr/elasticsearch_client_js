module.exports = Object.freeze({
  RESPONSE_GET_TASKS: {
    body: {
      completed: true,
      task: {
        node: "7krd4fpiRoaKykuwvAIfjw",
        id: 42345160,
        type: "transport",
        action: "indices:data/write/update/byquery",
        status: [Object],
        description:
          "update-by-query [user-actions-saas-pre-2021.03] updated with Script{type=inline, lang='painless', idOrCode='\n" +
          "    def appUser = ctx._source.appUser;\n" +
          "    if(appUser != null){\n" +
          "        def appUserReverse = new StringBuilder(appUser).reverse().toString();\n" +
          "\n" +
          "        //To Bytes\n" +
          "        char[] buffer = appUserReverse.toCharArray();\n" +
          "        byte[] bytes = new byte[buffer.length];\n" +
          "        for (int i = 0; i < bytes.length; i++) {\n" +
          "            bytes[i] = (byte) buffer[i];\n" +
          "        }\n" +
          "\n" +
          "        def encodedAppUser = Base64.getEncoder().encodeToString(bytes);\n" +
          "\n" +
          "        ctx._source.remove('appUser');\n" +
          "        ctx._source.put('appUser', encodedAppUser);\n" +
          "    }', options={}, params={}}",
        start_time_in_millis: 1648534859901,
        running_time_in_nanos: 1138861247,
        cancellable: true,
        headers: {},
      },
      response: {
        took: 1138,
        timed_out: false,
        total: 124,
        updated: 124,
        created: 0,
        deleted: 0,
        batches: 1,
        version_conflicts: 0,
        noops: 0,
        retries: [Object],
        throttled: "0s",
        throttled_millis: 0,
        requests_per_second: -1,
        throttled_until: "0s",
        throttled_until_millis: 0,
        failures: [],
      },
    },
    statusCode: 400,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "content-length": "1706",
    },
    warnings: null,
    meta: {
      context: null,
      request: { params: [Object], options: [Object], id: 2 },
      name: "elasticsearch-js",
      connection: {
        url: "http://localhost:9200/",
        id: "http://localhost:9200/",
        headers: {},
        deadCount: 0,
        resurrectTimeout: 0,
        _openRequests: 0,
        status: "alive",
        roles: [Object],
      },
      attempts: 0,
      aborted: false,
    },
  },
});
